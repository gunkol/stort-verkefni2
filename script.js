
class VideoPlayer {
  constructor() {
    this.keyName = 'countdown';
    this.container = document.querySelector('.countdown');
    this.form = document.querySelector('form');
    // til þess að submit hafi þennan klasa sem "this" verðum við
    // að nota bind hér (og í öðrum föllum sem við bindum!)
    this.form.addEventListener('submit', this.submit.bind(this));
  }
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
