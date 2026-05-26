// script.js
document.addEventListener("DOMContentLoaded", () => {
  /* 
     HERO SLIDESHOW
  */
  let slideIndex = 0;
  const slides = document.querySelectorAll(".mySlides");
  const dots = document.querySelectorAll(".dot");

  function showSlides() {
    slides.forEach(slide => (slide.style.display = "none"));
    dots.forEach(dot => dot.classList.remove("active"));

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 5000); // 5s interval
  }

  if (slides.length > 0) {
    showSlides();
  }

  // Manual dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      slideIndex = i;
      slides.forEach(slide => (slide.style.display = "none"));
      dots.forEach(dot => dot.classList.remove("active"));
      slides[i].style.display = "block";
      dots[i].classList.add("active");
    });
  });

  /* SMOOTH SCROLL FOR NAV LINKS */
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", e => {
      if (link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  /* BUTTON INTERACTIONS */
  const buttons = document.querySelectorAll(".btn, .btn-feature");
  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.05)";
      btn.style.transition = "transform 0.3s ease";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });

  /* CARD HOVER EFFECTS */
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.2)";
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "";
    });
  });

  /* CTA BUTTON SCROLLING */
  const planTripBtn = document.querySelector(".cta-buttons .btn-secondary");
  if (planTripBtn) {
    planTripBtn.addEventListener("click", () => {
      const destinationSection = document.querySelector(".section-padding");
      if (destinationSection) {
        destinationSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /*  MARKETPLACE BUTTON  */
  const marketplaceBtn = document.querySelector(".marketplace-btn");
  if (marketplaceBtn) {
    marketplaceBtn.addEventListener("click", () => {
      alert("Redirecting you to the Marketplace page!");
      window.location.href = "/marketplace.html"; // Change if actual link differs
    });
  }
});


// // script.js
// document.addEventListener('DOMContentLoaded', () => {
//   /**
//    * Main application object to encapsulate all functionalities.
//    */
//   const app = {
//     // Slideshow state
//     slideIndex: 0,
//     slides: null,
//     dots: null,
//     slideshowTimeout: null,

//     /**
//      * Initializes all application components.
//      */
//     init() {
//       this.initRegisterModal();
//       this.initSlideshow();
//       this.initSmoothScroll();
//       this.initHoverEffects();
//       this.initCTAButtons();
//       this.initMarketplaceButton();
//     },

//     /**
//      * Handles the "Register Now" modal functionality.
//      * It shows the modal once per session after a short delay.
//      */
//     initRegisterModal() {
//       const modal = document.getElementById('registerModal');
//       const closeBtn = document.querySelector('.modal .close-button');

//       if (!modal || !closeBtn) return;

//       // Show modal only if it hasn't been shown in the current session
//       if (!sessionStorage.getItem('modalShown')) {
//         setTimeout(() => {
//           modal.style.display = 'block';
//           sessionStorage.setItem('modalShown', 'true');
//         }, 2500); // Show after 2.5 seconds
//       }

//       const closeModal = () => {
//         modal.style.display = 'none';
//       };

//       closeBtn.addEventListener('click', closeModal);

//       // Close modal if user clicks outside the modal content
//       window.addEventListener('click', (event) => {
//         if (event.target === modal) {
//           closeModal();
//         }
//       });
//     },

//     /**
//      * Initializes the hero section slideshow.
//      */
//     initSlideshow() {
//       this.slides = document.querySelectorAll('.mySlides');
//       this.dots = document.querySelectorAll('.dot');

//       if (this.slides.length === 0) return;

//       this.showSlides();
//       this.setupDotNavigation();
//     },

//     /**
//      * Displays the slides in a sequence.
//      */
//     showSlides() {
//       this.slides.forEach(slide => (slide.style.display = 'none'));
//       this.dots.forEach(dot => dot.classList.remove('active'));

//       this.slideIndex++;
//       if (this.slideIndex > this.slides.length) {
//         this.slideIndex = 1;
//       }

//       this.slides[this.slideIndex - 1].style.display = 'block';
//       this.dots[this.slideIndex - 1].classList.add('active');

//       // Clear previous timeout to prevent conflicts with manual navigation
//       clearTimeout(this.slideshowTimeout);
//       this.slideshowTimeout = setTimeout(() => this.showSlides(), 5000); // 5s interval
//     },
    
//     /**
//      * Sets up manual navigation for slideshow using dots.
//      */
//     setupDotNavigation() {
//         this.dots.forEach((dot, i) => {
//             dot.addEventListener('click', () => {
//                 this.slideIndex = i; // Set index to clicked dot's index
//                 this.showSlides(); // Show the corresponding slide
//             });
//         });
//     },

//     /**
//      * Initializes smooth scrolling for anchor links in the navigation.
//      */
//     initSmoothScroll() {
//       document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
//         link.addEventListener('click', e => {
//           e.preventDefault();
//           const targetId = link.getAttribute('href');
//           const targetElement = document.querySelector(targetId);
//           if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth' });
//           }
//         });
//       });
//     },

//     /**
//      * Adds hover effects to buttons and cards.
//      */
//     initHoverEffects() {
//       // Button hover effects
//       const buttons = document.querySelectorAll('.btn, .btn-feature');
//       buttons.forEach(btn => {
//         btn.addEventListener('mouseenter', () => {
//           btn.style.transform = 'scale(1.05)';
//           btn.style.transition = 'transform 0.3s ease';
//         });
//         btn.addEventListener('mouseleave', () => {
//           btn.style.transform = 'scale(1)';
//         });
//       });

//       // Card hover effects
//       const cards = document.querySelectorAll('.card');
//       cards.forEach(card => {
//         card.addEventListener('mouseenter', () => {
//           card.style.transform = 'translateY(-5px)';
//           card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
//           card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
//         });
//         card.addEventListener('mouseleave', () => {
//           card.style.transform = 'translateY(0)';
//           card.style.boxShadow = '';
//         });
//       });
//     },

//     /**
//      * Adds smooth scroll functionality to the "Plan Your Trip" CTA button.
//      */
//     initCTAButtons() {
//       const planTripBtn = document.querySelector('.cta-buttons .btn-secondary');
//       if (planTripBtn) {
//         planTripBtn.addEventListener('click', () => {
//           const destinationSection = document.querySelector('#popular-destinations');
//           if (destinationSection) {
//             destinationSection.scrollIntoView({ behavior: 'smooth' });
//           }
//         });
//       }
//     },
    
//     /**
//      * Handles the click event for the marketplace button.
//      */
//      initMarketplaceButton() {
//         const marketplaceBtn = document.querySelector('.marketplace-btn');
//         if (marketplaceBtn) {
//             marketplaceBtn.addEventListener('click', () => {
//                 alert('Redirecting you to the Marketplace page!');
//                 // Uncomment the line below to enable redirection
//                 // window.location.href = '/marketplace.html';
//             });
//         }
//      },
//   };

//   // Start the application
//   app.init();
// });

// File: script.js

document.addEventListener('DOMContentLoaded', () => {

    /**
     * =================================================================
     * SMOOTH SCROLLING FOR ALL ANCHOR LINKS
     * =================================================================
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Stop the browser's default jump
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /**
     * =================================================================
     * NAVIGATION BAR STYLE ON SCROLL
     * =================================================================
     */
    const nav = document.querySelector('.navigation');
    if (nav) {
        window.addEventListener('scroll', () => {
            // Add 'scrolled' class if user scrolls more than 50px down
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    /**
     * =================================================================
     * MODAL (POP-UP) CONTROLS
     * =================================================================
     */
    const modal = document.getElementById('tripModal');
    const closeModalButton = document.querySelector('.close-button');
    // Select all buttons that should open the modal
    const openModalTriggers = document.querySelectorAll('.btn-outline, .register-btn, .cta-buttons .btn-secondary');

    const openModal = () => modal.style.display = 'block';
    const closeModal = () => modal.style.display = 'none';

    if (modal && closeModalButton && openModalTriggers.length > 0) {
        // Attach click event to all trigger buttons
        openModalTriggers.forEach(trigger => trigger.addEventListener('click', openModal));
        
        // Attach click event to the close (X) button
        closeModalButton.addEventListener('click', closeModal);

        // Close the modal if the user clicks on the dark background
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    /**
     * =================================================================
     * FADE-IN ANIMATIONS ON SCROLL
     * =================================================================
     */
    const sectionsToAnimate = document.querySelectorAll('.card, .feature-list-item, .section-header, .marketplace-content, .marketplace-image-container');

    // Create an observer to watch for when elements enter the screen
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is on screen
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add class to trigger animation
                observer.unobserve(entry.target); // Stop watching it to save resources
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Tell the observer to watch each of the selected sections
    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-in-section'); // Set initial animation state
        observer.observe(section);
    });
});