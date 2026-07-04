/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0014
File    : assets/js/ui.js
Status  : Production Ready
------------------------------------------------------------
*/

"use strict";

const UI = (() => {

    const el = {};

    function initialize() {

        cacheElements();

        bindEvents();

        initializeDate();

        updateCycle();

        updateConnectionIndicators();

        Logger.info("UI Initialized");

    }

    function cacheElements() {

        // Header

        el.collectionPoint = document.getElementById("collectionPoint");
        el.collectionDate = document.getElementById("collectionDate");
        el.cycleText = document.getElementById("cycleText");

        // Milk Form

        el.customerID = document.getElementById("customerID");
        el.customerName = document.getElementById("customerName");

        el.fat = document.getElementById("fat");
        el.snf = document.getElementById("snf");
        el.clr = document.getElementById("clr");

        el.qty = document.getElementById("qty");
        el.rate = document.getElementById("rate");
        el.amount = document.getElementById("amount");

        el.saveButton = document.getElementById("btnSave");

        // Tabs

        el.tabMilk = document.getElementById("tabMilk");
        el.tabCash = document.getElementById("tabCash");
        el.tabFeed = document.getElementById("tabFeed");

        // Register

        el.registerContainer =
            document.getElementById("registerContainer");

        // Status

        el.internet =
            document.getElementById("internetStatus");

        el.bluetooth =
            document.getElementById("bluetoothStatus");

        el.analyzer =
            document.getElementById("analyzerStatus");

        el.sheet =
            document.getElementById("sheetStatus");

    }

    function bindEvents() {

        el.collectionDate?.addEventListener(

            "change",

            onDateChanged

        );

        el.customerID?.addEventListener(

            "keyup",

            onCustomerID

        );

        el.saveButton?.addEventListener(

            "click",

            onSaveClicked

        );

    }

    function initializeDate() {

        if (!el.collectionDate) return;

        el.collectionDate.value = Utils.today();

    }

    function updateCycle() {

        if (!el.cycleText) return;

        const cycle =
            Utils.tenDayCycle(el.collectionDate.value);

        el.cycleText.textContent =
            cycle.from + "  →  " + cycle.to;

    }

    function updateConnectionIndicators() {

        updateInternetStatus(navigator.onLine);

        updateBluetoothStatus(false);

        updateAnalyzerStatus(false);

        updateSheetStatus(false);

    }

    function updateInternetStatus(status) {

        if (!el.internet) return;

        el.internet.classList.toggle(

            "connected",

            status

        );

        el.internet.classList.toggle(

            "disconnected",

            !status

        );

        el.internet.innerText =
            status ? "ONLINE" : "OFFLINE";

    }

    function updateBluetoothStatus(status) {

        if (!el.bluetooth) return;

        el.bluetooth.classList.toggle(

            "connected",

            status

        );

        el.bluetooth.classList.toggle(

            "disconnected",

            !status

        );

        el.bluetooth.innerText =
            status ? "CONNECTED" : "DISCONNECTED";

    }

    function updateAnalyzerStatus(status) {

        if (!el.analyzer) return;

        el.analyzer.classList.toggle(

            "connected",

            status

        );

        el.analyzer.classList.toggle(

            "disconnected",

            !status

        );

        el.analyzer.innerText =
            status ? "READY" : "WAITING";

    }

    function updateSheetStatus(status) {

        if (!el.sheet) return;

        el.sheet.classList.toggle(

            "connected",

            status

        );

        el.sheet.classList.toggle(

            "disconnected",

            !status

        );

        el.sheet.innerText =
            status ? "CONNECTED" : "OFFLINE";

    }

    function loadCustomer(customer) {

        if (!customer) return;

        el.customerName.value =
            customer.name;

    }

    function updateAnalyzerValues(sample) {

        Utils.setValue("fat", sample.fat);

        Utils.setValue("snf", sample.snf);

        Utils.setValue("clr", sample.clr);

        Utils.setValue("qty", sample.qty);

        Utils.setValue("rate", sample.rate);

        Utils.setValue("amount", sample.amount);

    }

    function clearEntry() {

        Utils.setValue("customerID", "");

        Utils.setValue("customerName", "");

        Utils.setValue("fat", "");

        Utils.setValue("snf", "");

        Utils.setValue("clr", "");

        Utils.setValue("qty", "");

        Utils.setValue("rate", "");

        Utils.setValue("amount", "");

        Utils.focus("customerID");

    }

    function enableSave(enable) {

        if (!el.saveButton) return;

        el.saveButton.disabled = !enable;

    }

    function scrollRegister(customerID) {

        const column = document.querySelector(

            `[data-customer='${customerID}']`

        );

        if (!column) return;

        column.scrollIntoView({

            behavior: "smooth",

            inline: "center",

            block: "nearest"

        });

    }

    function refreshRegister(registerHTML) {

        if (!el.registerContainer) return;

        el.registerContainer.innerHTML =
            registerHTML;

    }

    function switchTab(name) {

        document

            .querySelectorAll(".entry-tab")

            .forEach(tab => {

                tab.classList.remove("active");

            });

        document

            .querySelectorAll(".entry-page")

            .forEach(page => {

                page.style.display = "none";

            });

        document

            .getElementById("tab" + name)

            ?.classList.add("active");

        document

            .getElementById(name + "Page")

            ?.style.display = "block";

    }

    function onCustomerID() {

        // Customer lookup will be implemented later

    }

    function onDateChanged() {

        updateCycle();

    }

    function onSaveClicked() {

        // Save workflow implemented later

    }

    return {

        initialize,

        loadCustomer,

        updateAnalyzerValues,

        updateInternetStatus,

        updateBluetoothStatus,

        updateAnalyzerStatus,

        updateSheetStatus,

        clearEntry,

        enableSave,

        scrollRegister,

        refreshRegister,

        switchTab

    };

})();
