
/* =========================
   GYMFIT - WORKOUTS PAGE
========================= */

const exerciseItems = [
    ...document.querySelectorAll(".exercise-item")
];

const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("exerciseSearch");
const exerciseCount = document.getElementById("exerciseCount");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";

// Exercise information for the details popup
const exerciseDetails = {
    "bench-press": {
        name: "Bench Press",
        category: "CHEST",
        description: "A compound pressing exercise that trains the chest, triceps, and front shoulders.",
        sets: "3",
        reps: "8–12",
        level: "Intermediate",
        tip: "Keep your feet planted, control the bar, and use a spotter when appropriate."
    },

    "dumbbell-press": {
        name: "Dumbbell Press",
        category: "CHEST",
        description: "A chest exercise that uses dumbbells to train pressing strength and coordination.",
        sets: "3",
        reps: "8–12",
        level: "Beginner",
        tip: "Start with a manageable weight and lower the dumbbells under control."
    },

    "push-ups": {
        name: "Push-Ups",
        category: "CHEST",
        description: "A bodyweight movement that trains the chest, triceps, and shoulders.",
        sets: "3",
        reps: "8–15",
        level: "Beginner",
        tip: "Keep your body in a straight line and choose an appropriate variation."
    },

    "lat-pulldown": {
        name: "Lat Pulldown",
        category: "BACK",
        description: "A cable exercise targeting the lats and other upper-back muscles.",
        sets: "3",
        reps: "10–12",
        level: "Beginner",
        tip: "Pull the bar toward your upper chest without swinging your torso."
    },

    "cable-row": {
        name: "Seated Cable Row",
        category: "BACK",
        description: "A pulling exercise that trains the back and helps develop rowing strength.",
        sets: "3",
        reps: "10–12",
        level: "Intermediate",
        tip: "Keep your torso steady and pull with controlled movement."
    },

    "pull-ups": {
        name: "Pull-Ups",
        category: "BACK",
        description: "A bodyweight pulling exercise that focuses on the lats and upper back.",
        sets: "3",
        reps: "5–10",
        level: "Advanced",
        tip: "Use an assisted variation if needed and avoid swinging."
    },

    "squat": {
        name: "Barbell Squat",
        category: "LEGS",
        description: "A compound lower-body exercise for the quadriceps, glutes, and other muscles.",
        sets: "3",
        reps: "6–10",
        level: "Intermediate",
        tip: "Use a comfortable range of motion and maintain controlled technique."
    },

    "romanian-deadlift": {
        name: "Romanian Deadlift",
        category: "LEGS",
        description: "A hip-hinge exercise that emphasizes the hamstrings and glutes.",
        sets: "3",
        reps: "8–12",
        level: "Intermediate",
        tip: "Keep the weight close to your legs and maintain a neutral back."
    },

    "lunges": {
        name: "Walking Lunges",
        category: "LEGS",
        description: "A single-leg movement that develops leg strength and balance.",
        sets: "3",
        reps: "10 each leg",
        level: "Beginner",
        tip: "Take controlled steps and keep your front knee aligned with your foot."
    },

    "shoulder-press": {
        name: "Shoulder Press",
        category: "SHOULDERS",
        description: "An overhead pressing movement that develops shoulder strength.",
        sets: "3",
        reps: "8–12",
        level: "Beginner",
        tip: "Brace your core and avoid arching your lower back excessively."
    },

    "lateral-raises": {
        name: "Lateral Raises",
        category: "SHOULDERS",
        description: "An isolation exercise that emphasizes the side deltoids.",
        sets: "3",
        reps: "12–15",
        level: "Beginner",
        tip: "Use light weights and lift smoothly without swinging."
    },

    "dumbbell-curl": {
        name: "Dumbbell Curl",
        category: "ARMS",
        description: "An isolation exercise for the biceps using dumbbells.",
        sets: "3",
        reps: "10–12",
        level: "Beginner",
        tip: "Keep your elbows near your sides and avoid using momentum."
    },

    "triceps-pushdown": {
        name: "Triceps Pushdown",
        category: "ARMS",
        description: "A cable exercise that targets the triceps at the back of the upper arm.",
        sets: "3",
        reps: "10–15",
        level: "Beginner",
        tip: "Keep your elbows close to your body and control the return."
    }
};

// Filter by category and search term
function filterExercises() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    exerciseItems.forEach(function (item) {
        const category = item.dataset.category;
        const text = item.textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesSearch = text.includes(searchTerm);

        const isVisible = matchesCategory && matchesSearch;

        item.hidden = !isVisible;

        if (isVisible) {
            visibleCount++;
        }
    });

    exerciseCount.textContent = visibleCount;
    noResults.classList.toggle("d-none", visibleCount !== 0);
}

// Category filter buttons
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            const isActive = btn === button;

            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        filterExercises();
    });
});

// Search as the user types
searchInput.addEventListener("input", filterExercises);

// Exercise details modal
const exerciseModalElement = document.getElementById("exerciseModal");
const exerciseModal = bootstrap.Modal.getOrCreateInstance(
    exerciseModalElement
);

document.querySelectorAll(".details-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const exercise = exerciseDetails[button.dataset.exercise];

        if (!exercise) return;

        document.getElementById("exerciseModalTitle").textContent =
            exercise.name;

        document.getElementById("modalCategory").textContent =
            exercise.category;

        document.getElementById("modalDescription").textContent =
            exercise.description;

        document.getElementById("modalSets").textContent =
            exercise.sets;

        document.getElementById("modalReps").textContent =
            exercise.reps;

        document.getElementById("modalLevel").textContent =
            exercise.level;

        document.getElementById("modalTip").textContent =
            exercise.tip;

        exerciseModal.show();
    });
});

// Initial exercise count
filterExercises();
