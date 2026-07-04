/*
------------------------------------------------------------
SMC Milk Collection PWA
Version : 1.0.0-alpha.1
Build   : 0047
File    : assets/js/collection-controller.js
------------------------------------------------------------

Collection Controller

Main workflow controller.

Responsibilities

✓ Build Transaction
✓ Generate Transaction ID
✓ Validate
✓ Save Online
✓ Queue Offline
✓ Update Register
✓ Trigger SMS
✓ Clear Session
✓ Reset UI
✓ Focus Customer ID

------------------------------------------------------------
*/

"use strict";

const CollectionController = (() => {

    //------------------------------------------------------

    function init() {

        const btn = document.getElementById("btnSave");

        if (btn) {

            btn.addEventListener(

                "click",

                save

            );

        }

        EventBus.on(

            "transaction.save.request",

            save

        );

        Logger.success(

            "Collection Controller Ready"

        );

    }

    //------------------------------------------------------

    async function save() {

        try {

            const tx = buildTransaction();

            //--------------------------------------------------

            const validation =

                TransactionValidator.validate(tx);

            if (!validation.valid) {

                UI.showError(

                    validation.message

                );

                return;

            }

            //--------------------------------------------------

            if (navigator.onLine) {

                await DataService.saveMilk(tx);

                Logger.success(

                    "Saved Online"

                );

            }

            else {

                OfflineQueue.add({

                    type: "milk",

                    data: tx

                });

                Logger.warning(

                    "Saved Offline"

                );

            }

            //--------------------------------------------------

            EventBus.emit(

                "transaction.saved",

                tx

            );

            //--------------------------------------------------

            Register.add(tx);

            //--------------------------------------------------

            sendSMS(tx);

            //--------------------------------------------------

            CollectionSession.clear();

            UI.clearMilkForm();

            KeyboardManager.focusCustomer();

        }

        catch (error) {

            Logger.error(error);

            UI.showError(

                "Unable to save transaction."

            );

        }

    }

    //------------------------------------------------------

    function buildTransaction() {

        const session =

            CollectionSession.get();

        return {

            id: generateId(),

            type: "milk",

            date: new Date().toISOString(),

            periodCode:

                CollectionPeriod.billingCode(),

            customerId:

                session.customer.id,

            customerName:

                session.customer.name,

            fat:

                session.fat,

            snf:

                session.snf,

            clr:

                session.clr,

            quantity:

                session.quantity,

            rate:

                session.rate,

            amount:

                session.amount,

            operator:

                StateManager.get("operator"),

            collectionCenter:

                StateManager.get("collectionCenter"),

            analyzer:

                AnalyzerService.getLastSample()

        };

    }

    //------------------------------------------------------

    function generateId() {

        const now = new Date();

        const d =

            now.getFullYear().toString() +

            String(now.getMonth() + 1)

                .padStart(2, "0") +

            String(now.getDate())

                .padStart(2, "0");

        const t =

            String(now.getHours())

                .padStart(2, "0") +

            String(now.getMinutes())

                .padStart(2, "0") +

            String(now.getSeconds())

                .padStart(2, "0");

        const seq =

            String(Date.now() % 10000)

                .padStart(4, "0");

        const center =

            StateManager.get(

                "collectionCenter.code"

            ) || "CC01";

        return `MC-${center}-${d}-${t}-${seq}`;

    }

    //------------------------------------------------------

    function sendSMS(tx) {

        if (!Settings.smsMilkEnabled())

            return;

        EventBus.emit(

            "sms.send",

            tx

        );

    }

    //------------------------------------------------------

    return {

        init,

        save

    };

})();
