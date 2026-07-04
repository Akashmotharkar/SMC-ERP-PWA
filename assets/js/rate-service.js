/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0045
File    : assets/js/rate-service.js
------------------------------------------------------------

Rate Service

Responsibilities

✓ Lookup milk rate
✓ Cache rate table
✓ Return nearest rate
✓ Auto update Collection Session

------------------------------------------------------------
*/

"use strict";

const RateService = (() => {

    let rateTable = [];

    //--------------------------------------------------

    function init() {

        EventBus.on(
            "analyzer.sample",
            calculateRate
        );

        Logger.success(
            "Rate Service Ready"
        );

    }

    //--------------------------------------------------

    async function load() {

        try {

            rateTable = await DataService.loadRateTable();

            Logger.success(
                "Rate Table Loaded : " +
                rateTable.length
            );

        }

        catch (error) {

            Logger.error(error);

        }

    }

    //--------------------------------------------------

    function calculateRate(sample) {

        if (!sample)
            return;

        const rate = findRate(

            Number(sample.fat),

            Number(sample.snf)

        );

        StateManager.set(

            "currentRate",

            rate

        );

        EventBus.emit(

            "rate.calculated",

            rate

        );

    }

    //--------------------------------------------------

    function findRate(fat, snf) {

        if (!rateTable.length)
            return 0;

        //--------------------------------------------------
        // Exact Match
        //--------------------------------------------------

        let row = rateTable.find(r =>

            Number(r.fat) === fat &&

            Number(r.snf) === snf

        );

        if (row)
            return Number(row.rate);

        //--------------------------------------------------
        // Nearest Match
        //--------------------------------------------------

        let nearest = null;

        let distance = Number.MAX_VALUE;

        rateTable.forEach(r => {

            const d =

                Math.abs(

                    Number(r.fat) - fat

                ) +

                Math.abs(

                    Number(r.snf) - snf

                );

            if (d < distance) {

                distance = d;

                nearest = r;

            }

        });

        if (!nearest)
            return 0;

        return Number(nearest.rate);

    }

    //--------------------------------------------------

    function getRate() {

        return StateManager.get(

            "currentRate"

        ) || 0;

    }

    //--------------------------------------------------

    function getTable() {

        return structuredClone(

            rateTable

        );

    }

    //--------------------------------------------------

    return {

        init,

        load,

        getRate,

        getTable,

        findRate

    };

})();
