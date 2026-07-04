/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0037
File    : assets/js/event-bus.js
------------------------------------------------------------

Global Event Bus

Purpose

Provides loose coupling between modules.

Modules never call each other directly.
Instead they publish and subscribe to events.

Examples

Analyzer
    ↓
EventBus.emit("analyzer.sample", sample)

Sample Buffer
    ↓
EventBus.on("analyzer.sample", ...)

Register
    ↓
EventBus.emit("transaction.saved")

SMS Module
    ↓
EventBus.on("transaction.saved")

Logger
    ↓
EventBus.on("*")

------------------------------------------------------------
*/

"use strict";

const EventBus = (() => {

    const listeners = new Map();

    //----------------------------------------------------
    // Subscribe
    //----------------------------------------------------

    function on(event, callback) {

        if (typeof callback !== "function")
            return;

        if (!listeners.has(event)) {

            listeners.set(event, []);

        }

        listeners.get(event).push(callback);

    }

    //----------------------------------------------------
    // Subscribe Once
    //----------------------------------------------------

    function once(event, callback) {

        function wrapper(data) {

            off(event, wrapper);

            callback(data);

        }

        on(event, wrapper);

    }

    //----------------------------------------------------
    // Unsubscribe
    //----------------------------------------------------

    function off(event, callback) {

        if (!listeners.has(event))
            return;

        const list = listeners.get(event);

        const index = list.indexOf(callback);

        if (index >= 0) {

            list.splice(index, 1);

        }

    }

    //----------------------------------------------------
    // Emit Event
    //----------------------------------------------------

    function emit(event, payload = null) {

        Logger.debug(

            "[EVENT] " + event

        );

        dispatch(event, payload);

        dispatch("*", {

            event,

            payload

        });

    }

    //----------------------------------------------------
    // Dispatch
    //----------------------------------------------------

    function dispatch(event, payload) {

        if (!listeners.has(event))
            return;

        const callbacks = [...listeners.get(event)];

        callbacks.forEach(callback => {

            try {

                callback(payload);

            }

            catch (error) {

                Logger.error(error);

            }

        });

    }

    //----------------------------------------------------
    // Remove All
    //----------------------------------------------------

    function clear(event = null) {

        if (event === null) {

            listeners.clear();

            return;

        }

        listeners.delete(event);

    }

    //----------------------------------------------------
    // Statistics
    //----------------------------------------------------

    function count(event = null) {

        if (event === null) {

            let total = 0;

            listeners.forEach(list => {

                total += list.length;

            });

            return total;

        }

        return listeners.has(event)

            ? listeners.get(event).length

            : 0;

    }

    //----------------------------------------------------
    // Registered Events
    //----------------------------------------------------

    function events() {

        return [...listeners.keys()];

    }

    //----------------------------------------------------

    return {

        on,

        once,

        off,

        emit,

        clear,

        count,

        events

    };

})();
