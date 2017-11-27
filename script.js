class VideoPlayer {

}

class VideoPage {

}

document.addEventListener('DOMContentLoaded', function () {
  const URL = document.URL.toString();
  if (URL.indexOf('player.html') !== -1) {
    var videoplayer = new VideoPlayer();
    videoplayer.load();
  } else {
    var videopage = new VideoPage();
    videos.load();
  }
});
