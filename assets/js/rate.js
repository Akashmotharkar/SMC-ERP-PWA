/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0017
File    : assets/js/rate.js
Status  : Production Ready
------------------------------------------------------------
*/

"use strict";

const Rate = (() => {

    let rateChart = [];

    let rateMap = new Map();

    async function initialize() {

        await loadRateChart();

        Logger.info("Rate Module Initialized");

    }

    async function loadRateChart() {

        const cache = Storage.load("rateChart", []);

        if (cache.length > 0) {

            rateChart = cache;

            buildMap();

            Logger.success(
                `${rateChart.length} Rates Loaded From Cache`
            );

        }

        if (!API.isOnline())
            return;

        try {

            const result = await API.getRates();

            if (result.success && Array.isArray(result.data)) {

                rateChart = result.data;

                Storage.save("rateChart", rateChart);

                buildMap();

                Logger.success(
                    `${rateChart.length} Rates Loaded From Server`
                );

            }

        } catch (e) {

            Logger.warning("Unable To Refresh Rate Chart");

        }

    }

    function buildMap() {

        rateMap.clear();

        rateChart.forEach(item => {

            const key = makeKey(item.fat, item.snf);

            rateMap.set(key, Number(item.rate));

        });

    }

    function makeKey(fat, snf) {

        return (
            Number(fat).toFixed(1) +
            "|" +
            Number(snf).toFixed(1)
        );

    }

    async function find(fat, snf) {

        fat = Number(fat);

        snf = Number(snf);

        const key = makeKey(fat, snf);

        if (rateMap.has(key)) {

            return rateMap.get(key);

        }

        Logger.warning(

            `Exact Rate Not Found (${fat}, ${snf})`

        );

        return nearest(fat, snf);

    }

    function nearest(fat, snf) {

        if (rateChart.length === 0)
            return null;

        let best = null;

        let distance = Number.MAX_VALUE;

        for (const row of rateChart) {

            const d =

                Math.abs(row.fat - fat) +

                Math.abs(row.snf - snf);

            if (d < distance) {

                distance = d;

                best = row;

            }

        }

        if (!best)
            return null;

        Logger.info(

            `Nearest Rate Used (${best.fat}, ${best.snf})`

        );

        return Number(best.rate);

    }

    function reload() {

        return loadRateChart();

    }

    function all() {

        return [...rateChart];

    }

    function count() {

        return rateChart.length;

    }

    function loaded() {

        return rateChart.length > 0;

    }

    return {

        initialize,

        find,

        reload,

        all,

        count,

        loaded

    };

})();
