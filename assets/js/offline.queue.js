/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0032
File    : assets/js/offline-queue.js
------------------------------------------------------------
Offline Queue Manager

Production Ready

Features

✓ Queue every transaction before upload
✓ Zero data loss
✓ Automatic sync
✓ Retry failed uploads
✓ Queue persistence
✓ Sync status
✓ Future conflict handling

Queue Flow

Save
 ↓
Offline Queue
 ↓
Google Sheets
 ↓
Success → Remove
Failure → Keep & Retry
------------------------------------------------------------
*/

"use strict";

const OfflineQueue = (() => {

    const STORAGE_KEY = "smc_offline_queue";

    let queue = [];

    let syncing = false;

    let timer = null;

    function init() {

        load();

        startAutoSync();

        updateBadge();

        Logger.success(
            "Offline Queue Ready"
        );

    }

    function load() {

        try {

            queue = JSON.parse(

                localStorage.getItem(STORAGE_KEY)

                || "[]"

            );

        }

        catch {

            queue = [];

        }

    }

    function save() {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(queue)

        );

        updateBadge();

    }

    function enqueue(transaction) {

        const item = {

            id: crypto.randomUUID(),

            created: Date.now(),

            retry: 0,

            synced: false,

            data: transaction

        };

        queue.push(item);

        save();

        Logger.success(

            "Queued : " + item.id

        );

        sync();

    }

    async function sync() {

        if (syncing) return;

        if (!navigator.onLine) return;

        if (!queue.length) return;

        syncing = true;

        Logger.info(

            "Queue Sync Started"

        );

        while (queue.length) {

            const item = queue[0];

            try {

                const ok = await API.saveTransaction(

                    item.data

                );

                if (ok) {

                    Logger.success(

                        "Synced : " +

                        item.id

                    );

                    queue.shift();

                    save();

                }

                else {

                    item.retry++;

                    Logger.warning(

                        "Retry : " +

                        item.retry

                    );

                    break;

                }

            }

            catch (error) {

                item.retry++;

                Logger.error(error);

                break;

            }

        }

        syncing = false;

    }

    function startAutoSync() {

        timer = setInterval(

            sync,

            10000

        );

    }

    function stopAutoSync() {

        if (timer)

            clearInterval(timer);

    }

    function clear() {

        queue = [];

        save();

        Logger.warning(

            "Queue Cleared"

        );

    }

    function count() {

        return queue.length;

    }

    function updateBadge() {

        const badge =

            document.getElementById(

                "offlineQueueCount"

            );

        if (!badge) return;

        badge.textContent = queue.length;

    }

    function pending() {

        return structuredClone(queue);

    }

    function exportJSON() {

        return JSON.stringify(

            queue,

            null,

            2

        );

    }

    function importJSON(json) {

        try {

            queue = JSON.parse(json);

            save();

            return true;

        }

        catch {

            return false;

        }

    }

    return {

        init,

        enqueue,

        sync,

        clear,

        count,

        pending,

        exportJSON,

        importJSON

    };

})();
