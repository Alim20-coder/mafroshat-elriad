/**
 * مفروشات الرياض - حراج بن قاسم
 * Javascript Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40
    });
  }

  // 2. Set Current Year in Footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 3. Navbar Sticky Effect and Active Link on Scroll
  const navbar = document.querySelector('.navbar-custom');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar style change
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }

    // Update active nav links based on scroll position
    updateActiveNavLink();
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Smooth scrolling for nav links & mobile menu collapse
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .footer-links a');
  const navbarCollapse = document.getElementById('navbarContent');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });

          // Close mobile menu if open
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      }
    });
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 5. Animated Number Counters
  const counters = document.querySelectorAll('.counter');
  let hasAnimatedCounters = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // ms
      const increment = target / (duration / 25);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current).toLocaleString('en-US');
          setTimeout(updateCounter, 25);
        } else {
          counter.textContent = target.toLocaleString('en-US');
        }
      };

      updateCounter();
    });
  };

  // Trigger counters with IntersectionObserver
  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedCounters) {
          animateCounters();
          hasAnimatedCounters = true;
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // 6. Image Lightbox Modal Handler
  const imageModal = document.getElementById('imageModal');
  if (imageModal) {
    imageModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      if (!button) return;

      const imgSrc = button.getAttribute('data-src');
      const imgTitle = button.getAttribute('data-title') || 'معاينة الموديل';

      const modalImg = document.getElementById('modalImageSrc');
      const modalTitle = document.getElementById('modalImageTitle');
      const modalOrderBtn = document.getElementById('modalOrderBtn');

      if (modalImg) modalImg.src = imgSrc;
      if (modalTitle) modalTitle.textContent = imgTitle;

      if (modalOrderBtn) {
        modalOrderBtn.href = `https://wa.me/966565564315?text=${encodeURIComponent('السلام عليكم أرغب في طلب هذا الموديل: ' + imgTitle)}`;
      }
    });
  }

  // 7. Quick Booking / Contact Form to WhatsApp
  const quickContactForm = document.getElementById('quickContactForm');
  if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const city = document.getElementById('userCity').value;
      const service = document.getElementById('userService').value;
      const notes = document.getElementById('userNotes').value.trim();

      const message = `طلب جديد من الموقع الإلكتروني:\n- الاسم: ${name}\n- الجوال: ${phone}\n- المنطقة/المدينة: ${city}\n- الخدمة المطلوبة: ${service}\n- تفاصيل إضافية: ${notes || 'لا يوجد'}`;

      window.open(`https://wa.me/966565564315?text=${encodeURIComponent(message)}`, '_blank');
    });
  }
});
