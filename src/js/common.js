$(document).ready(function() {
  setEqualHeight( $('.goods-item .goods-slide__title') );
  setEqualHeight( $('.goods-container__new .goods-slide__title') );
  setEqualHeight( $('.goods-slider-container_popular .goods-slide__title') );

  $(window).resize(function() {
    $('.goods-item .goods-slide__title').css('height', 'auto');
    $('.goods-container__new .goods-slide__title').css('height', 'auto');
   $('.goods-slider-container_popular .goods-slide__title').css('height', 'auto');
    setEqualHeight( $('.goods-item .goods-slide__title') );
    setEqualHeight( $('.goods-container__new .goods-slide__title') );
    setEqualHeight( $('.goods-slider-container_popular .goods-slide__title') );
  });

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

  $('.js-good-gallery').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.js-good-gallery-nav'
  });

  $('.js-good-gallery-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.js-good-gallery',
    dots: false,
    arrows: false,
    focusOnSelect: true
  });
  

  
  $('.sub-menu a').hover(function() {
    var $that = $(this);
    var $preview = $that.find('.sub-menu__preview');
    $preview.css('background-image', $preview.attr('data-hover-bg'));
  }, function() {
    var $that = $(this);
    var $preview = $that.find('.sub-menu__preview');
    $preview.css('background-image', $preview.attr('data-bg'));
  });

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

  $('#orderForm .step-form__inner').bootstrapWizard({
    'nextSelector': '.btn-next', 
    'previousSelector': '.btn-prev', 
    'finishSelector': '.btn-finish',
    onFinish: function() {
      $('#orderThank').css('display', 'block');
      $('#orderForm').css('display', 'none');
    }

  });
  if ( $('.mapFrame') ) {
    var $map = $('#map-canvas');
    var longVal,latVal,zoomVal,contenteBlock,titleVal;
    longVal = $map.attr('data-long');
    latVal = $map.attr('data-lidt');
    zoomVal = $map.attr('data-zoom')*1;
    titleVal = $map.attr('data-title');
    contenteBlock = $('#content-map').html();
    function initialize() {
      var myLatlng = new google.maps.LatLng(longVal,latVal);
      var mapOptions = {
        zoom: zoomVal,
        center: myLatlng
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var contentString = contenteBlock;

      var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 400
      });
      var image = '/images/map-marker-hi.png';
      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: titleVal,
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
  }

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

