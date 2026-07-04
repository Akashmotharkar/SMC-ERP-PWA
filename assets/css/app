/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0005
File    : assets/js/app.js
Status  : Production
------------------------------------------------------------
*/

'use strict';

/* ==========================================================
   APPLICATION
========================================================== */

const App = {

    version: "1.0.0-alpha.1",

    build: "0005",

    initialized: false,

    currentSample: {

        customerId: "",

        customerName: "",

        fat: null,

        snf: null,

        clr: null,

        quantity: null,

        rate: null,

        amount: null,

        date: null,

        source: null

    },

    devices: {

        analyzer: false,

        weight: false,

        bluetooth: false,

        internet: navigator.onLine,

        sheets: false

    }

};

/* ==========================================================
   DOM CACHE
========================================================== */

const UI = {

    cache() {

        this.collectionPoint =
            document.getElementById("collectionPoint");

        this.cycleDates =
            document.getElementById("cycleDates");

        this.internetStatus =
            document.getElementById("internetStatus");

        this.sheetStatus =
            document.getElementById("sheetStatus");

        this.analyzerStatus =
            document.getElementById("analyzerStatus");

        this.weightStatus =
            document.getElementById("weightStatus");

        this.version =
            document.getElementById("version");

        this.collectionForm =
            document.getElementById("collectionFormContainer");

        this.register =
            document.getElementById("registerContainer");

        this.logger =
            document.getElementById("loggerContainer");

        this.raw =
            document.getElementById("rawDataContainer");

    }

};

/* ==========================================================
   LOGGER
========================================================== */

const Logger = {

    info(message) {

        console.log("[INFO]", message);

    },

    success(message) {

        console.log("%c[SUCCESS] " + message,
            "color:green;font-weight:bold");

    },

    warning(message) {

        console.warn(message);

    },

    error(message) {

        console.error(message);

    }

};

/* ==========================================================
   STATUS
========================================================== */

function refreshStatusIndicators() {

    UI.internetStatus.style.background =
        App.devices.internet ? "#2e7d32" : "#c62828";

    UI.sheetStatus.style.background =
        App.devices.sheets ? "#2e7d32" : "#b0bec5";

    UI.analyzerStatus.style.background =
        App.devices.analyzer ? "#2e7d32" : "#b0bec5";

    UI.weightStatus.style.background =
        App.devices.weight ? "#2e7d32" : "#b0bec5";

}

/* ==========================================================
   NETWORK
========================================================== */

window.addEventListener("online", () => {

    App.devices.internet = true;

    refreshStatusIndicators();

    Logger.success("Internet Connected");

});

window.addEventListener("offline", () => {

    App.devices.internet = false;

    refreshStatusIndicators();

    Logger.warning("Internet Disconnected");

});

/* ==========================================================
   INIT
========================================================== */

function initialize() {

    Logger.info("Starting SMC Milk Collection...");

    UI.cache();

    UI.version.textContent =
        `v${App.version} Build ${App.build}`;

    refreshStatusIndicators();

    Logger.success("Application Initialized");

    App.initialized = true;

}

/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initialize

);
