/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0012
File    : assets/js/state.js
Status  : Production
------------------------------------------------------------
*/

"use strict";

const State = (() => {

    const data = {

        app: {
            version: "1.0.0-alpha.1",
            build: "0012",
            initialized: false
        },

        operator: null,

        collectionPoint: null,

        selectedDate: new Date(),

        currentCustomer: null,

        currentSample: {

            fat: null,
            snf: null,
            clr: null,
            qty: null,

            rate: null,
            amount: null,

            source: null,
            timestamp: null

        },

        draft: {

            waitingCustomer: false,
            waitingAnalyzer: false,

            customerReady: false,
            analyzerReady: false,

            saveReady: false

        },

        register: {

            customers: [],
            transactions: []

        },

        bluetooth: {

            connected: false,
            deviceName: "",
            lastPacket: ""

        },

        analyzer: {

            connected: false,
            lastPacketTime: null

        },

        weighingScale: {

            connected: false,
            weight: null

        },

        sheets: {

            connected: false,
            syncing: false

        },

        internet: {

            online: navigator.onLine

        },

        settings: {}

    };



    function get(path = null) {

        if (!path)
            return data;

        return path.split(".").reduce((o, i) => o?.[i], data);

    }



    function set(path, value) {

        const keys = path.split(".");

        const last = keys.pop();

        let obj = data;

        keys.forEach(key => {

            if (!obj[key])
                obj[key] = {};

            obj = obj[key];

        });

        obj[last] = value;

    }



    function merge(path, values) {

        const current = get(path);

        if (!current)
            return;

        Object.assign(current, values);

    }



    function resetCurrentSample() {

        data.currentCustomer = null;

        data.currentSample = {

            fat: null,
            snf: null,
            clr: null,
            qty: null,

            rate: null,
            amount: null,

            source: null,
            timestamp: null

        };

        data.draft = {

            waitingCustomer: true,

            waitingAnalyzer: true,

            customerReady: false,

            analyzerReady: false,

            saveReady: false

        };

        Logger.info("Current Sample Reset");

    }



    function analyzerReceived(sample) {

        data.currentSample = {

            ...data.currentSample,

            ...sample,

            timestamp: Date.now()

        };

        data.draft.analyzerReady = true;

        updateDraftState();

    }



    function customerSelected(customer) {

        data.currentCustomer = customer;

        data.draft.customerReady = true;

        updateDraftState();

    }



    function updateRate(rate) {

        data.currentSample.rate = rate;

        calculateAmount();

    }



    function updateQuantity(qty) {

        data.currentSample.qty = qty;

        calculateAmount();

    }



    function calculateAmount() {

        const rate = Number(data.currentSample.rate || 0);

        const qty = Number(data.currentSample.qty || 0);

        data.currentSample.amount = +(rate * qty).toFixed(2);

    }



    function updateDraftState() {

        data.draft.saveReady =

            data.draft.customerReady &&

            data.draft.analyzerReady;

    }



    function saveComplete() {

        resetCurrentSample();

    }



    return {

        get,

        set,

        merge,

        resetCurrentSample,

        analyzerReceived,

        customerSelected,

        updateRate,

        updateQuantity,

        calculateAmount,

        saveComplete

    };

})();
