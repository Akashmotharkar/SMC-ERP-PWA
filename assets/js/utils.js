/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0013
File    : assets/js/utils.js
Status  : Production
------------------------------------------------------------
*/

"use strict";

const Utils = (() => {

    function today() {

        const d = new Date();

        return d.toISOString().split("T")[0];

    }

    function formatDate(date) {

        if (!date) return "";

        const d = new Date(date);

        return d.toLocaleDateString("en-IN", {

            day: "2-digit",
            month: "2-digit",
            year: "numeric"

        });

    }

    function formatTime(date = new Date()) {

        return new Date(date).toLocaleTimeString("en-IN", {

            hour12: false

        });

    }

    function formatDateTime(date = new Date()) {

        return formatDate(date) + " " + formatTime(date);

    }

    function toNumber(value) {

        const n = parseFloat(value);

        return isNaN(n) ? 0 : n;

    }

    function round(value, digits = 2) {

        return Number(value).toFixed(digits);

    }

    function amount(value) {

        return "₹ " + round(toNumber(value), 2);

    }

    function isEmpty(value) {

        return value === null ||

            value === undefined ||

            value === "";

    }

    function isPositive(value) {

        return toNumber(value) > 0;

    }

    function customerID(id) {

        return String(id).trim();

    }

    function uuid() {

        return Date.now().toString(36) +

            Math.random().toString(36).substring(2, 8);

    }

    function debounce(fn, delay = 300) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                fn(...args);

            }, delay);

        };

    }

    function sleep(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

    function focus(id) {

        const element = document.getElementById(id);

        if (element)

            element.focus();

    }

    function select(id) {

        const element = document.getElementById(id);

        if (element)

            element.select();

    }

    function setValue(id, value) {

        const element = document.getElementById(id);

        if (element)

            element.value = value;

    }

    function getValue(id) {

        const element = document.getElementById(id);

        return element ? element.value : "";

    }

    function setText(id, text) {

        const element = document.getElementById(id);

        if (element)

            element.textContent = text;

    }

    function addClass(id, className) {

        const element = document.getElementById(id);

        if (element)

            element.classList.add(className);

    }

    function removeClass(id, className) {

        const element = document.getElementById(id);

        if (element)

            element.classList.remove(className);

    }

    function show(id) {

        const element = document.getElementById(id);

        if (element)

            element.style.display = "";

    }

    function hide(id) {

        const element = document.getElementById(id);

        if (element)

            element.style.display = "none";

    }

    function clone(obj) {

        return JSON.parse(JSON.stringify(obj));

    }

    function tenDayCycle(date = new Date()) {

        const d = new Date(date);

        const day = d.getDate();

        const month = d.getMonth() + 1;

        const year = d.getFullYear();

        if (day <= 10) {

            return {

                cycle: 1,

                from: `01/${month}/${year}`,

                to: `10/${month}/${year}`

            };

        }

        if (day <= 20) {

            return {

                cycle: 2,

                from: `11/${month}/${year}`,

                to: `20/${month}/${year}`

            };

        }

        const last = new Date(year, month, 0).getDate();

        return {

            cycle: 3,

            from: `21/${month}/${year}`,

            to: `${last}/${month}/${year}`

        };

    }

    function beep() {

        try {

            const audio = new Audio(

                "assets/sounds/beep.mp3"

            );

            audio.play();

        }

        catch { }

    }

    return {

        today,

        formatDate,

        formatTime,

        formatDateTime,

        toNumber,

        round,

        amount,

        isEmpty,

        isPositive,

        customerID,

        uuid,

        debounce,

        sleep,

        focus,

        select,

        setValue,

        getValue,

        setText,

        addClass,

        removeClass,

        show,

        hide,

        clone,

        tenDayCycle,

        beep

    };

})();
