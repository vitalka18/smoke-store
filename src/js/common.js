var $mapAddress, mapAddress, markerAddress;

$(document).ready(function() {
  /**
   * вирівнювання блоків по висоті
   */
  setEqualHeight( $('.goods-item .goods-slide__title') );
  setEqualHeight( $('.goods-container__new .goods-slide__title') );
  setEqualHeight( $('.goods-slider-container_popular .goods-slide__title') );
  setEqualHeight( $('.blog-wrap .blog-item__title') );
  setEqualHeight( $('.blog-wrap .blog-item') );
  
  /**
   * вирфвнювання блоків по висоті при зміні ширини вікна
   */
  $(window).resize(function() {
    $('.goods-item .goods-slide__title').css('height', 'auto');
    $('.goods-container__new .goods-slide__title').css('height', 'auto');
    $('.goods-slider-container_popular .goods-slide__title').css('height', 'auto');
    $('.blog-wrap .blog-item__title').css('height', 'auto');
    $('.blog-wrap .blog-item').css('height', 'auto');
    setEqualHeight( $('.goods-item .goods-slide__title') );
    setEqualHeight( $('.goods-container__new .goods-slide__title') );
    setEqualHeight( $('.goods-slider-container_popular .goods-slide__title') );
    setEqualHeight( $('.blog-wrap .blog-item__title') );
    setEqualHeight( $('.blog-wrap .blog-item') );
  });
  
  /**
   * ініціалізація слайдера на головній сторінці
   */
	$('.js-main-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          
        }
      }
    ]
  });

  /**
   * ініціалізація слайдера брендів сторінці
   */
  $('.js-brand-slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  /**
   * ініціалізація слайдеру товарів
   */
  $('.js-goods-slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  /**
   * ініціалізація шалереї в карточці товару
   */
  $('.js-good-gallery').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.js-good-gallery-nav'
  });
  /**
   * ініціалізація слейдера превю в карточці товару
   */
  $('.js-good-gallery-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.js-good-gallery',
    dots: false,
    arrows: false,
    focusOnSelect: true
  });
  

  /**
   * ховер на головному меню другого рівня
   */
  $('.sub-menu a').hover(function() {
    var $that = $(this);
    var $preview = $that.find('.sub-menu__preview');
    $preview.css('background-image', $preview.attr('data-hover-bg'));
  }, function() {
    var $that = $(this);
    var $preview = $that.find('.sub-menu__preview');
    $preview.css('background-image', $preview.attr('data-bg'));
  });

  /** 
   * колапс меню другого рівня на малих екранах
   */
  $('.js-open-menu').on('click', function(e){
    e.preventDefault();

    var $selector = $(this).parents('.nav-main__item').find('.nav-main__sub-menu');
    var $that = $(this);
    
    if( !$(this).hasClass('open') ) {
      $selector.slideDown(500);
      $that.addClass('open');
    } else {
      $selector.slideUp(500);
      $that.removeClass('open');
    }
  });

  /**
   * ініціалізація слайдера вартості товару
   */
  if ( $('.js-range').length ) {
    $('.js-range').slider({
    }).on('slide', function(value) {
        var $that = $(this),
            $range = $that.parents('.range-block'),
            $start = $range.find('.js-slider-from'),
            $end = $range.find('.js-slider-to');
        $start.val(value.value[0]);
        $end.val(value.value[1]);
    });
  }
  
  /**
   * рейтинг
   */
 $('.rating-goods').rating({
    min: 0,
    max: 5,
    step: 1,
    size: 'xs',
    showClear: false,
    showCaption: false,
  });

  $('.rating-goods').on('rating.change', function(event, value, caption) {
    console.log(value);
    console.log(caption);
  });

  $(".js-spin").TouchSpin({
    verticalbuttons: true,
    verticalupclass: 'glyphicon glyphicon-plus',
    verticaldownclass: 'glyphicon glyphicon-minus'
  });

  $('.js-spin-arrow').TouchSpin({
    verticalbuttons: true
  });

  $('#orderForm').find('.tab-pane').eq(0).find('input').on('change keyup', function() {
    if (orderFormOne('tab', 'navigation', 0)) {
      $('#orderForm').find('.tab-pane').eq(0).find('.btn-next').removeClass('disabled');
    }
  });

  $('[name="deliverySet"]').on('change', function() {
    $('[name="deliverySet"]').first().closest('.radio-group').find('.text-error').remove();
    $('#orderForm').find('.tab-pane').eq(1).find('.btn-next').removeClass('disabled');
  });

  $('[name="paySet"]').on('change', function() {
    $('[name="paySet"]').first().closest('.radio-group').find('.text-error').remove();
    $('#orderForm').find('.tab-pane').eq(2).find('.btn-next').removeClass('disabled');
  });

  $('#orderForm .step-form__inner').bootstrapWizard({
    'nextSelector': '.btn-next', 
    'previousSelector': '.btn-prev', 
    'finishSelector': '.btn-finish',
    onFinish: function() {
      $('#orderThank').css('display', 'block');
      $('#orderForm').css('display', 'none');
    },
    onTabClick: function() {
      return false;
    },
    onNext: function(tab, navigation, index) {
      if (index === 1) {
        if (!orderFormOne(tab, navigation, index)) {
          return false;
        }
      }

      if (index === 2) {
        if ( $('[name="deliverySet"]:checked').length ) {
          $('[name="deliverySet"]').first().closest('.radio-group').find('.text-error').remove();
          return true
        } else {
          $('#orderForm').find('.tab-pane').eq(index - 1).find('.btn-next').addClass('disabled');
          var textError = $('[name="deliverySet"]').first().closest('.radio-group').attr('data-error-msg');
          $('[name="deliverySet"]').first().closest('.radio-group').append('<p class="text-error">'+ textError +'</p>');
          return false;
        }
      }

      if (index === 3) {
        if ( $('[name="paySet"]:checked').length ) {
          $('[name="paySet"]').first().closest('.radio-group').find('.text-error').remove();
          return true
        } else {
          $('#orderForm').find('.tab-pane').eq(index - 1).find('.btn-next').addClass('disabled');
          var textError = $('[name="paySet"]').first().closest('.radio-group').attr('data-error-msg');
          $('[name="paySet"]').first().closest('.radio-group').append('<p class="text-error">'+ textError +'</p>');
          return false;
        }
      }
    }
  });

  function orderFormOne(tab, navigation, index) {
    var $nameInput = $('#nameInput'),
        $telInput = $('#telInput'),
        $emailInput = $('#emailInput'),
        $regionInput = $('#regionInput'),
        $cityInput = $('#cityInput'),
        $addressInput = $('#addressInput');

    var isNameValid = !$nameInput.val().length,
        isTelValid = !$telInput.val().length,
        isEmailValid = !$emailInput.val().length,
        isRegionValid = !$regionInput.val().length,
        isCityValid = !$cityInput.val().length,
        isAddressValid = !$addressInput.val().length;
    if (isNameValid) {
      showError($nameInput, index);
    } else {
      hideError($nameInput, index);
    }

    if (isTelValid) {
      showError($telInput, index);
    } else {
      hideError($telInput, index);
    }

    if (!isEmailValid && /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test($emailInput.val())) {
      hideError($emailInput, index);
    } else {
      showError($emailInput, index);
    }

    if (isRegionValid) {
      showError($regionInput, index);
    } else {
      hideError($regionInput, index);
    }

    if (isCityValid) {
      showError($cityInput, index);
    } else {
      hideError($cityInput, index);
    }

    if (isAddressValid) {
      showError($addressInput, index);
    } else {
      hideError($addressInput, index);
    }

    if (isNameValid || isTelValid || isEmailValid || isRegionValid || isCityValid || isAddressValid) {
      return false;
    } else {
      return true;
    }

    function showError(fieldSelector, index) {
      var textError = fieldSelector.attr('data-error-msg');
      fieldSelector.closest('.form-group').addClass('has-error');
      if ( fieldSelector.parent().find('p.text-error').length ===0 ) {
        fieldSelector.parent().append('<p class="text-error">'+ textError +'</p>');
      }
      $('#orderForm').find('.tab-pane').eq(index - 1).find('.btn-next').addClass('disabled');
    }

    function hideError(fieldSelector, index) {
      fieldSelector.closest('.form-group').removeClass('has-error');
      fieldSelector.parent().find('p.text-error').remove();
    }
  }

  if ( $('.mapFrame').length ) {
    var $map = $('#map-canvas');
    var longVal,latVal,zoomVal,contenteBlock,titleVal;
    longVal = $map.attr('data-long');
    latVal = $map.attr('data-lidt');
    zoomVal = $map.attr('data-zoom')*1;
    titleVal = $map.attr('data-title');
    function initialize() {
      var myLatlng = new google.maps.LatLng(longVal,latVal);
      var mapOptions = {
        zoom: zoomVal,
        center: myLatlng
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      
      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: titleVal,
      });
      
    }

    google.maps.event.addDomListener(window, 'load', initialize);
  }

  if ( $('.store-address__map').length ) {
    $mapAddress = $('#addressMap');
    var longVal,latVal,zoomVal,contenteBlock,titleVal;
    longVal = $mapAddress.attr('data-long');
    latVal = $mapAddress.attr('data-lidt');
    zoomVal = $mapAddress.attr('data-zoom')*1;
    titleVal = $mapAddress.attr('data-title');
    function initializeAddress() {
      var myLatlng = new google.maps.LatLng(longVal,latVal);
      var mapOptions = {
        zoom: zoomVal,
        center: myLatlng
      };

      mapAddress = new google.maps.Map(document.getElementById('addressMap'), mapOptions);
      markerAddress = new google.maps.Marker({
          position: myLatlng,
          map: mapAddress,
          title: titleVal,
      });
    }

    google.maps.event.addDomListener(window, 'load', initializeAddress);
  }

  $('.js-change-map-state').click(function(event) {
    var $that = $(this);
    $('.address-block').removeClass('address-block_active');
    $that.addClass('address-block_active');
    var longVal,latVal,zoomVal,contenteBlock,titleVal;
    longVal = $that.attr('data-long');
    latVal = $that.attr('data-lidt');
    zoomVal = $that.attr('data-zoom')*1;
    titleVal = $that.attr('data-title');

    var myLatlng = new google.maps.LatLng(longVal,latVal);
    var mapOptions = {
      zoom: zoomVal,
      center: myLatlng
    };
    mapAddress.setOptions(mapOptions);
    markerAddress.setOptions({
      position: myLatlng,
      map: mapAddress,
      title: titleVal
    });
  });

  $('.js-faq-collapse').on('show.bs.collapse', function(event) {
    $(this).parent('.faq-item').addClass('faq-item__open');
  });
  $('.js-faq-collapse').on('hide.bs.collapse', function(event) {
    $(this).parent('.faq-item').removeClass('faq-item__open')
  });

  $('.js-vacancy-collapse').on('show.bs.collapse', function(event) {
    $(this).parent('.vacancy-item').addClass('vacancy-item__open');
  });
  $('.js-vacancy-collapse').on('hide.bs.collapse', function(event) {
    $(this).parent('.vacancy-item').removeClass('vacancy-item__open')
  });

  $('body').on('click','.rating:not(.disabled) > span',function() {
    $(event.target).closest('.rating').find('span').removeClass('active').addClass('empty');
    $(event.target).closest('.rating').attr('data-rating', $(this).index() + 1);
    for( i = 0; i <= $(this).index(); i++) {
      $(event.target).closest('.rating').find('span').eq(i).addClass('active').removeClass('empty');
    }
  });

  $('body').on('mouseover','.rating:not(.disabled) > span', function(event) {
    $(event.target).closest('.rating').find('span').removeClass('active').addClass('empty');
    for( i = 0; i <= $(this).index(); i++) {
      $(event.target).closest('.rating').find('span').eq(i).addClass('active').removeClass('empty');
    }
  });

  $('body').on('mouseleave','.rating:not(.disabled)', function() {
    $(this).find(' > span').removeClass('active').addClass('empty');
    for( i = 0; i <= Math.round($(this).attr('data-rating')) - 1; i++) {
      $(this).find('> span').eq(i).addClass('active').removeClass('empty');
    }
  });

  var $menu = $("#mainMenu"),
  $fixedMenu = $(".fixed-menu"),
      topPosition = $menu.offset().top * 1.5;
  $(window).scroll(function(){
    if ( $(this).scrollTop() > topPosition ){
      $fixedMenu.addClass('active');
    } else if($(this).scrollTop() <=topPosition ) {
        $fixedMenu.removeClass("active");
    }
  });//scroll
}); //end document ready

/**
 * [блоки однакової висоти]
 * @param {[jQuery Object]} columns [елементи які будуть рівнятись]
 */
function setEqualHeight(columns){
  var tallestcolumn = 0;
  columns.each(
  function(){
    currentHeight = $(this).height();
    if(currentHeight > tallestcolumn){
      tallestcolumn = currentHeight;
    }
  });
  columns.height(tallestcolumn);
}

