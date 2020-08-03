window.theme = window.theme || {};

/** custompopup **/

theme.customPopup = new function() {

  // init default settings
  var settings = {
    popup: '[data-popup]',
    popupOverlay : '[data-popup-overlay]',
    openPopupSelector : '[data-popup-open]',
    closePopupSelector : '[data-popup-close]'
  };

  function customPopup() {

    console.log("popup code");

    $(settings.openPopupSelector).on('click', function(e) {
      console.log("popup click");
      e.preventDefault();
      return openPopup();
    });

    $(settings.closePopupSelector).on('click', function() {
      closePopup();
    });

  }

  function openPopup() {
    $(settings.popup).fadeIn(200);
    $(settings.popupOverlay).fadeIn(200);
    return false;
  }

  function closePopup() {
    $(settings.popup).fadeOut(200);
    $(settings.popupOverlay).fadeOut(200);
  }

  return customPopup;
}

var customPopup = new theme.customPopup();



/** animation **/


theme.animationScroll = new function() {

  function animationScroll(settings) {
    // init var
    var currentPos = 0;
    var windowHeight = 0;
    var windowBottom = 0;

    console.log($(settings.animationSelector));
    var objectPos = $(settings.animationSelector).offset().top;
    var parentPos = $(settings.parentSelector).offset().top;

    $(window).on('scroll', function() {
      // windows var
      currentPos = $(window).scrollTop();
      windowHeight = $(window).height();
      windowBottom = currentPos + windowHeight;

      if (windowBottom > parentPos) {
        console.log(windowBottom - parentPos);
        $(settings.animationSelector).css('bottom', windowBottom - parentPos + 'px');
      }

    });

  }


  return animationScroll;
}

var animationSettings = {
  animationSelector: '[data-animation]',
  parentSelector : '.home-custom-reviews'
};

if ($('body').hasClass('template-index')) {
  var animationScroll = new theme.animationScroll(animationSettings);
}


/** description swatch **/


theme.descriptionSwatch = new function() {

  function descriptionSwatch() {
    $('[data-input-swatch]').on('click', function() {
      var newColor = $(this).val();
      console.log(newColor);
      var newDesc = $('[data-color="' + newColor + '"]').html();
      $('[data-variant-description]').html(newDesc);
    });
  }

  return descriptionSwatch;
}

var descriptionSwatch = new theme.descriptionSwatch();



/**************************
  SLICK WRAPPER
***************************/


theme.slickCustom = new function() {

  var $carousel;

  function slickCustom(selector, selectorData) {

    // init default settings
    var settings = {
      selector: '[data-slick-slider]',
      selectorData : 'slick-slider'
    };

    if (selector && selectorData) {
      settings.selector = selector;
      settings.selectorData = selectorData;
    }

    // init flickity default settings
    var slickSettings = {

    };

    // iterate across all slider
    $(settings.selector).each(function() {
      var $currentEl = $(this);

      // get elements settings
      var elementSettings = $currentEl.data(settings.selectorData);

      // merge default settings with elements settings
      var finalSettings = $.extend({}, slickSettings, elementSettings);

      // init carousel
      $carousel = $currentEl.slick(finalSettings);

    });
  }

  // prev slide
  slickCustom.prototype.next = function() {
    if ($carousel) {
      $carousel.slick('slickNext');
    }
  }

  // next slide
  slickCustom.prototype.prev = function() {
    if ($carousel) {
      $carousel.slick('slickPrev');
    }
  }

  slickCustom.prototype.getCurrent = function() {
    if ($carousel) {
      return $carousel.slick('slickCurrentSlide');
    }
  }

  return slickCustom;
}

var slickCustom = new theme.slickCustom();
