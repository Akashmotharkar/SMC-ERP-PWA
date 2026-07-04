/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0042
File    : assets/js/customer-lookup.js
------------------------------------------------------------

Customer Lookup

Responsibilities

✓ Instant Customer Search
✓ Load Customer Details
✓ Update Current Customer
✓ Scroll Register
✓ Publish Events
✓ Keyboard Friendly

------------------------------------------------------------
*/

"use strict";

const CustomerLookup = (() => {

    //--------------------------------------------------
    // Variables
    //--------------------------------------------------

    let inputCustomerId;
    let lblCustomerName;

    //--------------------------------------------------
    // Initialize
    //--------------------------------------------------

    function init() {

        inputCustomerId = document.getElementById("customerId");
        lblCustomerName = document.getElementById("customerName");

        if (!inputCustomerId) {

            Logger.warning("Customer ID control missing.");

            return;

        }

        inputCustomerId.addEventListener(
            "input",
            debounce(onCustomerIdChanged, 150)
        );

        inputCustomerId.addEventListener(
            "keydown",
            onKeyDown
        );

        Logger.success("Customer Lookup Ready");

    }

    //--------------------------------------------------
    // Customer Changed
    //--------------------------------------------------

    function onCustomerIdChanged() {

        const customerId = inputCustomerId.value.trim();

        if (!customerId) {

            clear();

            return;

        }

        load(customerId);

    }

    //--------------------------------------------------
    // Enter Key
    //--------------------------------------------------

    function onKeyDown(e) {

        if (e.key !== "Enter")
            return;

        e.preventDefault();

        if (AppState.currentCustomer) {

            EventBus.emit(
                "customer.confirmed",
                AppState.currentCustomer
            );

        }

    }

    //--------------------------------------------------
    // Load Customer
    //--------------------------------------------------

    async function load(customerId) {

        try {

            Logger.info(
                "Searching Customer : " + customerId
            );

            const customer =
                await Customer.find(customerId);

            if (!customer) {

                invalid(customerId);

                return;

            }

            selected(customer);

        }

        catch (error) {

            Logger.error(error);

        }

    }

    //--------------------------------------------------
    // Customer Selected
    //--------------------------------------------------

    function selected(customer) {

        StateManager.set(
            "currentCustomer",
            customer
        );

        lblCustomerName.textContent =
            customer.name;

        UI.showCustomer(customer);

        Register.scrollToCustomer(
            customer.id
        );

        EventBus.emit(
            "customer.selected",
            customer
        );

        Logger.success(
            "Customer Loaded : " +
            customer.name
        );

    }

    //--------------------------------------------------
    // Invalid Customer
    //--------------------------------------------------

    function invalid(customerId) {

        clear();

        Logger.warning(
            "Customer Not Found : " +
            customerId
        );

        EventBus.emit(
            "customer.notfound",
            customerId
        );

    }

    //--------------------------------------------------
    // Clear
    //--------------------------------------------------

    function clear() {

        StateManager.remove(
            "currentCustomer"
        );

        if (lblCustomerName) {

            lblCustomerName.textContent = "";

        }

        if (UI.clearCustomer) {

            UI.clearCustomer();

        }

    }

    //--------------------------------------------------
    // Public
    //--------------------------------------------------

    function current() {

        return StateManager.get(
            "currentCustomer"
        );

    }

    function focus() {

        if (inputCustomerId) {

            inputCustomerId.focus();

            inputCustomerId.select();

        }

    }

    //--------------------------------------------------

    return {

        init,

        load,

        clear,

        current,

        focus

    };

})();
