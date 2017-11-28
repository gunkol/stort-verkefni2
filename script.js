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
        headingTitle.classList.add('text', 'text__categoryTitle');
        headingTitle.appendChild(document.createTextNode(catTitle));
        category.appendChild(headingTitle);

        const cardlist = document.createElement('div');
        cardlist.classList.add('cardlist');
        category.appendChild(cardlist);

        const currCategory = cat.videos;

        currCategory.forEach(currId => {
          var currVideo = this.createVideos(this.data,currId - 1);
          //var videoId = currId - 1;
          //var currVideo = this.createVideos(this.data, videoId);
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
    const minutes = Math.floor(duration / 60);
    const seconds = duration - (minutes * 60);
    let time = '';
    if (minutes < 10) {
      time = '0'.concat(minutes.toString(), ':');
    } else {
      time = minutes.toString().concat(':');
    }

    if (seconds < 10) {
      return time.concat('0', seconds.toString());
    }
    return time.concat(seconds.toString());
  }


  parseDate(videoAge) {
    const timeSince = Math.floor((new Date() - videoAge) / 1000);
    const minutes = Math.floor(timeSince / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
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
    } else if (hours > 0) {
      if (hours === 1) {
        return fyrir.concat(hours.toString(), ' klukustund síðan');
      }
      return fyrir.concat(hours.toString(), ' klukkustundum síðan');
    }
    if (minutes === 1) {
      return fyrir.concat(minutes.toString(), ' mínútu síðan');
    }
    return fyrir.concat(minutes.toString(), ' mínútum síðan');
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
    const player = document.querySelector('.player');
    const content = document.querySelector('.content');
  }

  load() {
    const request = new XMLHttpRequest();
    request.open('GET', './videos.json', true);

    request.onload = () => {
      this.data = JSON.parse(request.response);
      this.createPlayer();
    };
    request.send();
  }

  createPlayer() {
    // const videoId = window.location.search;
    const videoId = 'notendur.hi.is/guk43/vefforritun/stort-verkefni2/player.html?id=2';
    const id = videoId[videoId.length - 1];
    // this.player = document.querySelector('.player');
    this.content = document.querySelector('.content');

    if (!this.data.videos[id]) {
      this.error();
    } else {
      // debugger;
      const titleEl = document.querySelector('title');
      titleEl.appendChild(document.createTextNode(this.data.videos[id - 1].title));

      const title = document.createElement('h1');
      title.classList.add('text', 'text__spilaraTitill');
      title.appendChild(document.createTextNode(this.data.videos[id - 1].title));
      // this.player.appendChild(title);
      this.content.appendChild(title);

      const videoBox = document.createElement('div'); // videoContainer
      videoBox.classList.add('videoBox');
      // this.player.appendChild(videoBox);
      this.content.appendChild(videoBox);

      const src = this.data.videos[id - 1].video;
      const video = document.createElement('video');
      video.classList.add('video');
      video.src = src;
      videoBox.appendChild(video);
      this.player.appendChild(videoBox);
    }
  }

  error() {
    const titleEl = document.querySelector('title');
    titleEl.appendChild(document.createTextNode('Myndband ekki til'));

    this.content.appendChild(document.createTextNode('Myndbandið sem beðið var um er ekki til.'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const URL = document.URL.toString();
  console.log(URL);
  if (URL.indexOf('localhost:3000/') == -1) {
    const videoplayer = new VideoPlayer();
    videoplayer.load();
  } else {
    const videopage = new VideoPage();
    videopage.load();
  }
});
