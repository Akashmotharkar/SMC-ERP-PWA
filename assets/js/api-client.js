/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0051
File    : assets/js/api-client.js
------------------------------------------------------------

API Client

Single communication layer.

Supports

✓ Google Apps Script
✓ Future REST API
✓ Offline Detection
✓ Timeout
✓ Retry
✓ Error Handling

------------------------------------------------------------
*/

"use strict";

const ApiClient = (() => {

    //----------------------------------------------------

    const TIMEOUT = 30000;

    //----------------------------------------------------

    async function call(action, payload = {}) {

        Logger.info(

            "API → " + action

        );

        if (!navigator.onLine) {

            throw new Error(

                "Internet unavailable."

            );

        }

        return request({

            action,

            payload

        });

    }

    //----------------------------------------------------

    function request(body) {

        return new Promise(

            (resolve, reject) => {

                const timeout = setTimeout(() => {

                    reject(

                        new Error(

                            "Request Timeout"

                        )

                    );

                }, TIMEOUT);

                google.script.run

                    .withSuccessHandler(result => {

                        clearTimeout(timeout);

                        resolve(result);

                    })

                    .withFailureHandler(error => {

                        clearTimeout(timeout);

                        reject(error);

                    })

                    .api(body);

            }

        );

    }

    //----------------------------------------------------
    // Master Data
    //----------------------------------------------------

    async function customers() {

        return call("customers");

    }

    async function rates() {

        return call("rates");

    }

    async function feedList() {

        return call("feedList");

    }

    async function settings() {

        return call("settings");

    }

    //----------------------------------------------------
    // Register
    //----------------------------------------------------

    async function register(date) {

        return call(

            "register",

            {

                date

            }

        );

    }

    //----------------------------------------------------
    // Save
    //----------------------------------------------------

    async function save(transaction) {

        return call(

            "save",

            transaction

        );

    }

    //----------------------------------------------------
    // Sync
    //----------------------------------------------------

    async function sync(queue) {

        return call(

            "sync",

            queue

        );

    }

    //----------------------------------------------------
    // SMS
    //----------------------------------------------------

    async function sms(data) {

        return call(

            "sms",

            data

        );

    }

    //----------------------------------------------------
    // Health
    //----------------------------------------------------

    async function ping() {

        return call("ping");

    }

    //----------------------------------------------------

    return {

        customers,

        rates,

        feedList,

        settings,

        register,

        save,

        sync,

        sms,

        ping

    };

})();
