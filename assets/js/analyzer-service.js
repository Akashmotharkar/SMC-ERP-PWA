/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0044
File    : assets/js/analyzer-service.js
------------------------------------------------------------

Analyzer Service

Responsibilities

✓ Receive parsed analyzer sample
✓ Validate values
✓ Publish analyzer.sample event
✓ Update Collection Session
✓ Auto-fill UI
✓ Prepare for automatic quantity extraction

Bluetooth
        │
        ▼
Parser
        │
        ▼
AnalyzerService
        │
        ├── UI
        ├── CollectionSession
        ├── Logger
        └── EventBus

------------------------------------------------------------
*/

"use strict";

const AnalyzerService = (() => {

    //--------------------------------------------------

    let lastSample = null;

    //--------------------------------------------------

    function init() {

        EventBus.on(

            "parser.sample",

            processSample

        );

        Logger.success(

            "Analyzer Service Ready"

        );

    }

    //--------------------------------------------------

    function processSample(sample) {

        try {

            if (!validate(sample)) {

                Logger.warning(

                    "Invalid Analyzer Sample"

                );

                return;

            }

            lastSample = {

                fat: Number(sample.fat),

                snf: Number(sample.snf),

                clr: Number(sample.clr),

                quantity: sample.quantity !== undefined
                    ? Number(sample.quantity)
                    : null,

                timestamp: new Date(),

                raw: sample.raw || ""

            };

            updateUI(lastSample);

            EventBus.emit(

                "analyzer.sample",

                lastSample

            );

            Logger.success(

                "Analyzer Sample Accepted"

            );

        }

        catch (error) {

            Logger.error(error);

        }

    }

    //--------------------------------------------------

    function validate(sample) {

        if (!sample)
            return false;

        if (isNaN(sample.fat))
            return false;

        if (isNaN(sample.snf))
            return false;

        if (isNaN(sample.clr))
            return false;

        if (

            Number(sample.fat) < 0 ||

            Number(sample.fat) > 15

        )

            return false;

        if (

            Number(sample.snf) < 0 ||

            Number(sample.snf) > 20

        )

            return false;

        return true;

    }

    //--------------------------------------------------

    function updateUI(sample) {

        if (UI.setAnalyzerValues) {

            UI.setAnalyzerValues({

                fat: sample.fat,

                snf: sample.snf,

                clr: sample.clr,

                quantity: sample.quantity

            });

        }

    }

    //--------------------------------------------------

    function getLastSample() {

        return structuredClone(

            lastSample

        );

    }

    //--------------------------------------------------

    function clear() {

        lastSample = null;

    }

    //--------------------------------------------------

    return {

        init,

        clear,

        getLastSample

    };

})();
