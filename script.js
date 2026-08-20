const menuToggle = document.querySelector(".menu-toggle");
const navbarMenu = document.querySelector(".navbar ul");
const navLinks = document.querySelectorAll(".navbar ul li a");

// Mobile Menu Toggle
menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    navbarMenu.classList.toggle("active");
});

// Close Mobile Menu when clicking outside
document.addEventListener("click", (event) => {
    if (!navbarMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navbarMenu.classList.remove("active");
    }
});

// Smooth Scrolling for Nav Links (Fixes Home button scrolling)
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");

        // Only handle internal section links
        if (targetId && targetId.startsWith("#")) {
            e.preventDefault();

            // If href is "#" or "#home", target the home section
            const targetSection = (targetId === "#" || targetId === "#home")
                ? document.querySelector("#home") || document.querySelector(".home")
                : document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        }

        // Close mobile dropdown menu when a link is clicked
        navbarMenu.classList.remove("active");
    });
});

// Intersection Observer for Section Fade Animations
const observerOptions = {
    threshold: 0.2 // Triggers when 20% of section is visible
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("section-active");
        }
    });
}, observerOptions);

document.querySelectorAll("section").forEach(section => {
    section.classList.add("section-hidden");
    sectionObserver.observe(section);
});

const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents page redirect

    const data = new FormData(form);
    const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        alert('Thank you! Your message has been sent.');
        form.reset(); // Clears all input text
    } else {
        alert('Oops! There was a problem submitting your form.');
    }
});