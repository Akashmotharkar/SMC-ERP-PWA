/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0021
File    : assets/js/ui.js
Status  : Production Ready
------------------------------------------------------------
*/

"use strict";

const UI = (() => {

    const el = {};

    function cache() {

        el.collectionPoint = document.getElementById("collectionPoint");
        el.collectionDate = document.getElementById("collectionDate");

        el.customerId = document.getElementById("customerId");
        el.customerName = document.getElementById("customerName");

        el.fat = document.getElementById("fat");
        el.snf = document.getElementById("snf");
        el.clr = document.getElementById("clr");

        el.qty = document.getElementById("qty");
        el.rate = document.getElementById("rate");
        el.amount = document.getElementById("amount");

        el.saveButton = document.getElementById("btnSave");
        el.clearButton = document.getElementById("btnClear");

        el.register = document.getElementById("registerContainer");

        el.statusAnalyzer =
            document.getElementById("statusAnalyzer");

        el.statusWeight =
            document.getElementById("statusWeight");

        el.statusSheets =
            document.getElementById("statusSheets");

        el.statusInternet =
            document.getElementById("statusInternet");

        el.waitingMessage =
            document.getElementById("waitingMessage");

    }

    function init() {

        cache();

        bindEvents();

        refreshDate();

        refreshConnections();

        clearForm();

        Logger.success("UI Initialized");

    }

    function bindEvents() {

        if (el.customerId) {

            el.customerId.addEventListener(
                "keydown",
                onCustomerKey
            );

        }

        if (el.saveButton) {

            el.saveButton.addEventListener(
                "click",
                save
            );

        }

        if (el.clearButton) {

            el.clearButton.addEventListener(
                "click",
                clearForm
            );

        }

        window.addEventListener(
            "online",
            refreshConnections
        );

        window.addEventListener(
            "offline",
            refreshConnections
        );

    }

    async function onCustomerKey(e) {

        if (e.key !== "Enter") return;

        const id = el.customerId.value.trim();

        if (!id) return;

        await Customer.load(id);

    }

    async function save() {

        if (!State.readyToSave()) {

            Logger.warning(
                "Sample not ready."
            );

            return;

        }

        await Transaction.saveMilk();

        clearForm();

    }

    function clearForm() {

        if (el.customerId) el.customerId.value = "";
        if (el.customerName) el.customerName.textContent = "";

        if (el.fat) el.fat.value = "";
        if (el.snf) el.snf.value = "";
        if (el.clr) el.clr.value = "";

        if (el.qty) el.qty.value = "";
        if (el.rate) el.rate.value = "";
        if (el.amount) el.amount.value = "";

        State.resetCustomer();
        State.resetSample();

        updateWaiting();

        disableSave();

        focusCustomer();

    }

    function populateCustomer(customer) {

        if (!customer) return;

        if (el.customerName)
            el.customerName.textContent =
                customer.name;

        State.customerSelected(customer);

        updateWaiting();

        enableIfReady();

    }

    function populateAnalyzer(sample) {

        if (!sample) return;

        el.fat.value = sample.fat ?? "";
        el.snf.value = sample.snf ?? "";
        el.clr.value = sample.clr ?? "";
        el.qty.value = sample.qty ?? "";

        State.analyzerReceived(sample);

        updateWaiting();

        enableIfReady();

    }

    function updateRate(rate) {

        el.rate.value = Utils.number(rate);

    }

    function updateAmount(amount) {

        el.amount.value = Utils.money(amount);

    }

    function refreshRegister() {

        Register.render();

    }

    function refreshConnections() {

        updateIndicator(
            el.statusInternet,
            navigator.onLine
        );

        updateIndicator(
            el.statusAnalyzer,
            State.get("system.analyzerConnected")
        );

        updateIndicator(
            el.statusWeight,
            State.get("system.weightConnected")
        );

        updateIndicator(
            el.statusSheets,
            State.get("system.sheetConnected")
        );

    }

    function updateIndicator(element, connected) {

        if (!element) return;

        element.classList.remove(
            "online",
            "offline"
        );

        if (connected) {

            element.classList.add("online");

        } else {

            element.classList.add("offline");

        }

    }

    function refreshDate() {

        if (el.collectionDate) {

            el.collectionDate.value =
                Utils.today();

        }

    }

    function updateWaiting() {

        if (!el.waitingMessage) return;

        const waitingCustomer =
            State.get("waiting.customer");

        const waitingAnalyzer =
            State.get("waiting.analyzer");

        if (waitingCustomer) {

            el.waitingMessage.textContent =
                "Waiting for Customer ID";

            return;

        }

        if (waitingAnalyzer) {

            el.waitingMessage.textContent =
                "Waiting for Analyzer";

            return;

        }

        el.waitingMessage.textContent =
            "";

    }

    function enableIfReady() {

        if (State.readyToSave()) {

            enableSave();

        }

    }

    function enableSave() {

        if (!el.saveButton) return;

        el.saveButton.disabled = false;

    }

    function disableSave() {

        if (!el.saveButton) return;

        el.saveButton.disabled = true;

    }

    function focusCustomer() {

        setTimeout(() => {

            if (el.customerId)
                el.customerId.focus();

        }, 100);

    }

    return {

        init,

        clearForm,

        populateCustomer,

        populateAnalyzer,

        updateRate,

        updateAmount,

        refreshConnections,

        refreshRegister,

        focusCustomer

    };

})();
