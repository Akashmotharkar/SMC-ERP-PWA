/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0015
File    : assets/js/customer.js
Status  : Production Ready
------------------------------------------------------------
*/

"use strict";

const Customer = (() => {

    let customers = [];

    let customerMap = new Map();

    async function initialize() {

        await loadCustomers();

        Logger.info("Customer Module Initialized");

    }

    async function loadCustomers() {

        const cache = Storage.load("customers", []);

        if (cache.length > 0) {

            customers = cache;

            buildMap();

            Logger.success(
                cache.length +
                " Customers Loaded From Cache"
            );

        }

        if (API.isOnline()) {

            const result = await API.getCustomers();

            if (result.success) {

                customers = result.data;

                Storage.save("customers", customers);

                buildMap();

                Logger.success(
                    customers.length +
                    " Customers Loaded From Server"
                );

            }

        }

    }

    function buildMap() {

        customerMap.clear();

        customers.forEach(c => {

            customerMap.set(

                String(c.customerID),

                c

            );

        });

    }

    function find(customerID) {

        customerID = String(customerID).trim();

        return customerMap.get(customerID) || null;

    }

    function exists(customerID) {

        return customerMap.has(

            String(customerID)

        );

    }

    function select(customerID) {

        const customer = find(customerID);

        if (!customer) {

            Logger.warning(

                "Customer Not Found : " +

                customerID

            );

            UI.clearEntry();

            return false;

        }

        State.customerSelected(customer);

        UI.loadCustomer(customer);

        UI.scrollRegister(customer.customerID);

        Logger.success(

            customer.customerID +

            " - " +

            customer.name

        );

        return customer;

    }

    function all() {

        return customers;

    }

    function count() {

        return customers.length;

    }

    return {

        initialize,

        select,

        find,

        exists,

        all,

        count

    };

})();
