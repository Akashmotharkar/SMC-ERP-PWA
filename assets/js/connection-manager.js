/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0027
File    : assets/js/connection-manager.js
------------------------------------------------------------
Central Connection Manager

Monitors

✓ Internet
✓ Bluetooth
✓ Milk Analyzer
✓ Weighing Scale
✓ Google Sheets Backend

Future

✓ Multiple analyzers
✓ Multiple weighing scales
✓ Heartbeat
✓ Auto reconnect
✓ Offline mode
------------------------------------------------------------
*/

"use strict";

const ConnectionManager = (() => {

    const state = {

        internet: false,

        bluetooth: false,

        analyzer: false,

        weight: false,

        sheets: false

    };

    let heartbeatTimer = null;

    function init() {

        Logger.success(
            "Connection Manager Started"
        );

        watchInternet();

        startHeartbeat();

    }

    function watchInternet() {

        updateInternet(
            navigator.onLine
        );

        window.addEventListener(
            "online",
            () => {

                updateInternet(true);

            }
        );

        window.addEventListener(
            "offline",
            () => {

                updateInternet(false);

            }
        );

    }

    function updateInternet(status) {

        state.internet = status;

        State.set(
            "system.internetConnected",
            status
        );

        Logger.info(
            "Internet : " +

            (status ? "ONLINE" : "OFFLINE")
        );

        refreshUI();

    }

    function updateBluetooth(status) {

        state.bluetooth = status;

        State.set(
            "system.bluetoothConnected",
            status
        );

        Logger.info(
            "Bluetooth : " +

            (status ? "CONNECTED" : "DISCONNECTED")
        );

        refreshUI();

    }

    function updateAnalyzer(status) {

        state.analyzer = status;

        State.set(
            "system.analyzerConnected",
            status
        );

        Logger.info(
            "Analyzer : " +

            (status ? "CONNECTED" : "DISCONNECTED")
        );

        refreshUI();

    }

    function updateWeight(status) {

        state.weight = status;

        State.set(
            "system.weightConnected",
            status
        );

        Logger.info(
            "Weight Scale : " +

            (status ? "CONNECTED" : "DISCONNECTED")
        );

        refreshUI();

    }

    function updateSheets(status) {

        state.sheets = status;

        State.set(
            "system.sheetConnected",
            status
        );

        Logger.info(
            "Google Sheets : " +

            (status ? "CONNECTED" : "DISCONNECTED")
        );

        refreshUI();

    }

    function refreshUI() {

        UI.refreshConnections();

    }

    function startHeartbeat() {

        if (heartbeatTimer)

            clearInterval(heartbeatTimer);

        heartbeatTimer = setInterval(

            heartbeat,

            10000

        );

    }

    async function heartbeat() {

        try {

            if (navigator.onLine) {

                updateInternet(true);

            }

            else {

                updateInternet(false);

            }

        }

        catch (error) {

            Logger.error(error);

        }

    }

    function connected() {

        return {

            ...state

        };

    }

    function reset() {

        updateBluetooth(false);

        updateAnalyzer(false);

        updateWeight(false);

        updateSheets(false);

    }

    function stop() {

        if (heartbeatTimer) {

            clearInterval(
                heartbeatTimer
            );

            heartbeatTimer = null;

        }

    }

    return {

        init,

        stop,

        reset,

        connected,

        updateInternet,

        updateBluetooth,

        updateAnalyzer,

        updateWeight,

        updateSheets

    };

})();
