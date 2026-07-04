/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0020
File    : assets/js/state.js
Status  : Production Ready
------------------------------------------------------------
*/

"use strict";

const State = (() => {

    const state = {

        system: {

            online: navigator.onLine,

            analyzerConnected: false,

            weightConnected: false,

            sheetConnected: false,

            bluetoothBusy: false,

            currentCenter: null,

            currentOperator: null

        },

        currentCustomer: null,

        currentSample: {

            fat: null,

            snf: null,

            clr: null,

            qty: null,

            rate: null,

            amount: null,

            received: false

        },

        waiting: {

            customer: false,

            analyzer: false

        },

        register: {

            selectedDate: Utils.today(),

            selectedCycle: null,

            selectedCustomer: null

        }

    };

    function get(path) {

        return path.split(".").reduce((o, i) => o?.[i], state);

    }

    function set(path, value) {

        const keys = path.split(".");

        const last = keys.pop();

        const obj = keys.reduce((o, i) => o[i], state);

        obj[last] = value;

    }

    function resetSample() {

        state.currentSample = {

            fat: null,

            snf: null,

            clr: null,

            qty: null,

            rate: null,

            amount: null,

            received: false

        };

    }

    function resetCustomer() {

        state.currentCustomer = null;

    }

    function saveComplete() {

        resetCustomer();

        resetSample();

        state.waiting.customer = false;
        state.waiting.analyzer = false;

    }

    function analyzerReceived(sample) {

        state.currentSample = {

            ...sample,

            received: true

        };

        state.waiting.customer =
            !state.currentCustomer;

    }

    function customerSelected(customer) {

        state.currentCustomer = customer;

        state.waiting.analyzer =
            !state.currentSample.received;

    }

    function readyToSave() {

        return (

            state.currentCustomer &&
            state.currentSample.received &&
            state.currentSample.qty != null &&
            state.currentSample.rate != null

        );

    }

    function updateConnection(name, status) {

        switch (name) {

            case "analyzer":

                state.system.analyzerConnected = status;
                break;

            case "weight":

                state.system.weightConnected = status;
                break;

            case "sheet":

                state.system.sheetConnected = status;
                break;

        }

    }

    function dump() {

        return structuredClone(state);

    }

    return {

        get,

        set,

        dump,

        resetSample,

        resetCustomer,

        analyzerReceived,

        customerSelected,

        readyToSave,

        updateConnection,

        saveComplete

    };

})();
