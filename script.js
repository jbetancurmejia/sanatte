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

// Scroll suave personalizado y aún más lento para el botón "Quiero unirme!"
document.addEventListener('DOMContentLoaded', function () {
  const joinBtn = document.querySelector('a[href="#brevo-form"]');
  if (joinBtn) {
    joinBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById('brevo-form');
      if (target) {
        // Animación de scroll más lenta
        const startY = window.scrollY;
        const endY = target.getBoundingClientRect().top + window.scrollY - 40;
        const duration = 2200; // milisegundos (más lento)
        let startTime = null;
        function animateScroll(currentTime) {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          window.scrollTo(0, startY + (endY - startY) * progress);
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        }
        requestAnimationFrame(animateScroll);
      }
    });
  }
});