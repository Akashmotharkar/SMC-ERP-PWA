/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0008
File    : assets/js/eventBus.js
Status  : Production
------------------------------------------------------------
*/

'use strict';

const EventBus = (() => {

    /* =====================================================
       PRIVATE EVENTS
    ===================================================== */

    const events = new Map();

    /* =====================================================
       SUBSCRIBE
    ===================================================== */

    function on(eventName, callback) {

        if (typeof callback !== "function") {
            console.error("EventBus.on(): callback must be a function");
            return;
        }

        if (!events.has(eventName)) {
            events.set(eventName, []);
        }

        events.get(eventName).push(callback);

    }

    /* =====================================================
       SUBSCRIBE ONCE
    ===================================================== */

    function once(eventName, callback) {

        function wrapper(data) {

            off(eventName, wrapper);

            callback(data);

        }

        on(eventName, wrapper);

    }

    /* =====================================================
       UNSUBSCRIBE
    ===================================================== */

    function off(eventName, callback) {

        if (!events.has(eventName))
            return;

        const listeners = events.get(eventName);

        const index = listeners.indexOf(callback);

        if (index > -1)
            listeners.splice(index, 1);

    }

    /* =====================================================
       EMIT
    ===================================================== */

    function emit(eventName, data = null) {

        if (CONFIG.APP.DEBUG) {

            console.log(
                `%c[EVENT] ${eventName}`,
                "color:#1565c0;font-weight:bold;",
                data
            );

        }

        if (!events.has(eventName))
            return;

        const listeners = [...events.get(eventName)];

        listeners.forEach(listener => {

            try {

                listener(data);

            }

            catch (error) {

                console.error(
                    "EventBus Listener Error:",
                    eventName,
                    error
                );

            }

        });

    }

    /* =====================================================
       CLEAR
    ===================================================== */

    function clear(eventName) {

        if (eventName) {

            events.delete(eventName);

            return;

        }

        events.clear();

    }

    /* =====================================================
       COUNT
    ===================================================== */

    function listenerCount(eventName) {

        if (!events.has(eventName))
            return 0;

        return events.get(eventName).length;

    }

    /* =====================================================
       EXISTS
    ===================================================== */

    function has(eventName) {

        return events.has(eventName);

    }

    /* =====================================================
       DEBUG
    ===================================================== */

    function dump() {

        const result = {};

        events.forEach((listeners, name) => {

            result[name] = listeners.length;

        });

        console.table(result);

        return result;

    }

    /* =====================================================
       PUBLIC API
    ===================================================== */

    return {

        on,

        once,

        off,

        emit,

        clear,

        has,

        dump,

        listenerCount

    };

})();
