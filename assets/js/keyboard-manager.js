/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0036
File    : assets/js/keyboard-manager.js
------------------------------------------------------------

Keyboard Manager

Production Ready

Features

✓ Enter Navigation
✓ Auto Focus
✓ Save Shortcut
✓ ESC Clear
✓ F2 Customer ID
✓ F4 Milk Tab
✓ F5 Cash Tab
✓ F6 Feed Tab
✓ Ctrl+S Save
✓ Ctrl+L Logger
✓ Ctrl+R Raw Data

------------------------------------------------------------
*/

"use strict";

const KeyboardManager = (() => {

    let focusList = [];

    function init() {

        buildFocusList();

        bindKeyboard();

        Logger.success("Keyboard Manager Ready");

    }

    //------------------------------------------------

    function buildFocusList() {

        focusList = [

            "customerId",

            "quantity",

            "cashAmount",

            "feedName",

            "feedAmount"

        ];

    }

    //------------------------------------------------

    function bindKeyboard() {

        document.addEventListener(

            "keydown",

            onKeyDown

        );

    }

    //------------------------------------------------

    function onKeyDown(e) {

        //--------------------------------------------
        // ENTER
        //--------------------------------------------

        if (e.key === "Enter") {

            e.preventDefault();

            nextField(document.activeElement);

            return;

        }

        //--------------------------------------------
        // ESC
        //--------------------------------------------

        if (e.key === "Escape") {

            clearCurrentForm();

            return;

        }

        //--------------------------------------------
        // CTRL + S
        //--------------------------------------------

        if (e.ctrlKey && e.key.toLowerCase() === "s") {

            e.preventDefault();

            saveTransaction();

            return;

        }

        //--------------------------------------------
        // CTRL + L
        //--------------------------------------------

        if (e.ctrlKey && e.key.toLowerCase() === "l") {

            e.preventDefault();

            Router.openLogger();

            return;

        }

        //--------------------------------------------
        // CTRL + R
        //--------------------------------------------

        if (e.ctrlKey && e.key.toLowerCase() === "r") {

            e.preventDefault();

            Router.openRaw();

            return;

        }

        //--------------------------------------------
        // F2
        //--------------------------------------------

        if (e.key === "F2") {

            e.preventDefault();

            focusCustomer();

        }

        //--------------------------------------------
        // F4
        //--------------------------------------------

        if (e.key === "F4") {

            e.preventDefault();

            Tabs.select("milk");

        }

        //--------------------------------------------
        // F5
        //--------------------------------------------

        if (e.key === "F5") {

            e.preventDefault();

            Tabs.select("cash");

        }

        //--------------------------------------------
        // F6
        //--------------------------------------------

        if (e.key === "F6") {

            e.preventDefault();

            Tabs.select("feed");

        }

    }

    //------------------------------------------------

    function nextField(active) {

        if (!active) return;

        const index = focusList.indexOf(active.id);

        if (index === -1) return;

        const nextId = focusList[index + 1];

        if (!nextId) {

            saveTransaction();

            return;

        }

        focus(nextId);

    }

    //------------------------------------------------

    function focus(id) {

        const element = document.getElementById(id);

        if (!element) return;

        element.focus();

        if (element.select)

            element.select();

    }

    //------------------------------------------------

    function focusCustomer() {

        focus("customerId");

    }

    //------------------------------------------------

    function focusAfterSave() {

        setTimeout(

            () => {

                focusCustomer();

            },

            100

        );

    }

    //------------------------------------------------

    function clearCurrentForm() {

        if (UI.clearForm)

            UI.clearForm();

        focusCustomer();

    }

    //------------------------------------------------

    function saveTransaction() {

        if (Transaction.save) {

            Transaction.save();

            focusAfterSave();

        }

    }

    //------------------------------------------------

    return {

        init,

        focus,

        focusCustomer,

        focusAfterSave

    };

})();
