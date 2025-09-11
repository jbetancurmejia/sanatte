// Sanatte JS - script.js
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a nav link
if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Close menu when clicking the close button
const closeMenuBtn = document.querySelector('.close-menu');
if (closeMenuBtn && navLinks) {
    closeMenuBtn.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}