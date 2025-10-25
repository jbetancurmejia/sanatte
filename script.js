// script.js
// Configuración de Tailwind personalizada

tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6", // Purple from the logo
        secondary: "#38BDF8", // Blue from the logo
        "background-light": "#F7F9FC",
        "background-dark": "#111827",
        "card-light": "#FFFFFF",
        "card-dark": "#1F2937",
        "text-light": "#1F2937",
        "text-dark": "#E5E7EB",
        "subtext-light": "#6B7280",
        "subtext-dark": "#9CA3AF",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
      },
    },
  },
};

// Menú responsive para dispositivos móviles

document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('button.md\\:hidden');
  const navMenu = document.querySelector('nav.hidden.md\\:flex');

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', function () {
      navMenu.classList.toggle('hidden');
    });
  }
});