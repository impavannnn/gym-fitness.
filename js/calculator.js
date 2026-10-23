
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calculatorForm");
    const errorMessage = document.getElementById("formError");

    const bmiResult = document.getElementById("bmiResult");
    const bmiCategory = document.getElementById("bmiCategory");
    const maintenanceResult = document.getElementById("maintenanceResult");
    const goalResult = document.getElementById("goalResult");
    const goalDescription = document.getElementById("goalDescription");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        errorMessage.textContent = "";

        const age = Number(document.getElementById("age").value);
        const sex = document.getElementById("sex").value;
        const weight = Number(document.getElementById("weight").value);
        const height = Number(document.getElementById("height").value);
        const activity = Number(document.getElementById("activity").value);
        const goal = document.getElementById("goal").value;

        // Validate input values.
        if (
            !Number.isFinite(age) ||
            !Number.isFinite(weight) ||
            !Number.isFinite(height) ||
            !Number.isFinite(activity) ||
            age < 18 || age > 100 ||
            weight < 20 || weight > 350 ||
            height < 100 || height > 250
        ) {
            errorMessage.textContent =
                "Please enter valid details within the allowed ranges.";
            return;
        }

        // Calculate BMI.
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        let category;

        if (bmi < 18.5) {
            category = "Underweight";
        } else if (bmi < 25) {
            category = "Normal weight";
        } else if (bmi < 30) {
            category = "Overweight";
        } else {
            category = "Obesity range";
        }

        bmiResult.textContent = bmi.toFixed(1);
        bmiCategory.textContent = category;

        // Estimate resting energy needs using Mifflin-St Jeor.
        // These equations use the selected sex input.
        let bmr;

        if (sex === "male") {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        // Estimate total daily energy expenditure.
        const maintenanceCalories = Math.round(bmr * activity);

        // Use a moderate illustrative adjustment for the selected goal.
        let goalCalories;
        let description;

        if (goal === "lose") {
            goalCalories = maintenanceCalories - 300;
            description = "Estimated daily target with a modest calorie deficit.";
        } else if (goal === "gain") {
            goalCalories = maintenanceCalories + 300;
            description = "Estimated daily target with a modest calorie surplus.";
        } else {
            goalCalories = maintenanceCalories;
            description = "Estimated daily target for weight maintenance.";
        }

        maintenanceResult.textContent =
            maintenanceCalories.toLocaleString("en-IN");

        goalResult.textContent =
            goalCalories.toLocaleString("en-IN");

        goalDescription.textContent = description;
    });
});


