
/* =========================
   GYMFIT - MAIN JAVASCRIPT
========================= */

// Display the current year in the footer
const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Smooth back-to-top functionality
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    backToTop.addEventListener("click", function (event) {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
