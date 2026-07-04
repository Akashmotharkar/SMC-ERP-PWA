/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0046
File    : assets/js/amount-service.js
------------------------------------------------------------

Amount Service

Responsibilities

✓ Calculate Amount
✓ Update Session
✓ Update UI
✓ Enable Save

Listens

rate.calculated
session.updated

Publishes

amount.calculated

------------------------------------------------------------
*/

"use strict";

const AmountService = (() => {

    //------------------------------------------------------

    function init() {

        EventBus.on(

            "rate.calculated",

            calculate

        );

        EventBus.on(

            "session.updated",

            calculate

        );

        Logger.success(

            "Amount Service Ready"

        );

    }

    //------------------------------------------------------

    function calculate() {

        const session = CollectionSession.get();

        if (!session)
            return;

        if (
            session.rate == null ||
            session.quantity == null
        ) {

            disableSave();

            return;

        }

        const amount = round(

            session.rate *

            session.quantity

        );

        session.amount = amount;

        StateManager.set(

            "currentAmount",

            amount

        );

        if (UI.setAmount) {

            UI.setAmount(amount);

        }

        EventBus.emit(

            "amount.calculated",

            amount

        );

        checkReady(session);

    }

    //------------------------------------------------------

    function checkReady(session) {

        const ready =

            session.customer &&

            session.fat != null &&

            session.snf != null &&

            session.clr != null &&

            session.quantity != null &&

            session.rate != null &&

            session.amount != null;

        if (ready) {

            enableSave();

        }

        else {

            disableSave();

        }

    }

    //------------------------------------------------------

    function enableSave() {

        const btn = document.getElementById(

            "btnSave"

        );

        if (btn) {

            btn.disabled = false;

        }

    }

    //------------------------------------------------------

    function disableSave() {

        const btn = document.getElementById(

            "btnSave"

        );

        if (btn) {

            btn.disabled = true;

        }

    }

    //------------------------------------------------------

    function round(value) {

        return Number(

            value.toFixed(2)

        );

    }

    //------------------------------------------------------

    return {

        init,

        calculate

    };

})();
