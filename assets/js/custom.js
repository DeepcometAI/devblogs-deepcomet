// Deepcomet AI Custom Scripts

(function() {
  'use strict';

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Set initial theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Search functionality
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Debug: Check if elements exist
  console.log('Search button:', searchBtn);
  console.log('Search modal:', searchModal);
  console.log('Search close:', searchClose);
  console.log('Search input:', searchInput);
  console.log('Search results:', searchResults);

  // Open search modal
  if (searchBtn) {
    console.log('Adding click listener to search button');
    searchBtn.addEventListener('click', (e) => {
      console.log('Search button clicked!', e);
      e.preventDefault();
      e.stopPropagation();
      if (searchModal) {
        searchModal.style.display = 'flex';
        if (searchInput) searchInput.focus();
      }
    });
  } else {
    console.log('Search button not found!');
  }

  // Close search modal
  if (searchClose) {
    searchClose.addEventListener('click', () => {
      if (searchModal) {
        searchModal.style.display = 'none';
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
      }
    });
  }

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal && searchModal.style.display === 'flex') {
      searchModal.style.display = 'none';
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
    }
  });

  // Close on background click
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.style.display = 'none';
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
      }
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      
      if (query.length < 2) {
        if (searchResults) searchResults.innerHTML = '';
        return;
      }

      // Simple search through page content
      const allPosts = document.querySelectorAll('.blog-card, .archive-item');
      const results = [];
      
      allPosts.forEach(post => {
        const title = post.querySelector('.card-title a, .archive-title a');
        const content = post.querySelector('.card-excerpt, .archive-excerpt');
        
        if (title && content) {
          const titleText = title.textContent.toLowerCase();
          const contentText = content.textContent.toLowerCase();
          
          if (titleText.includes(query) || contentText.includes(query)) {
            results.push({
              title: title.textContent,
              url: title.href,
              excerpt: content.textContent.substring(0, 150) + '...'
            });
          }
        }
      });

      displaySearchResults(results, query);
    });
  }

  function displaySearchResults(results, query) {
    if (!searchResults) return;
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No posts found</div>';
      return;
    }

    const resultsHtml = results.map(post => {
      const title = highlightText(post.title, query);
      const highlightedDesc = highlightText(post.excerpt, query);
      
      return `
        <div class="search-result-item">
          <h4><a href="${post.url}">${title}</a></h4>
          <p class="search-result-excerpt">${highlightedDesc}</p>
        </div>
      `;
    }).join('');

    searchResults.innerHTML = resultsHtml;
  }

  function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
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
