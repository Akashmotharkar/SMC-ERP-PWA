/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0034
File    : assets/js/duplicate-detector.js
------------------------------------------------------------

Duplicate Detector

Production Ready Foundation

Checks

✓ Milk Duplicate
✓ Cash Duplicate
✓ Feed Duplicate
✓ Offline Queue Duplicate
✓ Current Session Duplicate

Future

✓ Google Sheet Duplicate
✓ Server Duplicate
✓ Admin Override
✓ Multi Device Detection

------------------------------------------------------------
*/

"use strict";

const DuplicateDetector = (() => {

    //------------------------------------------------------
    // Public
    //------------------------------------------------------

    function exists(transaction) {

        if (!transaction)
            return false;

        if (checkSession(transaction))
            return true;

        if (checkOfflineQueue(transaction))
            return true;

        if (checkRegister(transaction))
            return true;

        return false;

    }

    //------------------------------------------------------
    // Session
    //------------------------------------------------------

    function checkSession(tx) {

        const list = AppState.transactions || [];

        return list.some(item => compare(item, tx));

    }

    //------------------------------------------------------
    // Offline Queue
    //------------------------------------------------------

    function checkOfflineQueue(tx) {

        if (!OfflineQueue.pending)
            return false;

        const queue = OfflineQueue.pending();

        return queue.some(item => {

            return compare(item.data, tx);

        });

    }

    //------------------------------------------------------
    // Current Register
    //------------------------------------------------------

    function checkRegister(tx) {

        const register = AppState.register || [];

        return register.some(item => compare(item, tx));

    }

    //------------------------------------------------------
    // Compare
    //------------------------------------------------------

    function compare(a, b) {

        if (!a || !b)
            return false;

        if (a.type !== b.type)
            return false;

        switch (a.type) {

            case "milk":
                return milkDuplicate(a, b);

            case "cash":
                return cashDuplicate(a, b);

            case "feed":
                return feedDuplicate(a, b);

            default:
                return false;

        }

    }

    //------------------------------------------------------
    // Milk
    //------------------------------------------------------

    function milkDuplicate(a, b) {

        return (

            a.customerId === b.customerId &&

            a.date === b.date &&

            Number(a.quantity) === Number(b.quantity) &&

            Number(a.fat) === Number(b.fat) &&

            Number(a.snf) === Number(b.snf)

        );

    }

    //------------------------------------------------------
    // Cash
    //------------------------------------------------------

    function cashDuplicate(a, b) {

        return (

            a.customerId === b.customerId &&

            a.date === b.date &&

            Number(a.amount) === Number(b.amount)

        );

    }

    //------------------------------------------------------
    // Feed
    //------------------------------------------------------

    function feedDuplicate(a, b) {

        return (

            a.customerId === b.customerId &&

            a.date === b.date &&

            a.feedName === b.feedName &&

            Number(a.amount) === Number(b.amount)

        );

    }

    //------------------------------------------------------
    // Manual Check
    //------------------------------------------------------

    function find(transaction) {

        const list = AppState.transactions || [];

        return list.find(item => compare(item, transaction));

    }

    //------------------------------------------------------

    return {

        exists,

        find

    };

})();
