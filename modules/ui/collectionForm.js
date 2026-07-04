/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0007
File    : modules/ui/collectionForm.js
Status  : Production
------------------------------------------------------------
*/

'use strict';

const CollectionForm = {

    initialized: false,

    currentTab: "milk",

    controls: {},

    initialize() {

        this.cacheControls();

        this.setToday();

        this.bindEvents();

        this.focusCustomerID();

        Logger.success("Collection Form Initialized");

        this.initialized = true;

    },

    cacheControls() {

        this.controls = {

            collectionPoint: document.getElementById("collectionPointInput"),

            date: document.getElementById("collectionDate"),

            customerId: document.getElementById("customerId"),

            customerName: document.getElementById("customerName"),

            fat: document.getElementById("fat"),

            snf: document.getElementById("snf"),

            clr: document.getElementById("clr"),

            quantity: document.getElementById("milkQty"),

            rate: document.getElementById("rate"),

            amount: document.getElementById("amount"),

            cashAmount: document.getElementById("cashAmount"),

            cashRemark: document.getElementById("cashRemark"),

            feedItem: document.getElementById("feedItem"),

            feedAmount: document.getElementById("feedAmount"),

            saveButton: document.getElementById("saveButton")

        };

    },

    bindEvents() {

        document.querySelectorAll(".tab").forEach(tab => {

            tab.addEventListener("click", () => {

                this.switchTab(tab.dataset.tab);

            });

        });

        this.controls.customerId.addEventListener("keydown", e => {

            if (e.key === "Enter") {

                this.loadCustomer();

            }

        });

        this.controls.saveButton.addEventListener("click", () => {

            this.save();

        });

    },

    setToday() {

        const today = new Date();

        this.controls.date.value = today.toISOString().split("T")[0];

    },

    focusCustomerID() {

        setTimeout(() => {

            this.controls.customerId.focus();

            this.controls.customerId.select();

        }, 100);

    },

    switchTab(name) {

        this.currentTab = name;

        document.querySelectorAll(".tab").forEach(t => {

            t.classList.remove("active");

            if (t.dataset.tab === name)
                t.classList.add("active");

        });

        document.querySelectorAll(".tab-page").forEach(p => {

            p.classList.add("hidden");

        });

        document.getElementById(name + "Tab")
            .classList.remove("hidden");

    },

    loadCustomer() {

        const id = this.controls.customerId.value.trim();

        if (!id)
            return;

        Logger.info("Loading Customer : " + id);

        /*
            Google Sheet lookup
            Build 0012
        */

    },

    analyzerReceived(sample) {

        this.controls.fat.value = sample.fat;

        this.controls.snf.value = sample.snf;

        this.controls.clr.value = sample.clr;

        this.controls.quantity.value = sample.quantity;

        this.controls.rate.value = sample.rate;

        this.controls.amount.value = sample.amount;

        App.currentSample = sample;

        Logger.success("Analyzer values loaded");

    },

    clearMilk() {

        this.controls.fat.value = "";

        this.controls.snf.value = "";

        this.controls.clr.value = "";

        this.controls.quantity.value = "";

        this.controls.rate.value = "";

        this.controls.amount.value = "";

    },

    save() {

        Logger.info("Save Requested");

        /*
            Validation

            Google Sheet Save

            Register Refresh

            SMS

            Build 0015+
        */

    },

    reset() {

        this.controls.customerId.value = "";

        this.controls.customerName.value = "";

        this.clearMilk();

        this.focusCustomerID();

    }

};

document.addEventListener("DOMContentLoaded", () => {

    CollectionForm.initialize();

});
