// main.js
// Smooth scroll-based fade-in animations with IntersectionObserver
document.addEventListener('DOMContentLoaded', function() {
  
  // Configuration
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Create observer
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class when element comes into view
        if (!entry.target.classList.contains('fade-in-up')) {
          entry.target.classList.add('fade-in-up');
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe all sections and cards that should animate
  const animatedElements = document.querySelectorAll('.sec, .section, .fade-in-up, .card, .blog, .founder__photo');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Smooth hover effects for links
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'color 0.3s ease, text-decoration 0.3s ease';
    });
  });

  // Form interaction
  const form = document.querySelector('.form');
  if (form) {
    const inputs = form.querySelectorAll('.inp, .ta');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.style.transition = 'all 0.3s ease';
      });
    });
  }

  // Navbar scroll effect
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 10) {
        nav.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.12)';
      } else {
        nav.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.06)';
      }
      
      lastScroll = currentScroll;
    });
  }

  // Button ripple effect on click
  const buttons = document.querySelectorAll('.btn, .btn-sm, .btn-send');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'rippleEffect 0.6s ease-out';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);