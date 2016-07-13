;(function( $ ) {
	"use strict";

	$( document ).on( 'ready', function() {

		var $window = $( window ),
			$body = $( 'body' ),
			$document = $( document ),
			trade = {
				headerFloatingHeight : 60,
			};

		/**
		 * =======================================
		 * Function: Detect Mobile Device
		 * =======================================
		 */
		var isMobile = {
			Android: function() {
				return navigator.userAgent.match( /Android/i );
			},
			BlackBerry: function() {
				return navigator.userAgent.match( /BlackBerry/i );
			},
			iOS: function() {
				return navigator.userAgent.match( /iPhone|iPad|iPod/i );
			},
			Opera: function() {
				return navigator.userAgent.match( /Opera Mini/i );
			},
			Windows: function() {
				return navigator.userAgent.match( /IEMobile/i );
			},
			any: function() {
				return ( isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() );
			},
		};

		/**
		 * =======================================
		 * Function: Resize Background
		 * =======================================
		 */
		var resizeBackground = function() {

			$( '.section-background-video > video, .section-background-image > img, .two-cols-description-image > img' ).each(function( i, el ) {

				var $el       = $( el ),
					$section  = $el.parent(),
					min_w     = 300,
					el_w      = el.tagName == 'VIDEO' ? el.videoWidth : el.naturalWidth,
					el_h      = el.tagName == 'VIDEO' ? el.videoHeight : el.naturalHeight,
					section_w = $section.outerWidth(),
					section_h = $section.outerHeight(),
					scale_w   = section_w / el_w,
					scale_h   = section_h / el_h,
					scale     = scale_w > scale_h ? scale_w : scale_h,
					new_el_w, new_el_h, offet_top, offet_left;

				if ( scale * el_w < min_w ) {
					scale = min_w / el_w;
				};

				new_el_w = scale * el_w;
				new_el_h = scale * el_h;
				offet_left = ( new_el_w - section_w ) / 2 * -1;
				offet_top  = ( new_el_h - section_h ) / 2 * -1;

				$el.css( 'width', new_el_w );
				$el.css( 'height', new_el_h );
				$el.css( 'marginTop', offet_top );
				$el.css( 'marginLeft', offet_left );
			});

		};
		$body.on( 'pageStart', function() {
			resizeBackground();
		});

		/**
		 * =======================================
		 * IE9 Placeholder
		 * =======================================
		 */
		$( 'form' ).on( 'submit', function() {
			$( this ).find( '[placeholder]' ).each(function() {
				var $input = $( this );
				if ( $input.val() == $input.attr( 'placeholder' ) ) {
					$input.val( '' );
				};
			});
		});

		$( '[placeholder]' ).on( 'focus', function() {
			var $input = $( this );
			if ( $input.val() == $input.attr( 'placeholder' ) ) {
				$input.val( '' );
				$input.removeClass( 'placeholder' );
			};
		}).on( 'blur', function() {
			var $input = $( this );
			if ( $input.val() == '' || $input.val() == $input.attr( 'placeholder' ) ) {
				$input.addClass( 'placeholder' );
				$input.val( $input.attr( 'placeholder' ) );
			};
		}).blur();

		/**
		 * =======================================
		 * Detect Mobile Device
		 * =======================================
		 */
		if ( isMobile.any() ) {
			// add identifier class to <body>
			$body.addClass( 'mobile-device' );
			// remove all element with class "remove-on-mobile-device"
			$( '.remove-on-mobile-device' ).remove();
		};

		/* =======================================
		 * Resize Video Background
		 * =======================================
		 */
		$window.on( 'resize', function() {
			resizeBackground();
		});

		/* =======================================
		 * Slideshow Background
		 * =======================================
		 */
		 
		if ( $.fn.responsiveSlides ) {
			$body.on( 'pageStart', function() {
				$( '.section-background-slideshow' ).responsiveSlides({
					speed : $( this ).data( 'speed' ) ? $( this ).data( 'speed' ) : 1500,
					timeout : $( this ).data( 'timeout' ) ? $( this ).data( 'timeout' ) : 7000,
					pauseControls: true,
					nav: true,
				});
			});
		};

		/* =======================================
		 * Testimonial Slider
		 * =======================================
		 */
		if ( $.fn.responsiveSlides ) {
			$body.on( 'pageStart', function() {
				$( '.testimonial-slider' ).responsiveSlides({
					speed : $( this ).data( 'speed' ) ? $( this ).data( 'speed' ) : 800,
					timeout : $( this ).data( 'timeout' ) ? $( this ).data( 'timeout' ) : 4000,
					auto : $( this ).data( 'auto' ) ? $( this ).data( 'auto' ) : false,
					pager : true,
				});
			});
		};

		/* =======================================
		 * Hero Slider
		 * =======================================
		 */
		if ( $.fn.responsiveSlides ) {
			$body.on( 'pageStart', function() {
				$( '.section-slider' ).responsiveSlides({
					speed : $( this ).data( 'speed' ) ? $( this ).data( 'speed' ) : 1600,
					timeout : $( this ).data( 'timeout' ) ? $( this ).data( 'timeout' ) : 4000,
					auto : $( this ).data( 'auto' ) ? $( this ).data( 'auto' ) : false,
					nav : true,
				});
			});
		};

		/* =======================================
		 * Video Embed Async Load
		 * =======================================
		 */
		$body.on( 'pageStart', function() {
			$( '.video-async' ).each( function( i, el ) {
				var $el = $( el ),
					source = $el.data( 'source' ),
					video = $el.data( 'video' ),
					color = $el.data( 'color' );

				if ( source == 'vimeo' ) {
					$el.attr( 'src', '//player.vimeo.com/video/' + video + ( color ? '?color=' + color : '' ) );
				} else if ( source == 'youtube' ) {
					$el.attr( 'src', '//www.youtube.com/embed/' + video + '?rel=0' );
				}

			});
		});
		
		/**
		 * =======================================
		 * Initiate Stellar JS
		 * =======================================
		 */
		if ( $.fn.stellar && ! isMobile.any() ) {
			$.stellar({
				responsive: true,
				horizontalScrolling: false,
				hideDistantElements: false,
				verticalOffset: 0,
				horizontalOffset: 0,
			});
		};

		/**
		 * =======================================
		 * Numbers (Counter Up)
		 * =======================================
		 */
		if ( $.fn.counterUp ) {
			$( '.counter-up' ).counterUp({
				time: 1000,
			});
		};

		/**
		 * =======================================
		 * Scroll Spy
		 * =======================================
		 */
		var toggleHeaderFloating = function() {
			// Floating Header
			if ( $window.scrollTop() > 80 ) {
				$( '.header-section' ).addClass( 'floating' );
			} else {
				$( '.header-section' ).removeClass( 'floating' );
			};
		};

		$window.on( 'scroll', toggleHeaderFloating );

		/**
		 * =======================================
		 * One Page Navigation
		 * =======================================
		 */
		if ( $.fn.onePageNav ) {
			$( '#header-nav' ).onePageNav({
				scrollSpeed : 1000,
				filter : ':not(.external)',
				begin : function() {
					$( '#navigation' ).collapse( 'toggle' );
				},
			});
		};

		/**
		 * =======================================
		 * Animations
		 * =======================================
		 */
		if ( $body.hasClass( 'enable-animations' ) && ! isMobile.any() ) {
			var $elements = $( '*[data-animation]' );

			$elements.each( function( i, el ) {

				var $el = $( el ),
					animationClass = $el.data( 'animation' );

				$el.addClass( animationClass );
				$el.addClass( 'animated' );
				$el.addClass( 'wait-animation' );

				$el.one( 'inview', function() {
					$el.removeClass( 'wait-animation' );
					$el.addClass( 'done-animation' );
				});
			});
		};

		/**
		 * =======================================
		 * Anchor Link
		 * =======================================
		 */
		$body.on( 'click', 'a.anchor-link', function( e ) {
			e.preventDefault();

			var $a = $( this ),
				$target = $( $a.attr( 'href' ) );

			if ( $target.length < 1 ) return;

			$( 'html, body' ).animate({ scrollTop: Math.max( 0, $target.offset().top - trade.headerFloatingHeight ) }, 1000 );
		});

		/**
		 * =======================================
		 * Google Maps
		 * =======================================
		 */
		if ( typeof Maplace == 'function' && $( '#gmap' ) ) {
			new Maplace( gmap_options ).Load();
		};

		/**
		 * =======================================
		 * Countdown
		 * =======================================
		 */
		if ( $.fn.countdown ) {
			$( '.countdown' ).each( function( i, el ) {
				var $el = $ ( el ),
					date = $el.data( 'countdown' ),
					format = $el.html();

				$el.countdown( date, function( e ) {
					$( el ).html( e.strftime( format ) );
				});
				$el.show();
			});
		};

		/**
		 * =======================================
		 * Form AJAX
		 * =======================================
		 */
		$( 'form' ).each( function( i, el ) {

			var $el = $( this );

			if ( $el.hasClass( 'form-ajax-submit' ) ) {

				$el.on( 'submit', function( e ) {
					e.preventDefault();

					var $alert = $el.find( '.form-validation' ),
						$submit = $el.find( 'button' ),
						action = $el.attr( 'action' );

					// button loading
					$submit.button( 'loading' );

					// reset alert
					$alert.removeClass( 'alert-danger alert-success' );
					$alert.html( '' );

					$.ajax({
						type     : 'POST',
						url      : action,
						data     : $el.serialize() + '&ajax=1',
						dataType : 'JSON',
						success  : function( response ) {

							// custom callback
							$el.trigger( 'form-ajax-response', response );
							
							// error
							if ( response.error ) {
								$alert.html( response.message );
								$alert.addClass( 'alert-danger' ).fadeIn( 500 );
							}
							// success
							else {
								$el.trigger( 'reset' );
								$alert.html( response.message );
								$alert.addClass( 'alert-success' ).fadeIn( 500 );
							}

							// reset button
							$submit.button( 'reset' );
						},
					})
				});
			};
		});
		
		/* =======================================
		 * Back To Top
		 * =======================================
		 */
		// browser window scroll (in pixels) after which the "back to top" link is shown
		var offset = 300,
			//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
			offset_opacity = 1200,
			//duration of the top scrolling animation (in ms)
			scroll_top_duration = 700,
			//grab the "back to top" link
			$back_to_top = $('.cd-top');

		//hide or show the "back to top" link
		$(window).scroll(function(){
			( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
			if( $(this).scrollTop() > offset_opacity ) { 
				$back_to_top.addClass('cd-fade-out');
			}
		});


		/* =======================================
		 * Preloader
		 * =======================================
		 */
		if ( $.fn.jpreLoader && $body.hasClass( 'enable-preloader' ) ) {

			$body.on( 'pageStart', function() {
				$body.addClass( 'done-preloader' );
			});

			$body.jpreLoader({
				showSplash : false,
				// autoClose : false,
			}, function() {
				$body.trigger( 'pageStart' );
			});

		} else {
			$body.trigger( 'pageStart' );
		};

		$window.trigger( 'resize' );
		$window.trigger( 'scroll' );
		
		
		/* =======================================
		 * Subscription
		 * =======================================
		 */
		 var billing = document.getElementById('switchBilling');
		 billing.onclick = function(){
			var type = document.getElementById('bill');
			var plan = document.getElementById('priceplan');
			var button = document.getElementById('subscribe');
			if(type.innerHTML.indexOf('Annual') != -1){
				plan.innerHTML = 'Billed Yearly (Save 17%!)';
				document.getElementsByClassName('price-number')[0].innerHTML = '50';
				type.innerHTML = 'Switch to monthly';
				$("#buy").text("Join Now");
			}
			else{
				plan.innerHTML = 'Billed Monthly';
				document.getElementsByClassName('price-number')[0].innerHTML = '5';
				type.innerHTML = 'Switch to Annual';
				$("#buy").text("Join Free for 60 Days");
			}
		 }
		 
		 /* =======================================
		 * Misc
		 * =======================================
		 */
		$(".hero-start-link").click(function(){
			$(".hero-start-link").removeClass("infinite");
		});

	});

})( jQuery );