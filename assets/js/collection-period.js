/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0035
File    : assets/js/collection-period.js
------------------------------------------------------------

Collection Period Manager

Single source of truth for:

✓ Current 10-day period
✓ Previous period
✓ Next period
✓ Register header
✓ SMS Summary
✓ Farmer Bill
✓ Reports
✓ API

Periods

1  - 10
11 - 20
21 - End of Month

------------------------------------------------------------
*/

"use strict";

const CollectionPeriod = (() => {

    //--------------------------------------------------
    // Public
    //--------------------------------------------------

    function current(date = new Date()) {

        return calculate(date);

    }

    function previous(date = new Date()) {

        const p = calculate(date);

        const d = new Date(p.startDate);

        d.setDate(d.getDate() - 1);

        return calculate(d);

    }

    function next(date = new Date()) {

        const p = calculate(date);

        const d = new Date(p.endDate);

        d.setDate(d.getDate() + 1);

        return calculate(d);

    }

    function title(date = new Date()) {

        const p = calculate(date);

        return format(p.startDate) +
            " - " +
            format(p.endDate);

    }

    function contains(dateToCheck, periodDate = new Date()) {

        const p = calculate(periodDate);

        const d = new Date(dateToCheck);

        return d >= p.startDate &&
               d <= p.endDate;

    }

    //--------------------------------------------------
    // Core
    //--------------------------------------------------

    function calculate(date) {

        const d = new Date(date);

        const year = d.getFullYear();

        const month = d.getMonth();

        const day = d.getDate();

        let start;
        let end;

        if (day <= 10) {

            start = 1;
            end = 10;

        }

        else if (day <= 20) {

            start = 11;
            end = 20;

        }

        else {

            start = 21;

            end = new Date(

                year,
                month + 1,
                0

            ).getDate();

        }

        const startDate = new Date(

            year,
            month,
            start,
            0,
            0,
            0

        );

        const endDate = new Date(

            year,
            month,
            end,
            23,
            59,
            59

        );

        return {

            year,

            month,

            startDay: start,

            endDay: end,

            startDate,

            endDate,

            days: end - start + 1,

            label:
                format(startDate) +
                " - " +
                format(endDate)

        };

    }

    //--------------------------------------------------
    // Formatting
    //--------------------------------------------------

    function format(date) {

        const d = String(date.getDate())
            .padStart(2, "0");

        const m = String(date.getMonth() + 1)
            .padStart(2, "0");

        const y = date.getFullYear();

        return `${d}/${m}/${y}`;

    }

    //--------------------------------------------------
    // Register Header
    //--------------------------------------------------

    function registerDays(date = new Date()) {

        const p = calculate(date);

        const list = [];

        for (

            let i = p.startDay;

            i <= p.endDay;

            i++

        ) {

            list.push(i);

        }

        return list;

    }

    //--------------------------------------------------
    // Future Billing
    //--------------------------------------------------

    function billingCode(date = new Date()) {

        const p = calculate(date);

        return `${p.year}-${p.month + 1}-${p.startDay}`;

    }

    //--------------------------------------------------

    return {

        current,

        previous,

        next,

        title,

        contains,

        registerDays,

        billingCode

    };

})();
