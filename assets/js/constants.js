/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0007
File    : assets/js/constants.js
Status  : Production
------------------------------------------------------------
*/

'use strict';

const CONSTANTS = Object.freeze({

    /* =====================================================
       APPLICATION
    ===================================================== */

    APP_STATUS: {

        STARTING: "STARTING",

        READY: "READY",

        BUSY: "BUSY",

        ERROR: "ERROR"

    },

    /* =====================================================
       CONNECTION STATUS
    ===================================================== */

    CONNECTION: {

        DISCONNECTED: "DISCONNECTED",

        CONNECTING: "CONNECTING",

        CONNECTED: "CONNECTED",

        RECONNECTING: "RECONNECTING",

        FAILED: "FAILED"

    },

    /* =====================================================
       DEVICES
    ===================================================== */

    DEVICES: {

        ANALYZER: "ANALYZER",

        WEIGHING_SCALE: "WEIGHING_SCALE",

        GOOGLE_SHEETS: "GOOGLE_SHEETS",

        INTERNET: "INTERNET"

    },

    /* =====================================================
       TRANSACTION TYPES
    ===================================================== */

    TRANSACTION: {

        MILK: "MILK",

        CASH: "CASH",

        FEED: "FEED"

    },

    /* =====================================================
       TABS
    ===================================================== */

    TABS: {

        MILK: "milk",

        CASH: "cash",

        FEED: "feed"

    },

    /* =====================================================
       LOGGER
    ===================================================== */

    LOG_LEVEL: {

        INFO: "INFO",

        SUCCESS: "SUCCESS",

        WARNING: "WARNING",

        ERROR: "ERROR",

        DEBUG: "DEBUG",

        RECEIVE: "RECEIVE",

        SEND: "SEND",

        PARSER: "PARSER"

    },

    /* =====================================================
       EVENT BUS EVENTS
    ===================================================== */

    EVENTS: {

        APP_READY: "app:ready",

        APP_ERROR: "app:error",

        CUSTOMER_CHANGED: "customer:changed",

        CUSTOMER_LOADED: "customer:loaded",

        CUSTOMER_NOT_FOUND: "customer:not_found",

        ANALYZER_CONNECTED: "analyzer:connected",

        ANALYZER_DISCONNECTED: "analyzer:disconnected",

        ANALYZER_DATA: "analyzer:data",

        WEIGHT_RECEIVED: "weight:received",

        SAMPLE_UPDATED: "sample:updated",

        SAMPLE_READY: "sample:ready",

        SAVE_REQUESTED: "save:requested",

        SAVE_SUCCESS: "save:success",

        SAVE_FAILED: "save:failed",

        REGISTER_REFRESH: "register:refresh",

        SETTINGS_CHANGED: "settings:changed",

        BLUETOOTH_CONNECTED: "bluetooth:connected",

        BLUETOOTH_DISCONNECTED: "bluetooth:disconnected"

    },

    /* =====================================================
       GOOGLE API
    ===================================================== */

    API: {

        LOAD_CUSTOMER: "LOAD_CUSTOMER",

        LOAD_RATE: "LOAD_RATE",

        SAVE_MILK: "SAVE_MILK",

        SAVE_CASH: "SAVE_CASH",

        SAVE_FEED: "SAVE_FEED",

        LOAD_REGISTER: "LOAD_REGISTER",

        LOAD_SETTINGS: "LOAD_SETTINGS"

    },

    /* =====================================================
       STORAGE KEYS
    ===================================================== */

    STORAGE: {

        SETTINGS: "smc_settings",

        USER: "smc_user",

        SAMPLE: "smc_current_sample",

        LOGGER: "smc_logger",

        OFFLINE_QUEUE: "smc_offline_queue"

    },

    /* =====================================================
       SAMPLE BUFFER STATUS
    ===================================================== */

    SAMPLE: {

        EMPTY: "EMPTY",

        WAITING_CUSTOMER: "WAITING_CUSTOMER",

        WAITING_ANALYZER: "WAITING_ANALYZER",

        WAITING_WEIGHT: "WAITING_WEIGHT",

        READY: "READY",

        SAVED: "SAVED"

    },

    /* =====================================================
       REGISTER
    ===================================================== */

    REGISTER: {

        PREVIOUS_BALANCE: "previousBalance",

        CASH_TOTAL: "cashTotal",

        FEED_TOTAL: "feedTotal",

        MILK_TOTAL: "milkTotal",

        FINAL_AMOUNT: "finalAmount"

    }

});
