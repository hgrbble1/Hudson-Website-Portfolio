


var $window = $(window);
var $animation_elements=$('#animation');

function check_if_in_view() {
  var window_height = $window.innerHeight();

  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_height + window_top_position);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.height();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_height + element_top_position);

    if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');
