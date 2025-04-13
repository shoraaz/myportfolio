;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else if ( effect === 'zoomIn') {
								el.addClass('zoomIn animated-fast');
							} else if ( effect === 'bounceIn') {
								el.addClass('bounceIn animated-fast');
							} else if ( effect === 'flipInX') {
								el.addClass('flipInX animated-fast');
							} else if ( effect === 'slideInUp') {
								el.addClass('slideInUp animated-fast');
							} else if ( effect === 'rotateIn') {
								el.addClass('rotateIn animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%', handler: function(direction) {
            // Fix for elements disappearing when scrolling back up
            if (direction === 'up') {
                $(this.element).addClass('animated-fast');
            }
        } });
	};

	// Animate navbar items sequentially
	var animateNavItems = function() {
		$('.navbar-nav li').each(function(i) {
			var $this = $(this);
			setTimeout(function() {
				$this.addClass('animated fadeInDown');
			}, i * 200);
		});
	};

	// Text typing effect
	var typingEffect = function() {
		if ($('#typing-text').length > 0) {
			var typed = new Typed('#typing-text', {
				strings: ['Data Scientist', 'Machine Learning Enthusiast', 'Generative AI Developer', 'NLP Practitioner'],
				typeSpeed: 70,
				backSpeed: 40,
				backDelay: 2000,
				loop: true
			});
		}
	};

	// Counter animation
	var counterWayPoint = function() {
		if ($('.counter').length > 0) {
			$('.counter').waypoint(function(direction) {
				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(function() {
						$('.counter').each(function() {
							var $this = $(this);
							$({ counter: 0 }).animate({ counter: $this.text() }, {
								duration: 2000,
								easing: 'swing',
								step: function() {
									$this.text(Math.ceil(this.counter));
								}
							});
						});
					}, 200);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}
	};

	// Scroll reveal for timeline items
	var timelineAnimation = function() {
		$('.timeline > li').each(function() {
			$(this).waypoint(function(direction) {
				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					if ($(this.element).hasClass('timeline-inverted')) {
						$(this.element).addClass('animated fadeInLeft');
					} else {
						$(this.element).addClass('animated fadeInRight');
					}
					// Fix for disappearing elements when scrolling back up
					if (direction === 'up') {
						$(this.element).addClass('animated');
					}
				}
			}, { offset: '90%' });
		});
	};

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#4A6FE3', // Changed from #FF9000 to match new color scheme
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1500
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};

	// Animated progress bars
	var progressWayPoint = function() {
		if ($('.progress-wrap').length > 0) {
			$('.progress-wrap').waypoint(function(direction) {
				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					var progressBar = $('.progress-wrap .progress-bar');
					progressBar.each(function() {
						var $this = $(this);
						$this.css('width', $this.attr('aria-valuenow') + '%');
						$this.addClass('animated slideInLeft');
					});
					$(this.element).addClass('animated');
					// Fix for disappearing progress bars when scrolling back up
					if (direction === 'up') {
						$(this.element).addClass('animated');
					}
				}
			}, { offset: '90%' });
		}
	};

	// Reveal cards one by one
	var revealCards = function() {
		$('.project, .fh5co-blog, .work').each(function(i) {
			var $this = $(this);
			$this.waypoint(function(direction) {
				if (direction === 'down' && !$this.hasClass('animated')) {
					setTimeout(function() {
						$this.addClass('animated fadeIn');
					}, i * 300);
					// Fix for disappearing cards when scrolling back up
					if (direction === 'up' && !$this.hasClass('animated')) {
						$this.addClass('animated fadeIn');
					}
				}
			}, { offset: '90%' });
		});
	};

	// Animate feature icons
	var animateFeatures = function() {
		$('.feature-left .icon').each(function(i) {
			var $this = $(this);
			$this.waypoint(function(direction) {
				if (direction === 'down' && !$this.hasClass('animated')) {
					setTimeout(function() {
						$this.addClass('animated pulse');
					}, i * 200);
				}
			}, { offset: '90%' });
		});
	};

	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	// Dark mode toggle
	var toggleDarkMode = function() {
		var darkModeToggle = document.getElementById('dark-mode-toggle');
		
		// Check if there's a saved preference
		const savedDarkMode = localStorage.getItem('darkMode') === 'true';
		
		// Set initial state
		if (savedDarkMode) {
			document.body.classList.add('dark-mode');
			darkModeToggle.checked = true;
		}
		
		// Toggle dark mode when the checkbox is clicked
		if (darkModeToggle) {
			darkModeToggle.addEventListener('change', function() {
				if (this.checked) {
					document.body.classList.add('dark-mode');
					localStorage.setItem('darkMode', 'true');
				} else {
					document.body.classList.remove('dark-mode');
					localStorage.setItem('darkMode', 'false');
				}
			});
		}
	};

	// Force dark mode on page load
	var forceDarkMode = function() {
		document.body.classList.add('dark-mode');
	};
	
	// Navigation bar effects on scroll
	var navbarScroll = function() {
		var navbar = $('#fh5co-nav');
		var offset = 200;
		
		$(window).scroll(function() {
			if ($(window).scrollTop() > offset) {
				navbar.removeClass('transparent').addClass('scrolled');
			} else {
				navbar.removeClass('scrolled').addClass('transparent');
			}
		});
		
		// Set initial state
		if ($(window).scrollTop() > offset) {
			navbar.removeClass('transparent').addClass('scrolled');
		} else {
			navbar.addClass('transparent');
		}
	};
	
	// Smooth scrolling for navigation links
	var smoothScroll = function() {
		$('.nav-link').on('click', function(event) {
			event.preventDefault();
			var hash = this.hash;
			
			$('html, body').animate({
				scrollTop: $(hash).offset().top - 70
			}, 800, 'easeInOutExpo');
		});
	};

	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		skillsWayPoint();
		timelineAnimation();
		progressWayPoint();
		revealCards();
		animateFeatures();
		counterWayPoint();
		// Activate typing effect only if the Typed.js library is loaded
		if (typeof Typed !== 'undefined') {
			typingEffect();
		}
		// Add new functions
		toggleDarkMode();
		forceDarkMode();
		navbarScroll();
		smoothScroll();
	});


}());