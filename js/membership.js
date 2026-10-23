
document.addEventListener("DOMContentLoaded", function () {
    const membershipModalElement =
        document.getElementById("membershipModal");

    const confirmationModalElement =
        document.getElementById("confirmationModal");

    const membershipModal =
        bootstrap.Modal.getOrCreateInstance(membershipModalElement);

    const confirmationModal =
        bootstrap.Modal.getOrCreateInstance(confirmationModalElement);

    const planButtons = document.querySelectorAll(".choose-plan");
    const membershipForm = document.getElementById("membershipForm");

    const selectedPlanName = document.getElementById("selectedPlanName");
    const selectedPlanPrice = document.getElementById("selectedPlanPrice");

    const membershipError = document.getElementById("membershipError");
    const confirmationMessage =
        document.getElementById("confirmationMessage");

    let selectedPlan = "";
    let selectedPrice = 0;

    // Format prices in Indian currency format.
    function formatPrice(price) {
        return Number(price).toLocaleString("en-IN");
    }

    // Open the enquiry modal for the selected membership.
    planButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedPlan = button.dataset.plan;
            selectedPrice = Number(button.dataset.price);

            selectedPlanName.textContent = selectedPlan;
            selectedPlanPrice.textContent =
                "₹" + formatPrice(selectedPrice) + " / month";

            membershipError.textContent = "";
            membershipForm.reset();

            membershipModal.show();
        });
    });

    // Prepare a demo enquiry.
    membershipForm.addEventListener("submit", function (event) {
        event.preventDefault();
        membershipError.textContent = "";

        if (!membershipForm.checkValidity()) {
            membershipForm.reportValidity();
            return;
        }

        const name = document.getElementById("memberName").value.trim();
        const email = document.getElementById("memberEmail").value.trim();

        if (
            !name ||
            !email ||
            !Number.isFinite(selectedPrice) ||
            selectedPrice <= 0 ||
            !selectedPlan
        ) {
            membershipError.textContent =
                "Please enter valid details and select a membership plan.";
            return;
        }

        // Use textContent so user-entered values are not treated as HTML.
        confirmationMessage.textContent =
            "Thank you, " + name + "! Your sample enquiry for the " +
            selectedPlan + " plan (₹" + formatPrice(selectedPrice) +
            " per month) has been prepared. No message was sent to " +
            email + ".";

        membershipModal.hide();
    });

    // Show confirmation after the first modal has finished closing.
    membershipModalElement.addEventListener("hidden.bs.modal", function () {
        if (confirmationMessage.textContent) {
            confirmationModal.show();
        }
    });
});
