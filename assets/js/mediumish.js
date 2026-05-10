// Mediumish Theme Core JS
// Handles navbar scroll behavior and basic interactions

(function($) {
  "use strict";

  // Navbar hide/show on scroll
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('.navbar').outerHeight();

  $(window).scroll(function() {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(window).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta) return;

    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('.navbar').removeClass('nav-down').addClass('nav-up');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('.navbar').removeClass('nav-up').addClass('nav-down');
      }
    }

    lastScrollTop = st;
  }

  // Ensure navbar is visible on page load
  $('.navbar').addClass('nav-down');

})(jQuery);
