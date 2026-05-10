// Deepcomet AI Custom Scripts

(function() {
  'use strict';

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Debug: Check if theme toggle exists
  console.log('Theme toggle button:', themeToggle);
  
  // Set initial theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  console.log('Saved theme:', savedTheme);
  html.setAttribute('data-theme', savedTheme);

  // Toggle theme
  if (themeToggle) {
    console.log('Adding click listener to theme toggle');
    themeToggle.addEventListener('click', (e) => {
      console.log('Theme toggle clicked!', e);
      const currentTheme = html.getAttribute('data-theme');
      console.log('Current theme:', currentTheme);
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      console.log('New theme:', newTheme);
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  } else {
    console.log('Theme toggle button not found!');
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Reading progress bar
  const progressBar = document.createElement('div');
  progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(135deg,#667eea,#764ba2);z-index:9999;transition:width 0.1s;';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

})();
