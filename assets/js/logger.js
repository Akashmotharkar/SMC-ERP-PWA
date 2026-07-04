/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0009
File    : assets/js/logger.js
Status  : Production
------------------------------------------------------------
*/

'use strict';

const Logger = (() => {

    let logContainer = null;
    let rawContainer = null;

    const history = [];

    function initialize() {

        logContainer = document.getElementById("loggerPanel");
        rawContainer = document.getElementById("rawDataPanel");

        info("Logger initialized");

    }

    function timestamp() {

        return new Date().toLocaleTimeString("en-IN", {
            hour12: false
        });

    }

    function add(type, message) {

        const item = {

            time: timestamp(),

            type,

            message

        };

        history.push(item);

        if (history.length > CONFIG.LOGGER.MAX_HISTORY) {

            history.shift();

        }

        console.log(`[${type}] ${message}`);

        if (!logContainer)
            return;

        const row = document.createElement("div");

        row.className = "log-row " + type.toLowerCase();

        row.innerHTML =
            `<span class="log-time">[${item.time}]</span>
             <span class="log-type">${type}</span>
             <span class="log-msg">${message}</span>`;

        logContainer.appendChild(row);

        if (logContainer.children.length > CONFIG.LOGGER.MAX_HISTORY) {

            logContainer.removeChild(logContainer.firstChild);

        }

        logContainer.scrollTop = logContainer.scrollHeight;

    }

    function raw(data) {

        if (!rawContainer)
            return;

        const row = document.createElement("div");

        row.className = "raw-row";

        row.textContent =
            `[${timestamp()}] ${data}`;

        rawContainer.appendChild(row);

        if (rawContainer.children.length > CONFIG.LOGGER.MAX_HISTORY) {

            rawContainer.removeChild(rawContainer.firstChild);

        }

        rawContainer.scrollTop = rawContainer.scrollHeight;

    }

    function clearLogs() {

        history.length = 0;

        if (logContainer)
            logContainer.innerHTML = "";

    }

    function clearRaw() {

        if (rawContainer)
            rawContainer.innerHTML = "";

    }

    function exportLogs() {

        return [...history];

    }

    function info(message) {

        add("INFO", message);

    }

    function success(message) {

        add("SUCCESS", message);

    }

    function warning(message) {

        add("WARNING", message);

    }

    function error(message) {

        add("ERROR", message);

    }

    function bluetooth(message) {

        add("BLUETOOTH", message);

    }

    function parser(message) {

        add("PARSER", message);

    }

    function api(message) {

        add("API", message);

    }

    function sheet(message) {

        add("SHEET", message);

    }

    function sms(message) {

        add("SMS", message);

    }

    function offline(message) {

        add("OFFLINE", message);

    }

    return {

        initialize,

        info,

        success,

        warning,

        error,

        bluetooth,

        parser,

        api,

        sheet,

        sms,

        offline,

        raw,

        clearLogs,

        clearRaw,

        exportLogs

    };

})();
