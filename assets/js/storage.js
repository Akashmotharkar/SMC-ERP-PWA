/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0010
File    : assets/js/storage.js
Status  : Production
------------------------------------------------------------
*/

"use strict";

const Storage = (() => {

    const PREFIX = "SMC_";

    function key(name) {
        return PREFIX + name;
    }

    function exists(name) {
        return localStorage.getItem(key(name)) !== null;
    }

    function save(name, value) {

        try {

            localStorage.setItem(
                key(name),
                JSON.stringify(value)
            );

            Logger.info("Storage Saved : " + name);

            return true;

        } catch (e) {

            Logger.error("Storage Save Failed : " + name);

            console.error(e);

            return false;

        }

    }

    function load(name, defaultValue = null) {

        try {

            const data = localStorage.getItem(key(name));

            if (data === null)
                return defaultValue;

            return JSON.parse(data);

        }

        catch (e) {

            Logger.error("Storage Read Failed : " + name);

            console.error(e);

            return defaultValue;

        }

    }

    function remove(name) {

        localStorage.removeItem(key(name));

        Logger.info("Storage Removed : " + name);

    }

    function clearAll() {

        Object.keys(localStorage).forEach(k => {

            if (k.startsWith(PREFIX))
                localStorage.removeItem(k);

        });

        Logger.warning("SMC Storage Cleared");

    }

    function append(name, value) {

        const list = load(name, []);

        list.push(value);

        save(name, list);

        return list.length;

    }

    function update(name, callback) {

        const value = load(name);

        const newValue = callback(value);

        save(name, newValue);

        return newValue;

    }

    function sessionSave(name, value) {

        sessionStorage.setItem(
            key(name),
            JSON.stringify(value)
        );

    }

    function sessionLoad(name, defaultValue = null) {

        const data = sessionStorage.getItem(key(name));

        if (!data)
            return defaultValue;

        return JSON.parse(data);

    }

    function sessionRemove(name) {

        sessionStorage.removeItem(key(name));

    }

    function size() {

        let bytes = 0;

        for (const k in localStorage) {

            if (k.startsWith(PREFIX)) {

                bytes += (
                    localStorage[k].length +
                    k.length
                ) * 2;

            }

        }

        return bytes;

    }

    function exportAll() {

        const obj = {};

        Object.keys(localStorage).forEach(k => {

            if (k.startsWith(PREFIX)) {

                obj[k] = JSON.parse(localStorage[k]);

            }

        });

        return obj;

    }

    function importAll(data) {

        Object.keys(data).forEach(k => {

            localStorage.setItem(
                k,
                JSON.stringify(data[k])
            );

        });

        Logger.success("Storage Imported");

    }

    return {

        exists,

        save,

        load,

        remove,

        clearAll,

        append,

        update,

        sessionSave,

        sessionLoad,

        sessionRemove,

        exportAll,

        importAll,

        size

    };

})();
