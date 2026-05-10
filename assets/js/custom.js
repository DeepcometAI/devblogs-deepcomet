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

  // Build search index from page content
  const posts = [
    {% for post in site.posts %}
    {
      title: {{ post.title | jsonify }},
      url: {{ post.url | relative_url | jsonify }},
      content: {{ post.content | strip_html | strip_newlines | jsonify }},
      date: {{ post.date | date: "%Y-%m-%d" | jsonify }},
      description: {{ post.description | jsonify }}
    },
    {% endfor %}
  ];

  // Open search modal
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchModal.style.display = 'flex';
      searchInput.focus();
    });
  }

  // Close search modal
  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchModal.style.display = 'none';
      searchInput.value = '';
      searchResults.innerHTML = '';
    });
  }

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.style.display === 'flex') {
      searchModal.style.display = 'none';
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });

  // Close on background click
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.style.display = 'none';
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }

      const results = posts.filter(post => {
        return post.title.toLowerCase().includes(query) ||
               post.content.toLowerCase().includes(query) ||
               (post.description && post.description.toLowerCase().includes(query));
      });

      displaySearchResults(results, query);
    });
  }

  function displaySearchResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No posts found</div>';
      return;
    }

    const resultsHtml = results.map(post => {
      const title = highlightText(post.title, query);
      const description = post.description || post.content.substring(0, 150) + '...';
      const highlightedDesc = highlightText(description, query);
      
      return `
        <div class="search-result-item">
          <h4><a href="${post.url}">${title}</a></h4>
          <p class="search-result-date">${post.date}</p>
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
