/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0040
File    : assets/js/data-service.js
------------------------------------------------------------

Data Service

Single gateway between Frontend and Backend.

Current Backend
✓ Google Apps Script

Future Backends
✓ REST API
✓ Firebase
✓ Local Database
✓ Node Server

All application modules MUST communicate only
through DataService.

------------------------------------------------------------
*/

"use strict";

const DataService = (() => {

    let api = null;

    //------------------------------------------------------

    function init() {

        api = API;

        Logger.success("Data Service Ready");

    }

    //------------------------------------------------------
    // Customers
    //------------------------------------------------------

    async function loadCustomers() {

        return api.getCustomers();

    }

    //------------------------------------------------------
    // Register
    //------------------------------------------------------

    async function loadRegister(date) {

        return api.getRegister(date);

    }

    //------------------------------------------------------
    // Rate Table
    //------------------------------------------------------

    async function loadRateTable() {

        return api.getRateTable();

    }

    //------------------------------------------------------
    // Milk Save
    //------------------------------------------------------

    async function saveMilk(transaction) {

        return api.saveMilk(transaction);

    }

    //------------------------------------------------------
    // Cash Save
    //------------------------------------------------------

    async function saveCash(transaction) {

        return api.saveCash(transaction);

    }

    //------------------------------------------------------
    // Feed Save
    //------------------------------------------------------

    async function saveFeed(transaction) {

        return api.saveFeed(transaction);

    }

    //------------------------------------------------------
    // Reports
    //------------------------------------------------------

    async function loadReport(options) {

        return api.getReport(options);

    }

    //------------------------------------------------------
    // SMS
    //------------------------------------------------------

    async function sendSMS(data) {

        return api.sendSMS(data);

    }

    //------------------------------------------------------
    // Settings
    //------------------------------------------------------

    async function loadSettings() {

        return api.getSettings();

    }

    async function saveSettings(settings) {

        return api.saveSettings(settings);

    }

    //------------------------------------------------------
    // Health
    //------------------------------------------------------

    async function ping() {

        try {

            await api.ping();

            EventBus.emit("backend.connected");

            return true;

        }

        catch (error) {

            Logger.error(error);

            EventBus.emit("backend.disconnected");

            return false;

        }

    }

    //------------------------------------------------------

    return {

        init,

        loadCustomers,

        loadRegister,

        loadRateTable,

        saveMilk,

        saveCash,

        saveFeed,

        loadReport,

        sendSMS,

        loadSettings,

        saveSettings,

        ping

    };

})();
