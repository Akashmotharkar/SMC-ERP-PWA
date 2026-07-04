/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0011
File    : assets/js/api.js
Status  : Production
------------------------------------------------------------
*/

"use strict";

const API = (() => {

    let apiURL = "";
    let online = false;

    async function initialize() {

        apiURL = CONFIG.API_URL || "";

        checkInternet();

        window.addEventListener("online", checkInternet);
        window.addEventListener("offline", checkInternet);

        Logger.api("API Initialized");

    }

    function checkInternet() {

        online = navigator.onLine;

        UI.updateInternetStatus(online);

        if (online) {

            Logger.success("Internet Connected");

            syncOfflineQueue();

        } else {

            Logger.warning("Offline Mode");

        }

    }

    function isOnline() {

        return online;

    }

    async function call(action, data = {}) {

        if (!online) {

            Logger.offline(action + " queued");

            Storage.append("offlineQueue", {

                action,

                data,

                created: Date.now()

            });

            return {

                success: false,

                offline: true

            };

        }

        try {

            Logger.api("Calling : " + action);

            const response = await fetch(apiURL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    action,

                    data

                })

            });

            const result = await response.json();

            Logger.success(action + " completed");

            return result;

        }

        catch (e) {

            Logger.error(action + " failed");

            Storage.append("offlineQueue", {

                action,

                data,

                created: Date.now()

            });

            return {

                success: false,

                queued: true

            };

        }

    }

    async function syncOfflineQueue() {

        if (!online)
            return;

        const queue = Storage.load("offlineQueue", []);

        if (queue.length === 0)
            return;

        Logger.api("Sync Queue : " + queue.length);

        const failed = [];

        for (const item of queue) {

            try {

                const response = await fetch(apiURL, {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify(item)

                });

                const result = await response.json();

                if (!result.success) {

                    failed.push(item);

                }

            }

            catch {

                failed.push(item);

            }

        }

        Storage.save("offlineQueue", failed);

        Logger.success(
            (queue.length - failed.length) +
            " Offline Records Synced"
        );

    }

    async function getCustomers() {

        return await call("getCustomers");

    }

    async function getRates() {

        return await call("getRates");

    }

    async function getRegister(date) {

        return await call("getRegister", {

            date

        });

    }

    async function saveTransaction(data) {

        return await call("saveTransaction", data);

    }

    async function saveCash(data) {

        return await call("saveCash", data);

    }

    async function saveFeed(data) {

        return await call("saveFeed", data);

    }

    async function getSettings() {

        return await call("getSettings");

    }

    async function saveSettings(data) {

        return await call("saveSettings", data);

    }

    return {

        initialize,

        call,

        isOnline,

        getCustomers,

        getRates,

        getRegister,

        saveTransaction,

        saveCash,

        saveFeed,

        getSettings,

        saveSettings,

        syncOfflineQueue

    };

})();
