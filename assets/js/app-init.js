/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0041
File    : assets/js/app-init.js
------------------------------------------------------------

Application Initializer

Responsible for boot sequence.

------------------------------------------------------------
*/

"use strict";

const AppInitializer = (() => {

    async function start() {

        try {

            Logger.info("--------------------------------");

            Logger.info("SMC Milk Collection Starting...");

            Logger.info("--------------------------------");

            //--------------------------------------------------
            // Core
            //--------------------------------------------------

            StateManager.init();

            EventBus.emit("app.state.ready");

            Settings.init();

            Storage.init();

            Router.init();

            //--------------------------------------------------
            // UI
            //--------------------------------------------------

            Tabs.init();

            UI.init();

            KeyboardManager.init();

            StatusBar.init();

            //--------------------------------------------------
            // Business Modules
            //--------------------------------------------------

            ConnectionManager.init();

            OfflineQueue.init();

            SampleBuffer.init();

            Register.init();

            Customer.init();

            Rate.init();

            Transaction.init();

            //--------------------------------------------------
            // Services
            //--------------------------------------------------

            DataService.init();

            //--------------------------------------------------
            // Bluetooth
            //--------------------------------------------------

            Bluetooth.init();

            Analyzer.init();

            //--------------------------------------------------
            // Restore Cached Data
            //--------------------------------------------------

            await loadCachedData();

            //--------------------------------------------------
            // Refresh UI
            //--------------------------------------------------

            StatusBar.refresh();

            Register.refresh();

            //--------------------------------------------------
            // Auto Focus
            //--------------------------------------------------

            KeyboardManager.focusCustomer();

            //--------------------------------------------------

            EventBus.emit("app.ready");

            Logger.success("Application Ready");

        }

        catch (error) {

            Logger.error(error);

            Logger.error("Application Startup Failed");

        }

    }

    //------------------------------------------------------

    async function loadCachedData() {

        try {

            Logger.info("Loading Cached Data...");

            if (Customer.loadCache) {

                await Customer.loadCache();

            }

            if (Rate.loadCache) {

                await Rate.loadCache();

            }

            Logger.success("Cached Data Loaded");

        }

        catch (error) {

            Logger.error(error);

        }

    }

    //------------------------------------------------------

    return {

        start

    };

})();
