'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoPage = function () {
  function VideoPage() {
    _classCallCheck(this, VideoPage);

    this.content = document.querySelector('.content');
  }

  _createClass(VideoPage, [{
    key: 'load',
    value: function load() {
      var _this = this;

      this.onLoad();

      var request = new XMLHttpRequest();
      request.open('GET', './videos.json', true);

      request.onload = function () {
        _this.data = JSON.parse(request.response);
        _this.createCategories(_this.data);
      };
      request.send();
    }
  }, {
    key: 'createCategories',
    value: function createCategories(data) {
      var _this2 = this;

      this.clear();

      var categories = data.categories;


      categories.forEach(function (cat) {
        var catTitle = cat.title;

        var category = document.createElement('div');
        category.classList.add('category');

        var headingTitle = document.createElement('h1');
        headingTitle.classList.add('text', 'text_categoryTitle');
        headingTitle.appendChild(document.createTextNode(catTitle));
        category.appendChild(headingTitle);

        var cardlist = document.createElement('div');
        cardlist.classList.add('cardlist');
        category.appendChild(cardlist);

        var currentCat = cat.videos;

        currentCat.forEach(function (currId) {
          var currVideo = _this2.createVideos(_this2.data, currId - 1);
          cardlist.appendChild(currVideo);
        });

        var cardlistLine = document.createElement('span');
        cardlistLine.classList.add('cardlist__line');
        category.appendChild(cardlistLine);

        _this2.content.appendChild(category);
      });
    }
  }, {
    key: 'createVideos',
    value: function createVideos(data, videoId) {
      var videoName = data.videos[videoId].title;
      var videoDuration = data.videos[videoId].duration;
      var videoAge = data.videos[videoId].created;
      var videoImgUrl = data.videos[videoId].poster;
      var videoCard = document.createElement('a');
      videoCard.classList.add('card');
      var videoLinkUrl = 'player.html?id='.concat(videoId + 1);
      videoCard.setAttribute('href', videoLinkUrl);

      var videoPoster = document.createElement('div');
      videoPoster.classList.add('card__videoPoster');
      videoCard.appendChild(videoPoster);

      var videoImg = document.createElement('img');
      videoImg.src = videoImgUrl;
      videoImg.classList.add('card__videoImg');
      videoImg.alt = videoName;
      videoPoster.appendChild(videoImg);

      var lengthFlex = document.createElement('div');
      lengthFlex.classList.add('card__lengthFlex');
      videoPoster.appendChild(lengthFlex);

      var videoLength = document.createElement('div');
      videoLength.classList.add('card__videoLength');
      var lengthNode = document.createTextNode(this.parseLength(videoDuration));
      videoLength.appendChild(lengthNode);
      lengthFlex.appendChild(videoLength);

      var videoDescription = document.createElement('div');
      videoDescription.classList.add('card__videoDescription');
      videoCard.appendChild(videoDescription);

      var videoTitle = document.createElement('div');
      videoTitle.classList.add('text', 'text__myndbandsTitill');
      videoTitle.appendChild(document.createTextNode(videoName));
      videoDescription.appendChild(videoTitle);

      var videoDate = document.createElement('p');
      videoDate.classList.add('text', 'text__videoDate');
      var dateNode = document.createTextNode(this.parseDate(videoAge));
      videoDate.appendChild(dateNode);
      videoDescription.appendChild(videoDate);

      return videoCard;
    }
  }, {
    key: 'parseLength',
    value: function parseLength(duration) {
      var min = Math.floor(duration / 60);
      var seconds = duration - min * 60;
      var time = '';
      if (min < 10) {
        time = '0'.concat(min.toString(), ':');
      } else {
        time = min.toString().concat(':');
      }

      if (seconds < 10) {
        return time.concat('0', seconds.toString());
      }
      return time.concat(seconds.toString());
    }
  }, {
    key: 'parseDate',
    value: function parseDate(videoAge) {
      var timeSince = Math.floor((new Date() - videoAge) / 1000);
      var min = Math.floor(timeSince / 60);
      var klst = Math.floor(min / 60);
      var days = Math.floor(klst / 24);
      var weeks = Math.floor(days / 7);
      var months = Math.floor(days / 30);
      var years = Math.floor(days / 365);

      var fyrir = 'Fyrir ';

      if (years > 0) {
        if (years === 1) {
          return fyrir.concat(years.toString(), ' ári síðan');
        }
        return fyrir.concat(years.toString(), ' árum síðan');
      } else if (months > 0) {
        if (months === 1) {
          return fyrir.concat(months.toString(), ' mánuði síðan');
        }
        return fyrir.concat(months.toString(), ' mánuðum síðan');
      } else if (weeks > 0) {
        if (weeks === 1) {
          return fyrir.concat(weeks.toString(), ' viku síðan');
        }
        return fyrir.concat(weeks.toString(), ' vikum síðan');
      } else if (days > 0) {
        if (days === 1) {
          return fyrir.concat(days.toString(), ' degi síðan');
        }
        return fyrir.concat(days.toString(), ' dögum síðan');
      } else if (klst > 0) {
        if (klst === 1) {
          return fyrir.concat(klst.toString(), ' klukustund síðan');
        }
        return fyrir.concat(klst.toString(), ' klukkustundum síðan');
      }
      if (min === 1) {
        return fyrir.concat(min.toString(), ' mínútu síðan');
      }
      return fyrir.concat(min.toString(), ' mínútum síðan');
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var loading = document.createElement('h2');
      loading.classList.add('text');
      loading.appendChild(document.createTextNode('Hleð upplýsingum...'));
      this.content.appendChild(loading);
    }
  }, {
    key: 'clear',
    value: function clear() {
      while (this.content.hasChildNodes()) {
        this.content.removeChild(this.content.firstChild);
      }
    }
  }]);

  return VideoPage;
}();

