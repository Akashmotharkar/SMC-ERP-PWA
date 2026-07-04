/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0043
File    : assets/js/collection-session.js
------------------------------------------------------------

Collection Session

Maintains the current milk collection in progress.

Sources

✓ Customer
✓ Analyzer
✓ Weight Scale

Calculates

✓ Rate
✓ Amount

Emits

customer.ready
session.updated
session.ready
session.cleared

------------------------------------------------------------
*/

"use strict";

const CollectionSession = (() => {

    let session = {};

    //------------------------------------------------------

    function init() {

        clear();

        EventBus.on(
            "customer.selected",
            setCustomer
        );

        EventBus.on(
            "analyzer.sample",
            setAnalyzer
        );

        EventBus.on(
            "weight.received",
            setWeight
        );

        Logger.success(
            "Collection Session Ready"
        );

    }

    //------------------------------------------------------

    function clear() {

        session = {

            customer: null,

            fat: null,

            snf: null,

            clr: null,

            quantity: null,

            rate: null,

            amount: null,

            timestamp: null

        };

        EventBus.emit(
            "session.cleared"
        );

    }

    //------------------------------------------------------

    function setCustomer(customer) {

        session.customer = customer;

        session.timestamp = new Date();

        checkReady();

    }

    //------------------------------------------------------

    function setAnalyzer(sample) {

        session.fat = Number(sample.fat);

        session.snf = Number(sample.snf);

        session.clr = Number(sample.clr);

        session.timestamp = new Date();

        calculateRate();

        checkReady();

    }

    //------------------------------------------------------

    function setWeight(weight) {

        session.quantity = Number(weight);

        session.timestamp = new Date();

        calculateAmount();

        checkReady();

    }

    //------------------------------------------------------

    function calculateRate() {

        if (
            session.fat == null ||
            session.snf == null
        ) return;

        session.rate = Rate.find(

            session.fat,

            session.snf

        );

        calculateAmount();

    }

    //------------------------------------------------------

    function calculateAmount() {

        if (
            session.rate == null ||
            session.quantity == null
        ) return;

        session.amount = Number(

            (

                session.rate *

                session.quantity

            ).toFixed(2)

        );

    }

    //------------------------------------------------------

    function ready() {

        return (

            session.customer &&

            session.fat != null &&

            session.snf != null &&

            session.quantity != null &&

            session.rate != null &&

            session.amount != null

        );

    }

    //------------------------------------------------------

    function checkReady() {

        EventBus.emit(

            "session.updated",

            get()

        );

        if (ready()) {

            EventBus.emit(

                "session.ready",

                get()

            );

            Logger.success(

                "Collection Session Ready"

            );

        }

    }

    //------------------------------------------------------

    function get() {

        return structuredClone(session);

    }

    //------------------------------------------------------

    function isReady() {

        return ready();

    }

    //------------------------------------------------------

    return {

        init,

        clear,

        get,

        isReady

    };

})();
