let filmsdiv = document.getElementById('films');
let topRatedButton = document.getElementById('topRated');
let popularButton = document.getElementById('popular');
let nowPlayingButton = document.getElementById('now');
let upCommingButton = document.getElementById('upComming');
let links = document.querySelectorAll('span');

console.log(links);
const apiKey = '0da49e67f2b187350af65b0d605eeee1';
const topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
const upComming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;

showSelected(topRated, topRatedButton);
function showSelected(url, button) {
  filmsdiv.innerHTML = '';

  // make the button color active
  links.forEach((link) => {
    link.className = 'notActive';
    console.log(link)
  });
  button.className = 'active';
  console.log(url);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Success');

      // make the data as json
      let response = JSON.parse(this.response);
      let films = response.results;

      films.forEach((film) => {
        // create all this div for every film
        let divfilm = document.createElement('div');
        let divtitle = document.createElement('div');
        let divvote = document.createElement('div');
        let img = document.createElement('img');
        let img_div = document.createElement('div');
        let text = document.createElement('div');

        // puting our data in a variable
        let title = document.createTextNode(film.title);
        let poster = film.poster_path;
        // round the vote average number
        let vote_rounded = parseFloat(film.vote_average).toFixed(1);
        let vote = document.createTextNode(vote_rounded);

        // seting some classes and attributes
        divfilm.className = 'film';
        divtitle.className = 'title';
        divvote.className = 'vote';
        img_div.className = 'poster';
        text.className = 'text';

        img.src = `https://image.tmdb.org/t/p/w500${poster}`;

        // append the elements in the main section
        divvote.appendChild(vote);
        divtitle.appendChild(title);
        img_div.appendChild(img);
        divfilm.appendChild(img_div);

        text.appendChild(divtitle);
        text.appendChild(divvote);
        divfilm.appendChild(text);
        filmsdiv.appendChild(divfilm);
      });
    } else {
      console.log('Failed');
      console.log(xhr.status);
    }
  };

  xhr.send();
}

topRatedButton.addEventListener('click', () =>
  showSelected(topRated, topRatedButton)
);
popularButton.addEventListener('click', () =>
  showSelected(popular, popularButton)
);
upCommingButton.addEventListener('click', () =>
  showSelected(upComming, upCommingButton)
);
nowPlayingButton.addEventListener('click', () =>
  showSelected(nowPlaying, nowPlayingButton)
);
