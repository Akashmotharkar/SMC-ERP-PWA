/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0038
File    : assets/js/status-bar.js
------------------------------------------------------------

Status Bar Controller

Controls

✓ Internet
✓ Google Sheets
✓ Analyzer
✓ Weighing Scale
✓ Offline Queue
✓ Operator
✓ Collection Center
✓ Collection Period

Listens using EventBus

------------------------------------------------------------
*/

"use strict";

const StatusBar = (() => {

    const ui = {};

    function init() {

        cache();

        bindEvents();

        refresh();

        Logger.success("Status Bar Ready");

    }

    //--------------------------------------------------

    function cache() {

        ui.internet = document.getElementById("statusInternet");
        ui.api = document.getElementById("statusAPI");
        ui.analyzer = document.getElementById("statusAnalyzer");
        ui.weight = document.getElementById("statusWeight");
        ui.queue = document.getElementById("statusQueue");
        ui.operator = document.getElementById("statusOperator");
        ui.center = document.getElementById("statusCenter");
        ui.period = document.getElementById("statusPeriod");

    }

    //--------------------------------------------------

    function bindEvents() {

        window.addEventListener("online", refreshInternet);
        window.addEventListener("offline", refreshInternet);

        EventBus.on("connection.changed", refreshConnections);

        EventBus.on("queue.updated", refreshQueue);

        EventBus.on("settings.changed", refreshSettings);

    }

    //--------------------------------------------------

    function refresh() {

        refreshInternet();

        refreshConnections();

        refreshQueue();

        refreshSettings();

        refreshPeriod();

    }

    //--------------------------------------------------

    function refreshInternet() {

        update(

            ui.internet,

            navigator.onLine,

            "Internet"

        );

    }

    //--------------------------------------------------

    function refreshConnections() {

        update(

            ui.analyzer,

            ConnectionManager.isAnalyzerConnected(),

            "Analyzer"

        );

        update(

            ui.weight,

            ConnectionManager.isWeightConnected(),

            "Weight"

        );

        update(

            ui.api,

            ConnectionManager.isAPIConnected(),

            "Sheets"

        );

    }

    //--------------------------------------------------

    function refreshQueue() {

        const count = OfflineQueue.count();

        if (!ui.queue) return;

        ui.queue.className =

            count === 0

                ? "status online"

                : "status warning";

        ui.queue.textContent =

            "Queue : " + count;

    }

    //--------------------------------------------------

    function refreshSettings() {

        if (ui.operator) {

            ui.operator.textContent =

                "Operator : " +

                (AppState.operator?.name || "-");

        }

        if (ui.center) {

            ui.center.textContent =

                "Center : " +

                (AppState.collectionCenter?.name || "-");

        }

    }

    //--------------------------------------------------

    function refreshPeriod() {

        if (!ui.period) return;

        ui.period.textContent =

            CollectionPeriod.title();

    }

    //--------------------------------------------------

    function update(element, state, label) {

        if (!element) return;

        if (state) {

            element.className =

                "status online";

            element.textContent =

                label + " ✓";

        }

        else {

            element.className =

                "status offline";

            element.textContent =

                label + " ✕";

        }

    }

    //--------------------------------------------------

    return {

        init,

        refresh,

        refreshInternet,

        refreshConnections,

        refreshQueue,

        refreshSettings,

        refreshPeriod

    };

})();
