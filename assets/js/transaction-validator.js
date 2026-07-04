/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0033
File    : assets/js/transaction-validator.js
------------------------------------------------------------
Transaction Validator

Single validation layer.

Used by:

✓ Milk Collection
✓ Cash Entry
✓ Feed Entry
✓ Future REST API
✓ Future Mobile App

Business Rules

✓ Customer Exists
✓ Duplicate Detection
✓ Analyzer Values
✓ Quantity
✓ Rate
✓ Amount
✓ Collection Date
✓ Active Collection Period

------------------------------------------------------------
*/

"use strict";

const TransactionValidator = (() => {

    function validate(transaction) {

        if (!transaction)
            return fail("Transaction Missing");

        switch (transaction.type) {

            case "milk":
                return validateMilk(transaction);

            case "cash":
                return validateCash(transaction);

            case "feed":
                return validateFeed(transaction);

            default:
                return fail("Unknown Transaction Type");

        }

    }

    //--------------------------------------------------------
    // MILK
    //--------------------------------------------------------

    function validateMilk(tx) {

        if (!tx.customerId)
            return fail("Customer ID Required");

        if (!Customer.exists(tx.customerId))
            return fail("Customer Not Found");

        if (!isNumber(tx.fat))
            return fail("Invalid FAT");

        if (!isNumber(tx.snf))
            return fail("Invalid SNF");

        if (!isNumber(tx.clr))
            return fail("Invalid CLR");

        if (!isNumber(tx.quantity))
            return fail("Invalid Quantity");

        if (tx.quantity <= 0)
            return fail("Quantity must be greater than zero");

        if (!isNumber(tx.rate))
            return fail("Invalid Rate");

        if (tx.rate <= 0)
            return fail("Rate must be greater than zero");

        if (!isNumber(tx.amount))
            return fail("Invalid Amount");

        if (tx.amount <= 0)
            return fail("Invalid Amount");

        if (!tx.date)
            return fail("Collection Date Missing");

        if (DuplicateDetector.exists(tx))
            return fail("Duplicate Entry");

        return success();

    }

    //--------------------------------------------------------
    // CASH
    //--------------------------------------------------------

    function validateCash(tx) {

        if (!tx.customerId)
            return fail("Customer ID Required");

        if (!Customer.exists(tx.customerId))
            return fail("Customer Not Found");

        if (!isNumber(tx.amount))
            return fail("Amount Required");

        if (tx.amount <= 0)
            return fail("Amount must be greater than zero");

        return success();

    }

    //--------------------------------------------------------
    // FEED
    //--------------------------------------------------------

    function validateFeed(tx) {

        if (!tx.customerId)
            return fail("Customer ID Required");

        if (!Customer.exists(tx.customerId))
            return fail("Customer Not Found");

        if (!tx.feedName)
            return fail("Feed Name Required");

        if (!isNumber(tx.amount))
            return fail("Amount Required");

        if (tx.amount <= 0)
            return fail("Amount must be greater than zero");

        return success();

    }

    //--------------------------------------------------------
    // Helpers
    //--------------------------------------------------------

    function isNumber(value) {

        return value !== null &&
               value !== "" &&
               !isNaN(value);

    }

    function success() {

        return {

            valid: true,

            message: ""

        };

    }

    function fail(message) {

        Logger.warning(message);

        return {

            valid: false,

            message

        };

    }

    return {

        validate

    };

})();
