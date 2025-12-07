// XOM3 Documentation - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  initMobileMenu();
  
  // FAQ Accordion
  initFAQAccordion();
  
  // Code Copy Functionality
  initCodeCopy();
  
  // Code Tabs
  initCodeTabs();
  
  // Smooth Scroll for Anchor Links
  initSmoothScroll();
  
  // Active Nav Link
  setActiveNavLink();
  
  // Intersection Observer for Animations
  initScrollAnimations();
});

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuBtn || !navLinks) return;
  
  // Create mobile menu overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  overlay.innerHTML = `
    <div class="mobile-menu-content">
      <button class="mobile-menu-close" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      ${navLinks.innerHTML}
    </div>
  `;
  document.body.appendChild(overlay);
  
  // Add styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(5, 5, 8, 0.95);
      backdrop-filter: blur(20px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .mobile-menu-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .mobile-menu-content {
      text-align: center;
    }
    .mobile-menu-content ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .mobile-menu-content a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    .mobile-menu-content a:hover,
    .mobile-menu-content a.active {
      color: #00D9FF;
    }
    .mobile-menu-content .nav-cta {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.75rem 2rem;
      background: linear-gradient(135deg, #00D9FF, #7C3AED);
      border-radius: 8px;
      color: #050508 !important;
      font-weight: 600;
    }
    .mobile-menu-close {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
    }
    .mobile-menu-close svg {
      width: 28px;
      height: 28px;
    }
  `;
  document.head.appendChild(style);
  
  // Toggle menu
  menuBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close menu
  const closeBtn = overlay.querySelector('.mobile-menu-close');
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Close on link click
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// FAQ Accordion
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

// Code Copy
function initCodeCopy() {
  const copyButtons = document.querySelectorAll('.code-copy');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock.querySelector('pre code, pre');
      const text = code.textContent;
      
      try {
        await navigator.clipboard.writeText(text);
        
        // Visual feedback
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = '#00D9FF';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        btn.textContent = 'Failed';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      }
    });
  });
}

// Code Tabs
function initCodeTabs() {
  const tabContainers = document.querySelectorAll('.code-tabs');
  
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.code-tab');
    const panels = container.querySelectorAll('.code-panel');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update panels
        panels.forEach(p => p.classList.remove('active'));
        panels[index].classList.add('active');
      });
    });
  });
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL
        history.pushState(null, null, href);
      }
    });
  });
}

// Active Nav Link
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Handle home page
    if (currentPath === '/' && href === '/') {
      link.classList.add('active');
    }
    // Handle other pages
    else if (href !== '/' && currentPath.includes(href)) {
      link.classList.add('active');
    } else if (link.classList.contains('active') && href !== currentPath && currentPath !== '/') {
      link.classList.remove('active');
    }
  });
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // Observe cards and sections
  document.querySelectorAll('.card, .pricing-card, .faq-item').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// Utility: Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Utility: Throttle
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Handle scroll for nav background
window.addEventListener('scroll', throttle(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(5, 5, 8, 0.95)';
  } else {
    nav.style.background = 'rgba(5, 5, 8, 0.8)';
  }
}, 100));
