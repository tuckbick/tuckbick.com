$(function() {

  var $bg = $('.bg');

  if ($.browser.mobile) {
    $bg.removeClass('hide');
    return;
  }

  var $video = $('video')
    , video = $video.get(0);

  // console.log('here');

  $video.removeClass('hide');
  video.volume = 0.05;
  video.play();
  // $video.on('canplay', function(e) {
  //   // $poster.addClass('hide');
  // });

});