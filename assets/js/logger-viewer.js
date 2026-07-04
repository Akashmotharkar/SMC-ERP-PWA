/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0029
File    : assets/js/logger-viewer.js
------------------------------------------------------------
Logger Viewer

Features
✓ Live Log Viewer
✓ Auto Scroll
✓ Pause / Resume
✓ Clear Log
✓ Download Log
✓ Filter by Level
✓ Search
✓ Max Log Limit
------------------------------------------------------------
*/

"use strict";

const LogViewer = (() => {

    const MAX_LOGS = 5000;

    let logs = [];

    let paused = false;

    let container = null;

    let searchBox = null;

    let filter = "ALL";

    function init() {

        container = document.getElementById("logViewer");

        searchBox = document.getElementById("logSearch");

        bind();

        Logger.success("Logger Viewer Ready");

    }

    function bind() {

        document
            .getElementById("btnClearLog")
            ?.addEventListener(
                "click",
                clear
            );

        document
            .getElementById("btnDownloadLog")
            ?.addEventListener(
                "click",
                download
            );

        document
            .getElementById("btnPauseLog")
            ?.addEventListener(
                "click",
                togglePause
            );

        searchBox?.addEventListener(

            "input",

            render

        );

    }

    function add(level, message) {

        logs.push({

            time: time(),

            level,

            message

        });

        if (logs.length > MAX_LOGS) {

            logs.shift();

        }

        if (!paused) {

            render();

        }

    }

    function render() {

        if (!container) return;

        const keyword =

            (searchBox?.value || "")

            .toLowerCase();

        let html = "";

        logs.forEach(log => {

            if (

                filter !== "ALL" &&

                log.level !== filter

            ) return;

            if (

                keyword &&

                !log.message

                    .toLowerCase()

                    .includes(keyword)

            ) return;

            html += `

<div class="log-row ${css(log.level)}">

<span class="log-time">

${log.time}

</span>

<span class="log-level">

${log.level}

</span>

<span class="log-msg">

${escape(log.message)}

</span>

</div>

`;

        });

        container.innerHTML = html;

        container.scrollTop =

            container.scrollHeight;

    }

    function clear() {

        logs = [];

        render();

        Logger.info("Logs Cleared");

    }

    function togglePause() {

        paused = !paused;

        Logger.info(

            paused

                ? "Logger Paused"

                : "Logger Resumed"

        );

        if (!paused)

            render();

    }

    function setFilter(level) {

        filter = level;

        render();

    }

    function download() {

        const text = logs

            .map(

                l =>

                    `[${l.time}] [${l.level}] ${l.message}`

            )

            .join("\n");

        const blob = new Blob(

            [text],

            {

                type: "text/plain"

            }

        );

        const url =

            URL.createObjectURL(blob);

        const a =

            document.createElement("a");

        a.href = url;

        a.download =

            "SMC_Log.txt";

        a.click();

        URL.revokeObjectURL(url);

    }

    function css(level) {

        switch (level) {

            case "INFO":

                return "log-info";

            case "SUCCESS":

                return "log-success";

            case "WARNING":

                return "log-warning";

            case "ERROR":

                return "log-error";

            case "BT":

                return "log-bt";

            case "API":

                return "log-api";

            case "PARSER":

                return "log-parser";

            default:

                return "";

        }

    }

    function escape(text) {

        return String(text)

            .replace(

                /</g,

                "&lt;"

            )

            .replace(

                />/g,

                "&gt;"

            );

    }

    function time() {

        const d = new Date();

        return d.toLocaleTimeString(

            "en-GB",

            {

                hour12: false

            }

        );

    }

    function count() {

        return logs.length;

    }

    function exportJSON() {

        return structuredClone(logs);

    }

    return {

        init,

        add,

        clear,

        count,

        render,

        download,

        setFilter,

        exportJSON

    };

})();
