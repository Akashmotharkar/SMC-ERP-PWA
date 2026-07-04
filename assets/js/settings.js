/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0028
File    : assets/js/settings.js
------------------------------------------------------------
Application Settings Manager

Stores application configuration locally.

Future:
• Google Drive Sync
• Cloud Backup
• Multi Collection Point
• SMS Settings
• API Settings
------------------------------------------------------------
*/

"use strict";

const Settings = (() => {

    const STORAGE_KEY = "smc_settings";

    let settings = {};

    const defaults = {

        app: {

            version: "1.0.0-alpha.1",

            build: "0028"

        },

        collection: {

            pointId: "CP001",

            pointName: "Main Collection Center"

        },

        ui: {

            theme: "light",

            compactMode: true,

            registerZoom: 100

        },

        bluetooth: {

            analyzerName: "",

            weighingScaleName: "",

            autoReconnect: true

        },

        logging: {

            enabled: true,

            rawData: true,

            debug: true

        },

        sms: {

            enabled: false,

            milk: true,

            cash: true,

            feed: true,

            weeklySummary: true

        },

        printer: {

            enabled: false,

            autoPrint: false

        },

        sync: {

            offlineMode: true,

            autoSync: true,

            backupInterval: 300

        },

        api: {

            backendUrl: "",

            apiKey: ""

        }

    };

    function init() {

        load();

        Logger.success("Settings Ready");

    }

    function load() {

        try {

            const json =
                localStorage.getItem(STORAGE_KEY);

            if (!json) {

                settings =
                    structuredClone(defaults);

                save();

                return;

            }

            settings = JSON.parse(json);

            mergeDefaults();

        }

        catch (error) {

            Logger.error(error);

            settings =
                structuredClone(defaults);

        }

    }

    function save() {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(settings)

        );

    }

    function mergeDefaults() {

        settings = mergeObjects(

            structuredClone(defaults),

            settings

        );

        save();

    }

    function mergeObjects(base, source) {

        Object.keys(source).forEach(key => {

            if (

                typeof source[key] === "object"

                &&

                source[key] !== null

                &&

                !Array.isArray(source[key])

            ) {

                if (!base[key])

                    base[key] = {};

                base[key] = mergeObjects(

                    base[key],

                    source[key]

                );

            }

            else {

                base[key] = source[key];

            }

        });

        return base;

    }

    function get(path) {

        return path

            .split(".")

            .reduce(

                (o, k) =>

                    o ? o[k] : undefined,

                settings

            );

    }

    function set(path, value) {

        const keys = path.split(".");

        let obj = settings;

        while (keys.length > 1) {

            const key = keys.shift();

            if (!obj[key])

                obj[key] = {};

            obj = obj[key];

        }

        obj[keys[0]] = value;

        save();

    }

    function reset() {

        settings =
            structuredClone(defaults);

        save();

        Logger.warning(

            "Settings Reset"

        );

    }

    function exportJSON() {

        return JSON.stringify(

            settings,

            null,

            2

        );

    }

    function importJSON(json) {

        try {

            settings = JSON.parse(json);

            mergeDefaults();

            save();

            return true;

        }

        catch (error) {

            Logger.error(error);

            return false;

        }

    }

    function all() {

        return structuredClone(settings);

    }

    return {

        init,

        load,

        save,

        get,

        set,

        all,

        reset,

        exportJSON,

        importJSON

    };

})();
