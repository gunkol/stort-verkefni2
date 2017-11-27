
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

  // key: 'onLoad',
  // value: function onLoad() {
  //   var loading = document.createElement('h2');
  //   loading.classList.add('text');
  //   loading.appendChild(document.createTextNode('Hleð upplýsingum...'));
  //   this.categories.appendChild(loading);
  // }

}

class VideoPlayer {

}

document.addEventListener('DOMContentLoaded', function () {
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
