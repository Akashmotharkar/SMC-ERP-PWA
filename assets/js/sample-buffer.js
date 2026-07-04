/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0026
File    : assets/js/sample-buffer.js
------------------------------------------------------------
Draft / Waiting Sample Buffer

Purpose
-------
Analyzer may send data before Customer ID.
Customer ID may be entered before Analyzer.

This module combines both and creates one
ready-to-save transaction.

Flow

Customer -> Waiting Analyzer
Analyzer -> Waiting Customer

↓

Both Available

↓

Rate Calculation

↓

Amount Calculation

↓

Enable Save
------------------------------------------------------------
*/

"use strict";

const SampleBuffer = (() => {

    let customer = null;
    let analyzer = null;

    function init() {

        reset();

        Logger.success(
            "Sample Buffer Ready"
        );

    }

    function setCustomer(data) {

        customer = data;

        Logger.info(
            "Customer Loaded : " + data.id
        );

        process();

    }

    function setAnalyzer(data) {

        analyzer = {

            fat: Number(data.fat || 0),

            snf: Number(data.snf || 0),

            clr: Number(data.clr || 0),

            qty: Number(data.qty || 0),

            timestamp: Date.now()

        };

        Logger.info(
            "Analyzer Sample Received"
        );

        process();

    }

    async function process() {

        if (!customer && analyzer) {

            State.set(
                "waiting.customer",
                true
            );

            UI.refreshConnections();

            return;

        }

        if (customer && !analyzer) {

            State.set(
                "waiting.analyzer",
                true
            );

            UI.refreshConnections();

            return;

        }

        if (!customer || !analyzer)
            return;

        State.set(
            "waiting.customer",
            false
        );

        State.set(
            "waiting.analyzer",
            false
        );

        UI.populateAnalyzer(analyzer);

        try {

            const rate =
                await Rate.calculate(

                    analyzer.fat,

                    analyzer.snf

                );

            const amount =
                Utils.round(

                    rate *

                    analyzer.qty,

                    2

                );

            UI.updateRate(rate);

            UI.updateAmount(amount);

            State.set(
                "transaction.rate",
                rate
            );

            State.set(
                "transaction.amount",
                amount
            );

            State.set(
                "transaction.ready",
                true
            );

            Logger.success(
                "Sample Ready"
            );

        }

        catch (error) {

            Logger.error(error);

        }

    }

    function reset() {

        customer = null;

        analyzer = null;

        State.set(
            "transaction.ready",
            false
        );

        State.set(
            "waiting.customer",
            false
        );

        State.set(
            "waiting.analyzer",
            false
        );

    }

    function current() {

        return {

            customer,

            analyzer

        };

    }

    function hasCustomer() {

        return customer !== null;

    }

    function hasAnalyzer() {

        return analyzer !== null;

    }

    function isReady() {

        return (

            customer !== null &&

            analyzer !== null

        );

    }

    function consume() {

        if (!isReady())
            return null;

        const sample = {

            customer,

            analyzer,

            rate: State.get(
                "transaction.rate"
            ),

            amount: State.get(
                "transaction.amount"
            )

        };

        reset();

        return sample;

    }

    return {

        init,

        setCustomer,

        setAnalyzer,

        consume,

        current,

        reset,

        hasCustomer,

        hasAnalyzer,

        isReady

    };

})();
