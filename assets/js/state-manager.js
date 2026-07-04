/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0039
File    : assets/js/state-manager.js
------------------------------------------------------------

Application State Manager

Purpose

Single controlled access point for AppState.

Features

✓ Safe Get
✓ Safe Set
✓ Deep Merge
✓ Reset
✓ Snapshot
✓ EventBus Integration
✓ Automatic Logging

Never modify AppState directly.
Always use StateManager.

------------------------------------------------------------
*/

"use strict";

const StateManager = (() => {

    //------------------------------------------------------
    // Initialize
    //------------------------------------------------------

    function init() {

        if (typeof AppState === "undefined") {

            window.AppState = {};

        }

        Logger.success("State Manager Ready");

    }

    //------------------------------------------------------
    // Get Value
    //------------------------------------------------------

    function get(path) {

        if (!path)
            return AppState;

        const keys = path.split(".");

        let value = AppState;

        for (const key of keys) {

            if (value == null)
                return undefined;

            value = value[key];

        }

        return value;

    }

    //------------------------------------------------------
    // Set Value
    //------------------------------------------------------

    function set(path, value) {

        const keys = path.split(".");

        let target = AppState;

        while (keys.length > 1) {

            const key = keys.shift();

            if (!target[key]) {

                target[key] = {};

            }

            target = target[key];

        }

        target[keys[0]] = value;

        Logger.debug(

            "State Updated : " + path

        );

        EventBus.emit(

            "state.changed",

            {

                path,

                value

            }

        );

        EventBus.emit(

            "state." + path + ".changed",

            value

        );

    }

    //------------------------------------------------------
    // Merge Object
    //------------------------------------------------------

    function merge(path, object) {

        const current = get(path) || {};

        set(

            path,

            {

                ...current,

                ...object

            }

        );

    }

    //------------------------------------------------------
    // Exists
    //------------------------------------------------------

    function has(path) {

        return get(path) !== undefined;

    }

    //------------------------------------------------------
    // Remove
    //------------------------------------------------------

    function remove(path) {

        const keys = path.split(".");

        let target = AppState;

        while (keys.length > 1) {

            target = target[keys.shift()];

            if (!target)
                return;

        }

        delete target[keys[0]];

        EventBus.emit(

            "state.changed",

            {

                path,

                removed: true

            }

        );

    }

    //------------------------------------------------------
    // Reset
    //------------------------------------------------------

    function reset() {

        Object.keys(AppState).forEach(key => {

            delete AppState[key];

        });

        EventBus.emit(

            "state.reset"

        );

        Logger.warning(

            "Application State Reset"

        );

    }

    //------------------------------------------------------
    // Snapshot
    //------------------------------------------------------

    function snapshot() {

        return structuredClone(AppState);

    }

    //------------------------------------------------------
    // Restore
    //------------------------------------------------------

    function restore(data) {

        reset();

        Object.assign(

            AppState,

            structuredClone(data)

        );

        EventBus.emit(

            "state.restored"

        );

    }

    //------------------------------------------------------
    // Dump
    //------------------------------------------------------

    function dump() {

        Logger.info(

            JSON.stringify(

                AppState,

                null,

                2

            )

        );

    }

    //------------------------------------------------------

    return {

        init,

        get,

        set,

        merge,

        has,

        remove,

        reset,

        snapshot,

        restore,

        dump

    };

})();
