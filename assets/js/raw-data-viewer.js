/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0030
File    : assets/js/raw-data-viewer.js
------------------------------------------------------------
Bluetooth Raw Data Viewer

Features
✓ ASCII View
✓ HEX View
✓ Timestamp
✓ Pause / Resume
✓ Auto Scroll
✓ Clear
✓ Download
✓ Copy Latest Packet
✓ Packet Counter
✓ Future Packet Replay Ready
------------------------------------------------------------
*/

"use strict";

const RawDataViewer = (() => {

    const MAX_PACKETS = 3000;

    let packets = [];

    let paused = false;

    let container;

    function init() {

        container = document.getElementById(
            "rawViewer"
        );

        bind();

        Logger.success(
            "Raw Data Viewer Ready"
        );

    }

    function bind() {

        document
            .getElementById("btnRawClear")
            ?.addEventListener(
                "click",
                clear
            );

        document
            .getElementById("btnRawPause")
            ?.addEventListener(
                "click",
                togglePause
            );

        document
            .getElementById("btnRawDownload")
            ?.addEventListener(
                "click",
                download
            );

        document
            .getElementById("btnRawCopy")
            ?.addEventListener(
                "click",
                copyLatest
            );

    }

    function add(data) {

        const packet = {

            time: now(),

            ascii: ascii(data),

            hex: hex(data),

            bytes: data.length

        };

        packets.push(packet);

        if (packets.length > MAX_PACKETS) {

            packets.shift();

        }

        if (!paused) {

            render();

        }

    }

    function render() {

        if (!container) return;

        let html = "";

        packets.forEach(packet => {

            html += `

<div class="raw-row">

<div class="raw-header">

<span>${packet.time}</span>

<span>${packet.bytes} bytes</span>

</div>

<div class="raw-ascii">

${escape(packet.ascii)}

</div>

<div class="raw-hex">

${packet.hex}

</div>

</div>

`;

        });

        container.innerHTML = html;

        container.scrollTop =
            container.scrollHeight;

        updateCounter();

    }

    function clear() {

        packets = [];

        render();

        Logger.info(
            "Raw Buffer Cleared"
        );

    }

    function togglePause() {

        paused = !paused;

        Logger.info(

            paused

                ? "Raw Viewer Paused"

                : "Raw Viewer Resumed"

        );

        if (!paused) {

            render();

        }

    }

    function copyLatest() {

        if (!packets.length) return;

        navigator.clipboard.writeText(

            packets[packets.length - 1].ascii

        );

        Logger.success(

            "Latest Packet Copied"

        );

    }

    function download() {

        const text = packets.map(

            p =>

`[${p.time}]
ASCII : ${p.ascii}
HEX   : ${p.hex}

`

        ).join("");

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
            "Bluetooth_Raw_Data.txt";

        a.click();

        URL.revokeObjectURL(url);

    }

    function updateCounter() {

        const counter =
            document.getElementById(
                "rawCounter"
            );

        if (!counter) return;

        counter.textContent =
            packets.length;

    }

    function ascii(data) {

        if (typeof data === "string")
            return data;

        return new TextDecoder()

            .decode(data);

    }

    function hex(data) {

        if (typeof data === "string") {

            data =
                new TextEncoder()

                .encode(data);

        }

        return Array.from(data)

            .map(v =>

                v.toString(16)

                    .padStart(2, "0")

                    .toUpperCase()

            )

            .join(" ");

    }

    function escape(text) {

        return String(text)

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;");

    }

    function now() {

        return new Date()

            .toLocaleTimeString(

                "en-GB",

                {

                    hour12: false

                }

            );

    }

    function latest() {

        if (!packets.length)

            return null;

        return packets[
            packets.length - 1
        ];

    }

    function exportPackets() {

        return structuredClone(

            packets

        );

    }

    return {

        init,

        add,

        clear,

        latest,

        render,

        exportPackets

    };

})();
