/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0025
File    : assets/js/tabs.js
------------------------------------------------------------
Transaction Tab Manager

Milk
Cash
Feed

Features
✓ Keyboard Friendly
✓ Zero Mouse Workflow
✓ Preserves entered data
✓ Single Active Tab
------------------------------------------------------------
*/

"use strict";

const Tabs = (() => {

    let activeTab = "milk";

    const tabs = {};

    const panels = {};

    function init() {

        cache();

        bind();

        activate("milk");

        Logger.success("Tabs Ready");

    }

    function cache() {

        tabs.milk =
            document.getElementById("tabMilk");

        tabs.cash =
            document.getElementById("tabCash");

        tabs.feed =
            document.getElementById("tabFeed");

        panels.milk =
            document.getElementById("milkPanel");

        panels.cash =
            document.getElementById("cashPanel");

        panels.feed =
            document.getElementById("feedPanel");

    }

    function bind() {

        if (tabs.milk)
            tabs.milk.addEventListener(
                "click",
                () => activate("milk")
            );

        if (tabs.cash)
            tabs.cash.addEventListener(
                "click",
                () => activate("cash")
            );

        if (tabs.feed)
            tabs.feed.addEventListener(
                "click",
                () => activate("feed")
            );

    }

    function activate(name) {

        if (!tabs[name]) return;

        clear();

        activeTab = name;

        tabs[name].classList.add(
            "tab-active"
        );

        panels[name]?.classList.add(
            "panel-active"
        );

        State.set(
            "transaction.type",
            name
        );

        focusFirstField();

        Logger.info(
            "Transaction Tab : " + name
        );

    }

    function clear() {

        Object.values(tabs).forEach(tab => {

            tab?.classList.remove(
                "tab-active"
            );

        });

        Object.values(panels).forEach(panel => {

            panel?.classList.remove(
                "panel-active"
            );

        });

    }

    function current() {

        return activeTab;

    }

    function isMilk() {

        return activeTab === "milk";

    }

    function isCash() {

        return activeTab === "cash";

    }

    function isFeed() {

        return activeTab === "feed";

    }

    function focusFirstField() {

        setTimeout(() => {

            switch (activeTab) {

                case "milk":

                    document
                        .getElementById("qty")
                        ?.focus();

                    break;

                case "cash":

                    document
                        .getElementById("cashAmount")
                        ?.focus();

                    break;

                case "feed":

                    document
                        .getElementById("feedName")
                        ?.focus();

                    break;

            }

        }, 60);

    }

    function reset() {

        activate("milk");

    }

    return {

        init,

        activate,

        current,

        reset,

        isMilk,

        isCash,

        isFeed

    };

})();
