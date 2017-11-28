class VideoPage {
  constructor() {
    this.content = document.querySelector('.content');
  }

  load() {
    this.onLoad();

    const request = new XMLHttpRequest();
    request.open('GET', './videos.json', true);

    request.onload = () => {
      this.data = JSON.parse(request.response);
      this.createCategories(this.data);
    };
    request.send();
  }

  createCategories(data) {
    this.clear();

    const { categories } = data;

    categories.forEach(cat => {

        const catTitle = cat.title;

        const category = document.createElement('div');
        category.classList.add('category');

        const headingTitle = document.createElement('h1');
        headingTitle.classList.add('text', 'text_categoryTitle');
        headingTitle.appendChild(document.createTextNode(catTitle));
        category.appendChild(headingTitle);

        const cardlist = document.createElement('div');
        cardlist.classList.add('cardlist');
        category.appendChild(cardlist);

        const currentCat = cat.videos;

        currentCat.forEach(currId => {
          const currVideo = this.createVideos(this.data,currId - 1);
          cardlist.appendChild(currVideo);
        });

        const cardlistLine = document.createElement('span');
        cardlistLine.classList.add('cardlist__line');
        category.appendChild(cardlistLine);

        this.content.appendChild(category);
    });

  }
  createVideos(data, videoId) {
    const videoName = data.videos[videoId].title;
    const videoDuration = data.videos[videoId].duration;
    const videoAge = data.videos[videoId].created;
    const videoImgUrl = data.videos[videoId].poster;
    const videoCard = document.createElement('a');
    videoCard.classList.add('card');
    const videoLinkUrl = 'player.html?id='.concat(videoId + 1);
    videoCard.setAttribute('href', videoLinkUrl);

    const videoPoster = document.createElement('div');
    videoPoster.classList.add('card__videoPoster');
    videoCard.appendChild(videoPoster);

    const videoImg = document.createElement('img');
    videoImg.src = videoImgUrl;
    videoImg.classList.add('card__videoImg');
    videoImg.alt = videoName;
    videoPoster.appendChild(videoImg);

    const lengthFlex = document.createElement('div');
    lengthFlex.classList.add('card__lengthFlex');
    videoPoster.appendChild(lengthFlex);

    const videoLength = document.createElement('div');
    videoLength.classList.add('card__videoLength');
    const lengthNode = document.createTextNode(this.parseLength(videoDuration));
    videoLength.appendChild(lengthNode);
    lengthFlex.appendChild(videoLength);

    const videoDescription = document.createElement('div');
    videoDescription.classList.add('card__videoDescription');
    videoCard.appendChild(videoDescription);

    const videoTitle = document.createElement('div');
    videoTitle.classList.add('text', 'text__videoTitle');
    videoTitle.appendChild(document.createTextNode(videoName));
    videoDescription.appendChild(videoTitle);

    const videoDate = document.createElement('p');
    videoDate.classList.add('text', 'text__videoDate');
    const dateNode = document.createTextNode(this.parseDate(videoAge));
    videoDate.appendChild(dateNode);
    videoDescription.appendChild(videoDate);

    return videoCard
  }

  parseLength(duration) {
    const min = Math.floor(duration / 60);
    const seconds = duration - (min * 60);
    let time = '';
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


  parseDate(videoAge) {
    const timeSince = Math.floor((new Date() - videoAge) / 1000);
    const min = Math.floor(timeSince / 60);
    const klst = Math.floor(min / 60);
    const days = Math.floor(klst / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const fyrir = 'Fyrir ';

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

  onLoad() {
    const loading = document.createElement('h2');
    loading.classList.add('text');
    loading.appendChild(document.createTextNode('Hleð upplýsingum...'));
    this.content.appendChild(loading);
  }

  clear() {
    while (this.content.hasChildNodes()) {
      this.content.removeChild(this.content.firstChild);
    }
  }

}

class VideoPlayer {
  constructor() {
    this.player = document.querySelector('.player');
  }

  load() {
    const request = new XMLHttpRequest();
    request.open('GET', './videos.json', true);

    request.onload = () => {
      this.data = JSON.parse(request.response);
      this.createPlayer(this.data);
    };
    request.send();
  }

  createPlayer() {
    const videoId = window.location.search;
    const id = videoId[videoId.length - 1];

    if (!this.data.videos[id - 1]) {
      this.error();
    } else {
      const titleEl = document.querySelector('title');
      titleEl.appendChild(document.createTextNode(this.data.videos[id - 1].title));

      const title = document.createElement('h1');
      title.classList.add('text', 'text__spilaraTitill');
      title.appendChild(document.createTextNode(this.data.videos[id - 1].title));
      this.player.appendChild(title);

      const videoContainer = document.createElement('div');
      videoContainer.classList.add('videoContainer');
      this.player.appendChild(videoContainer);

      const src = this.data.videos[id - 1].video;
      const video = document.createElement('video');
      video.classList.add('video');
      video.src = src;
      videoContainer.appendChild(video);
      this.player.appendChild(videoContainer);

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      const overlayButton = document.createElement('div');
      overlayButton.classList.add('overlayButton', 'playButton');
      overlay.appendChild(overlayButton);
      videoContainer.appendChild(overlay);

      const videoContainerSelector = document.querySelector('.videoContainer');
      videoContainerSelector.addEventListener('click', this.playButton.bind(this));

      this.buttons = document.createElement('div');
      this.buttons.classList.add('buttons');
      this.player.appendChild(this.buttons);

      const tilbaka = document.createElement('a');
      tilbaka.classList.add('text', 'text__heim');
      tilbaka.setAttribute('href', './.');
      tilbaka.appendChild(document.createTextNode('Til baka á forsíðu'));
      this.player.appendChild(tilbaka);

      video.addEventListener('ended', this.resetVideo.bind(this));

      const buttons = ['backButton', 'playButton', 'muteButton', 'fullscrButton', 'nextButton'];

      buttons.forEach(i => this.createButton(i));
    }
  }

  createButton(buttonTitle) {
    const button = document.createElement('button');
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

  playButton() {
    const vid = document.querySelector('.video');
    const overlay = document.querySelector('.overlay');
    const overlayButton = document.querySelector('.overlayButton');
    if (!vid.paused) {
      const button = document.querySelector('.pauseButton');
      vid.pause();
      button.classList.remove('pauseButton');
      button.classList.add('playButton');
      overlay.classList.remove('overlay__hidden');
      overlayButton.add('playButton');
    } else {
      const button = document.querySelector('button.playButton');
      vid.play();
      button.classList.remove('playButton');
      button.classList.add('pauseButton');
      overlayButton.classList.remove('playButton');
      overlay.classList.add('overlay__hidden');
    }
  }

  backButton() {
    const vid = document.querySelector('.video');
    vid.currentTime -= 3;
  }

  nextButton() {
    const vid = document.querySelector('.video');
    vid.currentTime += 3;
  }

  fullscrButton() {
    const vid = document.querySelector('.video');
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

  muteButton() {
    const vid = document.querySelector('.video');
    if (!vid.muted) {
      const button = document.querySelector('.muteButton');
      vid.muted = true;
      button.classList.remove('muteButton');
      button.classList.add('unmuteButton');
    } else {
      const button = document.querySelector('.unmuteButton');
      vid.muted = false;
      button.classList.remove('unmuteButton');
      button.classList.add('muteButton');
    }
  }

  resetVideo() {
    const vid = document.querySelector('.video');
    vid.currentTime = 0;
    const overlay = document.querySelector('.overlay');
    const overlayButton = document.querySelector('.overlayButton');
    const pauseButton = document.querySelector('.pauseButton');
    pauseButton.classList.remove('pauseButton');
    pauseButton.classList.add('playButton');
    overlayButton.classList.add('playButton');
    overlay.classList.remove('overlay__hidden');
  }

  error() {
    const titleEl = document.querySelector('title');
    titleEl.appendChild(document.createTextNode('Myndband ekki til'));

    this.content.appendChild(document.createTextNode('Myndbandið sem beðið var um er ekki til.'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const URL = document.URL.toString();
  if (URL.indexOf('player') > -1) {
    const videoplayer = new VideoPlayer();
    videoplayer.load();
  } else {
    const videopage = new VideoPage();
    videopage.load();
  }
});
