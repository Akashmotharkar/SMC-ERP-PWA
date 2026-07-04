/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0048
File    : assets/js/register-store.js
------------------------------------------------------------

Register Store

Responsibilities

✓ Load Register
✓ Store Register
✓ Update Customer
✓ Calculate Totals
✓ Publish Updates

Never manipulates DOM directly.

------------------------------------------------------------
*/

"use strict";

const RegisterStore = (() => {

    //------------------------------------------------------

    let register = new Map();

    //------------------------------------------------------

    function init() {

        Logger.success("Register Store Ready");

    }

    //------------------------------------------------------

    async function load(date = new Date()) {

        try {

            const data = await DataService.loadRegister(date);

            register.clear();

            if (Array.isArray(data)) {

                data.forEach(customer => {

                    register.set(

                        customer.customerId,

                        customer

                    );

                });

            }

            EventBus.emit(

                "register.loaded",

                getAll()

            );

            Logger.success(

                `Register Loaded (${register.size} Customers)`

            );

        }

        catch (error) {

            Logger.error(error);

        }

    }

    //------------------------------------------------------

    function get(customerId) {

        return register.get(customerId) || null;

    }

    //------------------------------------------------------

    function getAll() {

        return Array.from(register.values());

    }

    //------------------------------------------------------

    function addTransaction(tx) {

        let customer = register.get(tx.customerId);

        if (!customer) {

            customer = createCustomer(tx);

            register.set(

                tx.customerId,

                customer

            );

        }

        customer.transactions.push(tx);

        recalculate(customer);

        EventBus.emit(

            "register.customer.updated",

            customer

        );

    }

    //------------------------------------------------------

    function createCustomer(tx) {

        return {

            customerId: tx.customerId,

            customerName: tx.customerName,

            previousBalance: 0,

            milkTotal: 0,

            cashTotal: 0,

            feedTotal: 0,

            finalAmount: 0,

            transactions: []

        };

    }

    //------------------------------------------------------

    function recalculate(customer) {

        let milk = 0;

        let cash = 0;

        let feed = 0;

        customer.transactions.forEach(tx => {

            switch (tx.type) {

                case "milk":

                    milk += Number(tx.amount);

                    break;

                case "cash":

                    cash += Number(tx.data.amount);

                    break;

                case "feed":

                    feed += Number(tx.data.amount);

                    break;

            }

        });

        customer.milkTotal = round(milk);

        customer.cashTotal = round(cash);

        customer.feedTotal = round(feed);

        customer.finalAmount = round(

            customer.previousBalance +

            milk -

            cash -

            feed

        );

    }

    //------------------------------------------------------

    function round(value) {

        return Number(value.toFixed(2));

    }

    //------------------------------------------------------

    function refreshCustomer(customerId) {

        EventBus.emit(

            "register.customer.updated",

            get(customerId)

        );

    }

    //------------------------------------------------------

    function clear() {

        register.clear();

    }

    //------------------------------------------------------

    return {

        init,

        load,

        get,

        getAll,

        addTransaction,

        refreshCustomer,

        clear

    };

})();
