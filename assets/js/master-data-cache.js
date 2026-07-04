/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0050
File    : assets/js/master-data-cache.js
------------------------------------------------------------

Master Data Cache

Caches static master data.

✓ Customers
✓ Rate Table
✓ Feed List
✓ Collection Centers
✓ Settings

------------------------------------------------------------
*/

"use strict";

const MasterDataCache = (() => {

    const cache = {

        customers: new Map(),

        rates: [],

        feeds: [],

        centers: [],

        settings: {}

    };

    //--------------------------------------------------

    async function init() {

        await loadCustomers();

        await loadRates();

        Logger.success("Master Data Cache Ready");

    }

    //--------------------------------------------------

    async function loadCustomers() {

        try {

            const customers =
                await DataService.loadCustomers();

            cache.customers.clear();

            customers.forEach(c => {

                cache.customers.set(

                    String(c.id),

                    c

                );

            });

            Logger.success(

                `Customers Cached (${cache.customers.size})`

            );

        }

        catch (error) {

            Logger.error(error);

        }

    }

    //--------------------------------------------------

    async function loadRates() {

        try {

            cache.rates =
                await DataService.loadRateTable();

            Logger.success(

                `Rate Table Cached (${cache.rates.length})`

            );

        }

        catch (error) {

            Logger.error(error);

        }

    }

    //--------------------------------------------------

    function getCustomer(id) {

        return cache.customers.get(

            String(id)

        ) || null;

    }

    //--------------------------------------------------

    function getCustomers() {

        return Array.from(

            cache.customers.values()

        );

    }

    //--------------------------------------------------

    function getRates() {

        return cache.rates;

    }

    //--------------------------------------------------

    function getRate(fat, snf) {

        return cache.rates.find(r =>

            Number(r.fat) === Number(fat) &&

            Number(r.snf) === Number(snf)

        ) || null;

    }

    //--------------------------------------------------

    function clear() {

        cache.customers.clear();

        cache.rates = [];

        cache.feeds = [];

        cache.centers = [];

        cache.settings = {};

    }

    //--------------------------------------------------

    return {

        init,

        loadCustomers,

        loadRates,

        getCustomer,

        getCustomers,

        getRates,

        getRate,

        clear

    };

})();
