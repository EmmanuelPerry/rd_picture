// Fonction pour initialiser tout quand DOM chargé
document.addEventListener("DOMContentLoaded", () => {
    // --- Menu mobile ---
    const navLinks = document.querySelectorAll(".nav-menu .nav-fil");
    const menuOpenBtn = document.querySelector(".menu-toggle");
    const menuCloseBtn = document.querySelector(".close-menu");
    const toggleMobileMenu = () => {
      document.body.classList.toggle("show-mobile-menu");
    };
    if (menuOpenBtn) menuOpenBtn.addEventListener("click", toggleMobileMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener("click", toggleMobileMenu);
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
      });
    });
  
    // --- Dropdown menu ---
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownMenu = document.querySelector(".dropdown-content");
    if (dropdownBtn && dropdownMenu) {
      dropdownBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");
      });
      window.addEventListener("click", (e) => {
        if (!e.target.matches('.dropdown-btn')) {
          dropdownMenu.classList.remove('show');
        }
      });
    }
  
    // --- Initialiser AOS ---
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 1000, once: true });
    }
  
    // --- Galerie popup ---
    const galleryImages = document.querySelectorAll('.gallery-image');
    const popup = document.getElementById('image-popup');
    const popupImg = document.querySelector('.popup-img');
    const popupClose = document.querySelector('.popup-close');
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        if (popup && popupImg) {
          popup.style.display = 'flex';
          popupImg.src = img.src;
        }
      });
    });
    if (popupClose) {
      popupClose.addEventListener('click', () => {
        if (popup) popup.style.display = 'none';
      });
    }
    if (popup) {
      popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.style.display = 'none';
      });
    }
  
    // --- Gestion des "Show More / Show Less" ---
    document.querySelectorAll('.show-more-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const section = button.closest('.gallery-section');
        const hiddenImages = section.querySelectorAll('.gallery-list .gallery-item:nth-child(n+5)');
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
        if (button.dataset.state !== 'expanded') {
          // Expandir
          hiddenImages.forEach(img => (img.style.display = 'block'));
          button.textContent = 'Show Less';
          button.dataset.state = 'expanded';
        } else {
          // Réduire
          hiddenImages.forEach(img => (img.style.display = 'none'));
          button.textContent = 'Show More';
          button.dataset.state = 'collapsed';
        }
  
        // Rétablir la position du scroll
        window.scrollTo({ top: scrollPosition, behavior: 'auto' });
      });
    });
  });
  
  // --- Gestion du scroll sauvegardé et restauration ---
  // Fonction pour charger la position de scroll sauvegardée
  const restoreScrollPosition = () => {
    const scrollPos = parseInt(sessionStorage.getItem("scrollPos"), 10);
    if (!isNaN(scrollPos)) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: Math.min(scrollPos, maxScroll), behavior: 'auto' });
    }
  };
  
  // Fonction pour sauvegarder la position de scroll
  const saveScrollPosition = () => {
    sessionStorage.setItem("scrollPos", window.scrollY);
  };
  
  // --- Lors de la fin du chargement de la page ---
  window.addEventListener("load", () => {
    // Fade out loader si présent
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.transition = "opacity 0.5s ease";
      loader.style.opacity = 0;
      setTimeout(() => { loader.style.display = "none"; }, 500);
    }
  
    // Récupérer et appliquer la position de scroll sauvegardée
    restoreScrollPosition();
  
    // Rendre le site visible
    document.body.style.visibility = "visible";
  
    // Init AOS si nécessaire
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 1000, once: true });
    }
  });
  
  // --- Avant de quitter la page, sauvegarder la position de scroll ---
  window.addEventListener("beforeunload", () => {
    saveScrollPosition();
  });