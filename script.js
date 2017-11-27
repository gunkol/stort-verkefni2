
class VideoPlayer {
  constructor() {
    this.keyName = 'countdown';
    this.container = document.querySelector('.countdown');
    this.form = document.querySelector('form');
    // til þess að submit hafi þennan klasa sem "this" verðum við
    // að nota bind hér (og í öðrum föllum sem við bindum!)
    this.form.addEventListener('submit', this.submit.bind(this));
  }

//
// }
//
// class VideoPage {
//
//
//
// }
//
//   document.addEventListener('DOMContentLoaded', function () {
//
//
//   });





  load() {
      var request = new XMLHttpRequest();
      request.open('GET', './videos.json', true);
      request.onload = function () {
        //   const data = JSON.parse(request.response);
        const parsed = JSON.parse(savedData);
        const videos = new Date(parsed.videos);

    }
  }
}
    //this.create(parsed.title, date);
  // var request = new XMLHttpRequest();
  // request.open('GET', './videos.json', true);
  //
  // request.onload = function () {
  //   const data = JSON.parse(request.response);
  //   this.create
  //   console.log(data.videos);
  //   // console.log(data.categories);
  //   // const fyrsti = data.videos[0];
  //   // fyrsti.id
  //   // console.log(fyrsti);
  // }
  // request.send();
  // //

//fall splitData