var VideoPlayer = function () {
  function VideoPlayer() {
    _classCallCheck(this, VideoPlayer);

    this.player = document.querySelector('.player');
  }

  _createClass(VideoPlayer, [{
    key: 'load',
    value: function load() {
      var _this3 = this;

      var request = new XMLHttpRequest();
      request.open('GET', './videos.json', true);

      request.onload = function () {
        _this3.data = JSON.parse(request.response);
        _this3.createPlayer(_this3.data);
      };
      request.send();
    }
  }, {
    key: 'createPlayer',
    value: function createPlayer() {
      var _this4 = this;

      var videoId = window.location.search;
      var id = videoId[videoId.length - 1];

      if (!this.data.videos[id - 1]) {
        this.error();
      } else {
        var titleEl = document.querySelector('title');
        titleEl.appendChild(document.createTextNode(this.data.videos[id - 1].title));

        var title = document.createElement('h1');
        title.classList.add('text', 'text__spilaraTitill');
        title.appendChild(document.createTextNode(this.data.videos[id - 1].title));
        this.player.appendChild(title);

        var videoContainer = document.createElement('div');
        videoContainer.classList.add('videoContainer');
        this.player.appendChild(videoContainer);

        var src = this.data.videos[id - 1].video;
        var video = document.createElement('video');
        video.classList.add('video');
        video.src = src;
        videoContainer.appendChild(video);
        this.player.appendChild(videoContainer);

        var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        var overlayButton = document.createElement('div');
        overlayButton.classList.add('overlayButton', 'playButton');
        overlay.appendChild(overlayButton);
        videoContainer.appendChild(overlay);

        var videoContainerSelector = document.querySelector('.videoContainer');
        videoContainerSelector.addEventListener('click', this.playButton.bind(this));

        this.buttons = document.createElement('div');
        this.buttons.classList.add('buttons');
        this.player.appendChild(this.buttons);

        var tilbaka = document.createElement('a');
        tilbaka.classList.add('text', 'text__heim');
        tilbaka.setAttribute('href', './.');
        tilbaka.appendChild(document.createTextNode('Til baka á forsíðu'));
        this.player.appendChild(tilbaka);

        video.addEventListener('ended', this.resetVideo.bind(this));

        var buttons = ['backButton', 'playButton', 'muteButton', 'fullscrButton', 'nextButton'];

        buttons.forEach(function (i) {
          return _this4.createButton(i);
        });
      }
    }
  }, {
    key: 'createButton',
    value: function createButton(buttonTitle) {
      var button = document.createElement('button');
      button.classList.add('button');
      button.classList.add(buttonTitle);
      this.buttons.appendChild(button);
      switch (buttonTitle) {
        case 'playButton':
          button.addEventListener('click', this.playButton.bind(this));
          break;
        case 'muteButton':
          button.addEventListener('click', this.muteButton.bind(this));
          break;
        case 'nextButton':
          button.addEventListener('click', this.nextButton.bind(this));
          break;
        case 'backButton':
          button.addEventListener('click', this.backButton.bind(this));
          break;
        case 'fullscrButton':
          button.addEventListener('click', this.fullscrButton.bind(this));
          break;
        default:
      }
    }
  }, {
    key: 'playButton',
    value: function playButton() {
      var vid = document.querySelector('.video');
      var overlay = document.querySelector('.overlay');
      var overlayButton = document.querySelector('.overlayButton');
      if (!vid.paused) {
        var button = document.querySelector('.pauseButton');
        vid.pause();
        button.classList.remove('pauseButton');
        button.classList.add('playButton');
        overlay.classList.remove('overlay__hidden');
        overlayButton.add('playButton');
      } else {
        var _button = document.querySelector('button.playButton');
        vid.play();
        _button.classList.remove('playButton');
        _button.classList.add('pauseButton');
        overlayButton.classList.remove('playButton');
        overlay.classList.add('overlay__hidden');
      }
    }
  }, {
    key: 'backButton',
    value: function backButton() {
      var vid = document.querySelector('.video');
      vid.currentTime -= 3;
    }
  }, {
    key: 'nextButton',
    value: function nextButton() {
      var vid = document.querySelector('.video');
      vid.currentTime += 3;
    }
  }, {
    key: 'fullscrButton',
    value: function fullscrButton() {
      var vid = document.querySelector('.video');
      if (vid.requestFullscreen) {
        vid.requestFullscreen();
      } else if (vid.mozRequestFullScreen) {
        vid.mozRequestFullScreen();
      } else if (vid.webkitRequestFullscreen) {
        vid.webkitRequestFullscreen();
      } else if (vid.msRequestFullscreen) {
        vid.msRequestFullscreen();
      }
    }
  }, {
    key: 'muteButton',
    value: function muteButton() {
      var vid = document.querySelector('.video');
      if (!vid.muted) {
        var button = document.querySelector('.muteButton');
        vid.muted = true;
        button.classList.remove('muteButton');
        button.classList.add('unmuteButton');
      } else {
        var _button2 = document.querySelector('.unmuteButton');
        vid.muted = false;
        _button2.classList.remove('unmuteButton');
        _button2.classList.add('muteButton');
      }
    }
  }, {
    key: 'resetVideo',
    value: function resetVideo() {
      var vid = document.querySelector('.video');
      vid.currentTime = 0;
      var overlay = document.querySelector('.overlay');
      var overlayButton = document.querySelector('.overlayButton');
      var pauseButton = document.querySelector('.pauseButton');
      pauseButton.classList.remove('pauseButton');
      pauseButton.classList.add('playButton');
      overlayButton.classList.add('playButton');
      overlay.classList.remove('overlay__hidden');
    }
  }, {
    key: 'error',
    value: function error() {
      var titleEl = document.querySelector('title');
      titleEl.appendChild(document.createTextNode('Myndband ekki til'));

      this.content.appendChild(document.createTextNode('Myndbandið sem beðið var um er ekki til.'));
    }
  }]);

  return VideoPlayer;
}();

document.addEventListener('DOMContentLoaded', function () {
  var URL = document.URL.toString();
  if (URL.indexOf('player') > -1) {
    var videoplayer = new VideoPlayer();
    videoplayer.load();
  } else {
    var videopage = new VideoPage();
    videopage.load();
  }
});

//# sourceMappingURL=script-compiled.js.map