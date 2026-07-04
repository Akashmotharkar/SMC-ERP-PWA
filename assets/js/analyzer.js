/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0016
File    : assets/js/analyzer.js
Status  : Production Ready
------------------------------------------------------------
*/

"use strict";

const Analyzer = (() => {

    let lastSample = null;

    async function initialize() {

        Logger.info("Analyzer Module Initialized");

    }

    function packetReceived(sample) {

        if (!sample)
            return;

        lastSample = {

            fat: number(sample.fat),
            snf: number(sample.snf),
            clr: number(sample.clr),
            qty: number(sample.qty),

            source: "Bluetooth",

            timestamp: Date.now()

        };

        Logger.parser(

            `Sample Received FAT=${lastSample.fat} SNF=${lastSample.snf} CLR=${lastSample.clr}`

        );

        State.analyzerReceived(lastSample);

        UI.updateAnalyzerValues(lastSample);

        UI.updateAnalyzerStatus(true);

        tryEnableSave();

    }

    async function tryEnableSave() {

        const customer = State.get("currentCustomer");

        const sample = State.get("currentSample");

        if (!customer)
            return;

        if (sample.fat == null)
            return;

        if (sample.snf == null)
            return;

        const rate = await Rate.find(

            sample.fat,

            sample.snf

        );

        if (rate == null) {

            Logger.warning(

                "Rate Not Found"

            );

            return;

        }

        State.updateRate(rate);

        UI.updateAnalyzerValues(

            State.get("currentSample")

        );

        if (

            State.get("draft.saveReady")

        ) {

            UI.enableSave(true);

            Logger.success(

                "Save Ready"

            );

        }

    }

    function clear() {

        lastSample = null;

        UI.updateAnalyzerValues({

            fat: "",

            snf: "",

            clr: "",

            qty: "",

            rate: "",

            amount: ""

        });

    }

    function current() {

        return lastSample;

    }

    function connected(deviceName = "") {

        Logger.bluetooth(

            "Analyzer Connected " +

            deviceName

        );

        UI.updateBluetoothStatus(true);

        UI.updateAnalyzerStatus(true);

    }

    function disconnected() {

        Logger.warning(

            "Analyzer Disconnected"

        );

        UI.updateBluetoothStatus(false);

        UI.updateAnalyzerStatus(false);

    }

    function number(value) {

        if (

            value === undefined ||

            value === null ||

            value === ""

        )

            return null;

        const n = parseFloat(value);

        return isNaN(n) ? null : n;

    }

    return {

        initialize,

        packetReceived,

        connected,

        disconnected,

        clear,

        current

    };

})();
