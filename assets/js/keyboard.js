/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0024
File    : assets/js/keyboard.js
------------------------------------------------------------
Keyboard Navigation Manager

Designed for:
• Zero Mouse Operation
• Fast Operator Workflow
• Tablet / Desktop Landscape
------------------------------------------------------------
*/

"use strict";

const Keyboard = (() => {

    let fields = [];

    function init() {

        buildFieldList();

        registerKeyboard();

        Logger.success("Keyboard Manager Ready");

    }

    function buildFieldList() {

        fields = [

            document.getElementById("customerId"),

            document.getElementById("qty"),

            document.getElementById("btnSave")

        ].filter(Boolean);

    }

    function registerKeyboard() {

        document.addEventListener(

            "keydown",

            handleKey,

            false

        );

    }

    function handleKey(event) {

        const key = event.key;

        switch (key) {

            case "Enter":

                event.preventDefault();

                nextField();

                break;

            case "Escape":

                event.preventDefault();

                clearForm();

                break;

            case "F2":

                event.preventDefault();

                focusCustomer();

                break;

            case "F4":

                event.preventDefault();

                clickSave();

                break;

            case "F6":

                event.preventDefault();

                selectMilkTab();

                break;

            case "F7":

                event.preventDefault();

                selectCashTab();

                break;

            case "F8":

                event.preventDefault();

                selectFeedTab();

                break;

            case "F9":

                event.preventDefault();

                toggleSettings();

                break;

            default:

                break;

        }

    }

    function nextField() {

        const active = document.activeElement;

        const index = fields.indexOf(active);

        if (index === -1) return;

        const next = fields[index + 1];

        if (!next) return;

        next.focus();

        if (next.select)

            next.select();

    }

    function clearForm() {

        UI.clearForm();

    }

    function focusCustomer() {

        UI.focusCustomer();

    }

    function clickSave() {

        const btn = document.getElementById("btnSave");

        if (!btn) return;

        if (btn.disabled) return;

        btn.click();

    }

    function selectMilkTab() {

        activateTab("milk");

    }

    function selectCashTab() {

        activateTab("cash");

    }

    function selectFeedTab() {

        activateTab("feed");

    }

    function activateTab(name) {

        const button = document.querySelector(

            `[data-tab="${name}"]`

        );

        if (button)

            button.click();

    }

    function toggleSettings() {

        const panel = document.getElementById(

            "settingsPanel"

        );

        if (!panel) return;

        panel.classList.toggle("collapsed");

    }

    function focusAfterSave() {

        setTimeout(() => {

            const id = document.getElementById(

                "customerId"

            );

            if (!id) return;

            id.focus();

            id.select();

        }, 80);

    }

    function registerDynamicField(element) {

        if (!element) return;

        if (fields.includes(element)) return;

        fields.splice(

            fields.length - 1,

            0,

            element

        );

    }

    return {

        init,

        focusAfterSave,

        registerDynamicField

    };

})();
