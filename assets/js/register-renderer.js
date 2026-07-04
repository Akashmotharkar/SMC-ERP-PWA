/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0049
File    : assets/js/register-renderer.js
------------------------------------------------------------

Register Renderer

Responsibilities

✓ Render Register
✓ Update Single Customer
✓ Horizontal Auto Scroll
✓ Virtual Rendering Ready
✓ Compact Layout

Never performs calculations.

------------------------------------------------------------
*/

"use strict";

const RegisterRenderer = (() => {

    let container;

    let customerColumns = new Map();

    //--------------------------------------------------

    function init() {

        container = document.getElementById("registerContainer");

        EventBus.on(
            "register.loaded",
            render
        );

        EventBus.on(
            "register.customer.updated",
            updateCustomer
        );

        EventBus.on(
            "customer.selected",
            scrollToCustomer
        );

        Logger.success(
            "Register Renderer Ready"
        );

    }

    //--------------------------------------------------

    function render(customers) {

        if (!container)
            return;

        container.innerHTML = "";

        customerColumns.clear();

        customers.forEach(customer => {

            const column = buildColumn(customer);

            customerColumns.set(

                customer.customerId,

                column

            );

            container.appendChild(column);

        });

    }

    //--------------------------------------------------

    function buildColumn(customer) {

        const column = document.createElement("div");

        column.className = "register-column";

        column.id =

            "customer-" +

            customer.customerId;

        column.innerHTML = createHTML(customer);

        return column;

    }

    //--------------------------------------------------

    function updateCustomer(customer) {

        if (!customer)
            return;

        let column = customerColumns.get(

            customer.customerId

        );

        if (!column) {

            column = buildColumn(customer);

            customerColumns.set(

                customer.customerId,

                column

            );

            container.appendChild(column);

            return;

        }

        column.innerHTML = createHTML(customer);

    }

    //--------------------------------------------------

    function createHTML(customer) {

        return `

<div class="register-header">

<div class="customer-id">

${customer.customerId}

</div>

<div class="customer-name">

${customer.customerName}

</div>

</div>

<div class="register-balance">

Prev :

₹ ${customer.previousBalance.toFixed(2)}

</div>

<div class="register-total">

Milk :

₹ ${customer.milkTotal.toFixed(2)}

</div>

<div class="register-total">

Cash :

₹ ${customer.cashTotal.toFixed(2)}

</div>

<div class="register-total">

Feed :

₹ ${customer.feedTotal.toFixed(2)}

</div>

<div class="register-final">

₹ ${customer.finalAmount.toFixed(2)}

</div>

`;

    }

    //--------------------------------------------------

    function scrollToCustomer(customer) {

        if (!customer)
            return;

        const column = customerColumns.get(

            customer.id

        );

        if (!column)
            return;

        column.scrollIntoView({

            behavior: "smooth",

            inline: "center",

            block: "nearest"

        });

    }

    //--------------------------------------------------

    function refresh() {

        render(

            RegisterStore.getAll()

        );

    }

    //--------------------------------------------------

    return {

        init,

        render,

        refresh,

        updateCustomer,

        scrollToCustomer

    };

})();
