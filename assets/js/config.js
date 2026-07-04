/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0006
File    : assets/js/config.js
Status  : Production
------------------------------------------------------------
*/

'use strict';

const CONFIG = Object.freeze({

    /* =====================================================
       APPLICATION
    ===================================================== */

    APP: {

        NAME: "SMC Milk Collection",

        VERSION: "1.0.0-alpha.1",

        BUILD: "0006",

        DEBUG: true,

        LANGUAGE: "en",

        TIMEZONE: "Asia/Kolkata"

    },

    /* =====================================================
       GOOGLE APPS SCRIPT
    ===================================================== */

    API: {

        BASE_URL: "",

        TIMEOUT: 15000,

        RETRY_COUNT: 3,

        RETRY_DELAY: 1000

    },

    /* =====================================================
       GOOGLE SHEETS
    ===================================================== */

    SHEETS: {

        CUSTOMERS: "Customers",

        MILK: "MilkCollection",

        CASH: "CashCollection",

        FEED: "FeedCollection",

        RATE_CHART: "RateChart",

        SETTINGS: "Settings",

        USERS: "Users",

        LOGS: "Logs"

    },

    /* =====================================================
       COLLECTION
    ===================================================== */

    COLLECTION: {

        DEFAULT_LOCATION: "",

        AUTO_SAVE: false,

        AUTO_FOCUS: true,

        AUTO_CLEAR_AFTER_SAVE: true,

        REQUIRE_CUSTOMER: true,

        REQUIRE_ANALYZER: true,

        REQUIRE_WEIGHT: true

    },

    /* =====================================================
       BILLING CYCLE
    ===================================================== */

    BILLING: {

        CYCLE_1_START: 1,

        CYCLE_1_END: 10,

        CYCLE_2_START: 11,

        CYCLE_2_END: 20,

        CYCLE_3_START: 21

    },

    /* =====================================================
       BLUETOOTH
    ===================================================== */

    BLUETOOTH: {

        AUTO_CONNECT: false,

        RECONNECT: true,

        MAX_BUFFER_SIZE: 4096,

        PACKET_TIMEOUT: 3000

    },

    /* =====================================================
       ANALYZER
    ===================================================== */

    ANALYZER: {

        FAT_DECIMAL: 1,

        SNF_DECIMAL: 1,

        CLR_DECIMAL: 2,

        QTY_DECIMAL: 3

    },

    /* =====================================================
       SMS
    ===================================================== */

    SMS: {

        ENABLED: false,

        MILK: true,

        CASH: true,

        FEED: true,

        BULK: true

    },

    /* =====================================================
       OFFLINE
    ===================================================== */

    OFFLINE: {

        ENABLED: true,

        MAX_PENDING_RECORDS: 5000

    },

    /* =====================================================
       LOGGER
    ===================================================== */

    LOGGER: {

        ENABLED: true,

        RAW_DATA: true,

        MAX_ENTRIES: 2000

    },

    /* =====================================================
       REGISTER
    ===================================================== */

    REGISTER: {

        AUTO_SCROLL: true,

        SHOW_PREVIOUS_BALANCE: true,

        SHOW_DEDUCTIONS: true,

        SHOW_TOTALS: true

    },

    /* =====================================================
       UI
    ===================================================== */

    UI: {

        LEFT_PANEL_PERCENT: 22,

        RIGHT_PANEL_PERCENT: 18,

        COMPACT_MODE: true,

        ANIMATION: true

    },

    /* =====================================================
       KEYBOARD
    ===================================================== */

    SHORTCUTS: {

        SAVE: "Enter",

        SEARCH: "F2",

        SETTINGS: "F8",

        LOGGER: "F9",

        RAW_DATA: "F10"

    }

});
