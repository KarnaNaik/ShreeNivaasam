// Make 'submitted' a global variable so it can be accessed by the iframe's onload event
let submitted = false;

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile menu toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.getElementById('main-nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // --- Estimator calculation ---
    const estimatorForm = document.getElementById('estimator-form');

    // Only run this code if the estimator form exists on the page
    if (estimatorForm) {
        estimatorForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form from submitting the traditional way

            const area = parseFloat(document.getElementById('area').value);
            const qualityCostPerSqFt = parseFloat(document.getElementById('quality').value);
            const resultContainer = document.getElementById('result-container');
            const estimatedCostEl = document.getElementById('estimated-cost');

            if (isNaN(area) || area <= 0) {
                alert("Please enter a valid area in square feet.");
                return;
            }

            const totalCost = area * qualityCostPerSqFt;

            const formattedCost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalCost);

            estimatedCostEl.textContent = formattedCost;
            resultContainer.style.display = 'block';
        });
    }

    // --- Google Form submission for Get Quote page ---
    const googleQuoteForm = document.getElementById('google-quote-form');

    if (googleQuoteForm) {
        googleQuoteForm.addEventListener('submit', () => {
            submitted = true;
        });
    }

    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    const currentPage = window.location.pathname.split('/').pop(); // Gets the current file name (e.g., "about.html")

    // If on the homepage, currentPage will be empty, so we handle that case.
    const homePageFile = 'index.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Check if the link's href matches the current page, or if it's the home link on the homepage.
        if (linkPage === currentPage || (currentPage === '' && linkPage === homePageFile)) {
            // Add the active class to the parent <li> element for better styling control
            link.parentElement.classList.add('active-nav');
        }
    });

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById("back-to-top");

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            // Show button if user has scrolled down 200px
            if (window.scrollY > 200) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});