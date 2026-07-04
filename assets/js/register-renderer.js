/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0022
File    : assets/js/register-renderer.js
------------------------------------------------------------
Generates the right-side physical register UI.
Current version:
✓ Compact Register
✓ Dynamic rendering
✓ Auto customer highlight
✓ Auto horizontal scroll
✓ Ready for API integration
------------------------------------------------------------
*/

"use strict";

const RegisterRenderer = (() => {

    let container = null;

    function init() {

        container = document.getElementById("registerContainer");

        if (!container) {

            Logger.error("Register container not found.");

            return;

        }

        Logger.success("Register Renderer Ready");

    }

    function render(customers = []) {

        if (!container) return;

        if (!customers.length) {

            container.innerHTML = emptyHTML();

            return;

        }

        let html = "";

        customers.forEach(customer => {

            html += customerCard(customer);

        });

        container.innerHTML = html;

    }

    function customerCard(c) {

        return `

<div class="register-card"
     id="register-${c.id}"
     data-id="${c.id}">

    <div class="register-header">

        <div class="customer-id">
            ${c.id}
        </div>

        <div class="customer-name">
            ${c.name}
        </div>

    </div>

    <table class="register-table">

        <thead>

            <tr>

                <th>Day</th>

                <th>Fat</th>

                <th>SNF</th>

                <th>Qty</th>

                <th>Rate</th>

                <th>Amt</th>

            </tr>

        </thead>

        <tbody>

            ${buildRows(c)}

        </tbody>

    </table>

    <div class="register-footer">

        <div>

            Previous :
            <span>
                ₹${money(c.previous)}
            </span>

        </div>

        <div>

            Milk :
            <span>
                ₹${money(c.milkTotal)}
            </span>

        </div>

        <div>

            Feed :
            <span>
                ₹${money(c.feed)}
            </span>

        </div>

        <div>

            Cash :
            <span>
                ₹${money(c.cash)}
            </span>

        </div>

        <div class="${balanceClass(c.final)}">

            ₹${money(c.final)}

        </div>

    </div>

</div>

`;

    }

    function buildRows(customer) {

        let rows = "";

        if (!customer.entries || !customer.entries.length) {

            rows += `

<tr>

<td colspan="6"
style="text-align:center;color:#999;">

No Entries

</td>

</tr>

`;

            return rows;

        }

        customer.entries.forEach(entry => {

            rows += `

<tr>

<td>${entry.day}</td>

<td>${value(entry.fat)}</td>

<td>${value(entry.snf)}</td>

<td>${value(entry.qty)}</td>

<td>${money(entry.rate)}</td>

<td>${money(entry.amount)}</td>

</tr>

`;

        });

        return rows;

    }

    function highlight(customerId) {

        removeHighlight();

        const card =
            document.getElementById(
                "register-" + customerId
            );

        if (!card) return;

        card.classList.add("active-register");

        scrollIntoView(card);

    }

    function scrollIntoView(card) {

        card.scrollIntoView({

            behavior: "smooth",

            inline: "center",

            block: "nearest"

        });

    }

    function removeHighlight() {

        document

            .querySelectorAll(".active-register")

            .forEach(card => {

                card.classList.remove(
                    "active-register"
                );

            });

    }

    function emptyHTML() {

        return `

<div class="register-empty">

<h2>

Waiting for Customer...

</h2>

<p>

Register will appear here.

</p>

</div>

`;

    }

    function money(v) {

        return Number(v || 0)

            .toFixed(2);

    }

    function value(v) {

        if (v === null || v === undefined)

            return "-";

        return v;

    }

    function balanceClass(v) {

        if (Number(v) >= 0)

            return "balance-positive";

        return "balance-negative";

    }

    return {

        init,

        render,

        highlight

    };

})();
