
class VideoPage {
  constructor() {
    this.container = document.querySelector('.videos');
    // til þess að submit hafi þennan klasa sem "this" verðum við
    // að nota bind hér (og í öðrum föllum sem við bindum!)
  }

  load() {
    console.log('load fallið virkar');
    const request = new XMLHttpRequest();
    request.open('GET', './videos.json', true);

    request.onload = () => {
      this.data = JSON.parse(request.response);
      this.createCategories();
      // console.log(data.videos[0].id);
      // console.log(data.categories);
    }
    request.send();
  }

  createCategories() {
    console.log(this.data);
    //const categories = data.categories;
    //console.log(categories);
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
  if (URL.indexOf('localhost:3000/') !== -1) {
    const videoplayer = new VideoPlayer();
    videoplayer.load();
  } else {
    const videopage = new VideoPage();
    videopage.load();
  }
});
