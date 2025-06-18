// JavaScript for Vrindavan Residency Website

// Sticky header functionality
window.addEventListener('scroll', function() {
  const header = document.getElementById('main-header');
  if (header && window.scrollY > 50) {
    header.classList.add('scrolled');
  } else if (header) {
    header.classList.remove('scrolled');
  }
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Show/hide scroll to top button based on scroll position
if (scrollTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  // Scroll to top when button is clicked
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ----- TESTIMONIAL CAROUSEL FUNCTIONALITY ----- //
let currentSlide = 0;
let slides, dots, testimonialCarousel, testimonialSlidesContainer;
let carouselInterval;
const slideDuration = 8000; // 8 seconds per testimonial

// Adjust the container height to match the active slide
function adjustSlideHeight() {
  if (!slides || !testimonialSlidesContainer) return;
  
  const activeSlide = slides[currentSlide];
  if (activeSlide) {
    const activeSlideHeight = activeSlide.offsetHeight;
    testimonialSlidesContainer.style.height = `${activeSlideHeight}px`;
  }
}

// Show specific slide by index
function showSlide(index) {
  if (!slides || !dots) return;
  
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
    slide.style.position = 'absolute';
    slide.style.visibility = 'hidden';
    slide.style.opacity = '0';
  });

  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  // Show the current slide and activate corresponding dot
  slides[index].classList.add('active');
  slides[index].style.position = 'relative';
  slides[index].style.visibility = 'visible';
  slides[index].style.opacity = '1';
  dots[index].classList.add('active');
  
  // Adjust the container height
  setTimeout(adjustSlideHeight, 50);
}

// Next slide function
function nextSlide() {
  if (!slides) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Previous slide function
function prevSlide() {
  if (!slides) return;
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Start the auto-play carousel
function startCarousel() {
  clearInterval(carouselInterval); // Clear any existing interval
  carouselInterval = setInterval(nextSlide, slideDuration);
}

// Stop the auto-play carousel
function stopCarousel() {
  clearInterval(carouselInterval);
}

// Touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].screenX;
  handleGesture();
}

function handleGesture() {
  if (touchEndX < touchStartX - 50) {
    // Swiped left, go to next slide
    nextSlide();
    stopCarousel();
    startCarousel();
  } else if (touchEndX > touchStartX + 50) {
    // Swiped right, go to previous slide
    prevSlide();
    stopCarousel();
    startCarousel();
  }
}

// Initialize testimonial carousel when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize testimonial carousel
  slides = document.querySelectorAll('.testimonial-slides .review');
  dots = document.querySelectorAll('.carousel-dots .dot');
  testimonialCarousel = document.querySelector('.testimonial-carousel');
  testimonialSlidesContainer = document.querySelector('.testimonial-slides');
  
  if (slides.length > 0 && testimonialSlidesContainer) {
    // Set up initial slide
    showSlide(currentSlide);
    
    // Window resize event to adjust height
    window.addEventListener('resize', adjustSlideHeight);
    
    // Add event listeners to carousel controls if they exist
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        nextSlide();
        stopCarousel();
        startCarousel();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        prevSlide();
        stopCarousel();
        startCarousel();
      });
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopCarousel();
        startCarousel();
      });
    });
    
    // Touch support for mobile swipe
    if (testimonialCarousel) {
      testimonialCarousel.addEventListener('touchstart', handleTouchStart, false);
      testimonialCarousel.addEventListener('touchend', handleTouchEnd, false);
      
      // Pause auto-play when hovering over the carousel
      testimonialCarousel.addEventListener('mouseenter', stopCarousel);
      
      // Resume auto-play when mouse leaves the carousel
      testimonialCarousel.addEventListener('mouseleave', startCarousel);
    }
    
    // Start the carousel
    startCarousel();
  }
  
  // Image gallery lightbox effect
  document.addEventListener('DOMContentLoaded', function() {
    // Only select visible images for click event
    function updateGalleryImageClicks() {
      const galleryImages = document.querySelectorAll('.gallery-images img');
      galleryImages.forEach(image => {
        // Remove previous click handlers to avoid duplicates
        image.replaceWith(image.cloneNode(true));
      });
      // Re-select after cloning
      const newGalleryImages = document.querySelectorAll('.gallery-images img');
      newGalleryImages.forEach(image => {
        if (image.style.display !== 'none') {
          image.addEventListener('click', function() {
            window.open(this.src, '_blank');
          });
        }
      });
    }

    // Initial setup
    updateGalleryImageClicks();

    // Update click events after filtering
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        setTimeout(updateGalleryImageClicks, 100); // Wait for filter to apply
      });
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Room category carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const roomCategories = document.querySelectorAll('.room-category');
  
  roomCategories.forEach((category, categoryIndex) => {
    const slides = category.querySelectorAll('.room-slide');
    const prevBtn = category.querySelector('.room-prev-btn');
    const nextBtn = category.querySelector('.room-next-btn');
    let currentSlide = 0;
    let prevSlideIndex = null;

    function showRoomSlide(index, direction = 1) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        slide.style.transition = '';
        if (i === index) {
          slide.classList.add('active');
          slide.style.left = '0';
        } else if (i === prevSlideIndex) {
          slide.classList.add('prev');
          slide.style.left = direction > 0 ? '-100%' : '100%';
        } else {
          slide.style.left = direction > 0 ? '100%' : '-100%';
        }
      });
      prevSlideIndex = index;
    }

    function nextRoomSlide() {
      let nextIndex = (currentSlide + 1) % slides.length;
      showRoomSlide(nextIndex, 1);
      currentSlide = nextIndex;
    }

    function prevRoomSlide() {
      let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showRoomSlide(prevIndex, -1);
      currentSlide = prevIndex;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', nextRoomSlide);
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', prevRoomSlide);
    }

    // Open image in new tab on click
    slides.forEach(slide => {
      slide.style.cursor = 'pointer';
      slide.addEventListener('click', function() {
        if (this.classList.contains('active')) {
          window.open(this.src, '_blank');
        }
      });
    });

    // Initial display
    showRoomSlide(currentSlide);

    // Auto-advance room slides every 8 seconds
    setInterval(nextRoomSlide, 8000);
  });
});

// Gallery category filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryImages = document.querySelectorAll('.gallery-images img');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      galleryImages.forEach(img => {
        if (filter === 'all' || img.getAttribute('data-category') === filter) {
          img.style.display = '';
        } else {
          img.style.display = 'none';
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const attractionContainer = document.querySelector('.attraction-carousel-container');
  if (!attractionContainer) return;
  const slides = attractionContainer.querySelectorAll('.attraction-item');
  const prevBtn = attractionContainer.querySelector('.attraction-prev-btn');
  const nextBtn = attractionContainer.querySelector('.attraction-next-btn');
  let currentSlide = 0;

  function showAttractionSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextAttractionSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showAttractionSlide(currentSlide);
  }

  function prevAttractionSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showAttractionSlide(currentSlide);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextAttractionSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevAttractionSlide);

  // Optional: auto-advance every 8 seconds
  setInterval(nextAttractionSlide, 8000);

  // Initial display
  showAttractionSlide(currentSlide);
});


