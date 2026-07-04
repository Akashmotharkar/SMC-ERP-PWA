/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0018
File    : assets/js/transaction.js
Status  : Production Ready
------------------------------------------------------------
*/

"use strict";

const Transaction = (() => {

    async function saveMilk() {

        try {

            const customer = State.get("currentCustomer");
            const sample = State.get("currentSample");

            if (!validateMilk(customer, sample))
                return false;

            const transaction = {

                id: Utils.uuid(),

                type: "MILK",

                collectionPoint:
                    State.get("collectionPoint"),

                operator:
                    State.get("operator"),

                date:
                    Utils.today(),

                timestamp:
                    Date.now(),

                customerID:
                    customer.customerID,

                customerName:
                    customer.name,

                fat:
                    sample.fat,

                snf:
                    sample.snf,

                clr:
                    sample.clr,

                qty:
                    sample.qty,

                rate:
                    sample.rate,

                amount:
                    sample.amount

            };

            if (duplicate(transaction)) {

                Logger.warning(
                    "Duplicate Transaction"
                );

                return false;

            }

            Logger.sheet(
                "Saving Milk Transaction..."
            );

            const result =
                await API.saveTransaction(
                    transaction
                );

            if (!result.success &&
                !result.offline &&
                !result.queued) {

                Logger.error(
                    "Save Failed"
                );

                return false;

            }

            saveLocal(transaction);

            Register.refreshCustomer(
                transaction.customerID
            );

            if (Settings.smsEnabled("milk")) {

                SMS.sendMilk(transaction);

            }

            Logger.success(
                "Milk Saved"
            );

            finish();

            return true;

        }

        catch (e) {

            Logger.error(e.message);

            console.error(e);

            return false;

        }

    }

    async function saveCash(amount, remark = "") {

        const customer =
            State.get("currentCustomer");

        if (!customer)
            return false;

        const transaction = {

            id: Utils.uuid(),

            type: "CASH",

            date: Utils.today(),

            timestamp: Date.now(),

            customerID:
                customer.customerID,

            amount,

            remark

        };

        await API.saveCash(transaction);

        saveLocal(transaction);

        Register.refreshCustomer(
            customer.customerID
        );

        if (Settings.smsEnabled("cash")) {

            SMS.sendCash(transaction);

        }

        finish();

        return true;

    }

    async function saveFeed(feedName, amount) {

        const customer =
            State.get("currentCustomer");

        if (!customer)
            return false;

        const transaction = {

            id: Utils.uuid(),

            type: "FEED",

            date: Utils.today(),

            timestamp: Date.now(),

            customerID:
                customer.customerID,

            feedName,

            amount

        };

        await API.saveFeed(transaction);

        saveLocal(transaction);

        Register.refreshCustomer(
            customer.customerID
        );

        if (Settings.smsEnabled("feed")) {

            SMS.sendFeed(transaction);

        }

        finish();

        return true;

    }

    function validateMilk(customer, sample) {

        if (!customer) {

            Logger.warning(
                "Customer Missing"
            );

            return false;

        }

        if (sample.qty == null) {

            Logger.warning(
                "Weight Missing"
            );

            return false;

        }

        if (sample.rate == null) {

            Logger.warning(
                "Rate Missing"
            );

            return false;

        }

        return true;

    }

    function duplicate(transaction) {

        const today =
            Storage.load("todayTransactions", []);

        return today.some(t =>

            t.customerID ===
            transaction.customerID &&

            t.type === "MILK" &&

            Math.abs(
                t.timestamp -
                transaction.timestamp
            ) < 30000

        );

    }

    function saveLocal(transaction) {

        Storage.append(
            "transactions",
            transaction
        );

        Storage.append(
            "todayTransactions",
            transaction
        );

    }

    function finish() {

        State.saveComplete();

        UI.clearEntry();

        UI.enableSave(false);

        Utils.focus(
            "customerID"
        );

    }

    return {

        saveMilk,

        saveCash,

        saveFeed

    };

})();
