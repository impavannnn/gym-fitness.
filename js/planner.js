
document.addEventListener("DOMContentLoaded", function () {
    const storageKey = "gymfitPlannerCompleted";
    const buttons = document.querySelectorAll(".complete-btn");
    const cards = document.querySelectorAll(".day-card");

    const totalElement = document.getElementById("totalWorkouts");
    const completedElement = document.getElementById("completedWorkouts");
    const progressText = document.getElementById("progressText");
    const progressLabel = document.getElementById("progressLabel");
    const progressBar = document.getElementById("progressBar");
    const progressContainer = document.getElementById("progressContainer");
    const resetButton = document.getElementById("resetPlan");

    // Read saved completion data safely.
    function loadCompletedDays() {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");

            if (!Array.isArray(saved)) {
                return [];
            }

            const validDays = Array.from(cards).map(card => card.dataset.day);
            return [...new Set(saved.filter(day => validDays.includes(day)))];
        } catch (error) {
            return [];
        }
    }

    let completedDays = loadCompletedDays();

    // Save completed days in the browser.
    function saveCompletedDays() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(completedDays));
        } catch (error) {
            console.warn("Progress could not be saved in this browser.");
        }
    }

    // Update the appearance of each workout card.
    function updateCards() {
        cards.forEach(card => {
            const day = card.dataset.day;
            const button = card.querySelector(".complete-btn");
            const isCompleted = completedDays.includes(day);

            card.classList.toggle("completed", isCompleted);
            button.setAttribute("aria-pressed", String(isCompleted));

            if (isCompleted) {
                button.innerHTML =
                    '<i class="bi bi-check-circle-fill me-1"></i> Completed';
            } else {
                button.innerHTML =
                    '<i class="bi bi-check2-circle me-1"></i> Mark Complete';
            }
        });
    }

    // Update weekly totals and progress.
    function updateProgress() {
        const total = cards.length;
        const completed = completedDays.length;
        const percentage = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        totalElement.textContent = total;
        completedElement.textContent = completed;
        progressText.textContent = percentage + "%";
        progressLabel.textContent = `${completed} of ${total} completed`;

        progressBar.style.width = percentage + "%";
        progressContainer.setAttribute("aria-valuenow", percentage);
    }

    // Mark a day complete or incomplete.
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const day = button.dataset.day;

            if (completedDays.includes(day)) {
                completedDays = completedDays.filter(item => item !== day);
            } else {
                completedDays.push(day);
            }

            saveCompletedDays();
            updateCards();
            updateProgress();
        });
    });

    // Reset the week's progress.
    resetButton.addEventListener("click", function () {
        const confirmed = window.confirm(
            "Are you sure you want to reset this week's workout progress?"
        );

        if (!confirmed) {
            return;
        }

        completedDays = [];
        saveCompletedDays();
        updateCards();
        updateProgress();
    });

    // Initialize the page.
    updateCards();
    updateProgress();
});

