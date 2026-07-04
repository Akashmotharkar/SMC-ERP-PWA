/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0031
File    : assets/js/router.js
------------------------------------------------------------
Application UI Router

Single Screen PWA

Controls

✓ Milk Collection
✓ Settings Panel
✓ SMS Utility
✓ Logger
✓ Raw Data
✓ Offline Queue
✓ Future Reports
✓ Future Admin

No page reloads.
------------------------------------------------------------
*/

"use strict";

const Router = (() => {

    let currentView = "collection";

    const panels = {};

    function init() {

        cache();

        bind();

        show("collection");

        Logger.success("Router Ready");

    }

    function cache() {

        panels.collection =
            document.getElementById("collectionView");

        panels.settings =
            document.getElementById("settingsPanel");

        panels.sms =
            document.getElementById("smsPanel");

        panels.logger =
            document.getElementById("loggerPanel");

        panels.raw =
            document.getElementById("rawPanel");

        panels.queue =
            document.getElementById("offlineQueuePanel");

    }

    function bind() {

        bindButton("btnSettings", "settings");
        bindButton("btnSMS", "sms");
        bindButton("btnLogger", "logger");
        bindButton("btnRaw", "raw");
        bindButton("btnQueue", "queue");
        bindButton("btnCollection", "collection");

    }

    function bindButton(id, view) {

        const button =
            document.getElementById(id);

        if (!button) return;

        button.addEventListener(

            "click",

            () => toggle(view)

        );

    }

    function toggle(view) {

        if (view === "collection") {

            show("collection");

            return;

        }

        if (currentView === view) {

            show("collection");

            return;

        }

        show(view);

    }

    function show(view) {

        hideAll();

        currentView = view;

        const panel = panels[view];

        if (!panel) return;

        panel.classList.remove("hidden");

        panel.classList.add("visible");

        Logger.info(

            "View : " + view

        );

    }

    function hideAll() {

        Object.values(panels).forEach(panel => {

            if (!panel) return;

            panel.classList.remove("visible");

            panel.classList.add("hidden");

        });

    }

    function current() {

        return currentView;

    }

    function is(view) {

        return currentView === view;

    }

    function openSettings() {

        show("settings");

    }

    function openSMS() {

        show("sms");

    }

    function openLogger() {

        show("logger");

    }

    function openRaw() {

        show("raw");

    }

    function openQueue() {

        show("queue");

    }

    function back() {

        show("collection");

    }

    return {

        init,

        show,

        toggle,

        current,

        is,

        back,

        openSettings,

        openSMS,

        openLogger,

        openRaw,

        openQueue

    };

})();
