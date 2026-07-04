/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0023
File    : assets/js/dummy-data.js
------------------------------------------------------------
Dummy Data Provider
Only for UI Development.

Replace with Google Sheets API later.
------------------------------------------------------------
*/

"use strict";

const DummyData = (() => {

    const customers = [

        {
            id: "1001",
            name: "Akash Patil",

            previous: 1280,
            milkTotal: 2365,
            feed: 450,
            cash: 500,
            final: 2695,

            entries: [
                { day: 1, fat: 4.2, snf: 8.7, qty: 12.6, rate: 38.50, amount: 485.10 },
                { day: 2, fat: 4.3, snf: 8.8, qty: 11.8, rate: 39.10, amount: 461.38 },
                { day: 3, fat: 4.4, snf: 8.9, qty: 12.2, rate: 39.40, amount: 480.68 },
                { day: 4, fat: 4.5, snf: 9.0, qty: 12.4, rate: 39.80, amount: 493.52 },
                { day: 5, fat: 4.4, snf: 8.9, qty: 11.3, rate: 39.40, amount: 445.22 }
            ]
        },

        {
            id: "1002",
            name: "Ramesh Shinde",

            previous: -320,
            milkTotal: 2110,
            feed: 700,
            cash: 200,
            final: 890,

            entries: [
                { day: 1, fat: 3.9, snf: 8.6, qty: 10.1, rate: 37.20, amount: 375.72 },
                { day: 2, fat: 4.0, snf: 8.7, qty: 10.6, rate: 37.80, amount: 400.68 },
                { day: 3, fat: 4.1, snf: 8.8, qty: 10.4, rate: 38.30, amount: 398.32 }
            ]
        },

        {
            id: "1003",
            name: "Sunil Pawar",

            previous: 540,
            milkTotal: 1850,
            feed: 250,
            cash: 0,
            final: 2140,

            entries: [
                { day: 1, fat: 4.8, snf: 9.2, qty: 8.5, rate: 42.20, amount: 358.70 },
                { day: 2, fat: 4.9, snf: 9.2, qty: 8.4, rate: 42.60, amount: 357.84 },
                { day: 3, fat: 5.0, snf: 9.3, qty: 8.8, rate: 43.00, amount: 378.40 }
            ]
        }

    ];

    function all() {

        return structuredClone(customers);

    }

    function customer(id) {

        return structuredClone(

            customers.find(c => c.id === id)

        );

    }

    function exists(id) {

        return customers.some(

            c => c.id === id

        );

    }

    function search(text) {

        text = String(text).toLowerCase();

        return structuredClone(

            customers.filter(c =>

                c.id.includes(text) ||

                c.name.toLowerCase().includes(text)

            )

        );

    }

    return {

        all,

        customer,

        exists,

        search

    };

})();
