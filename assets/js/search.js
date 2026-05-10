// Deepcomet AI Search Functionality

(function() {
  'use strict';

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

})();
