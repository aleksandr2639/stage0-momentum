function showTime () {
   const date = new Date();
       document.querySelector('.time').innerHTML = date.toLocaleTimeString()
       setTimeout(showTime, 1000);
       getTimeOfDay()
       showGreeting()
}
showTime ()

function showData () {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric',year: 'numeric'};
    document.querySelector('.date').innerHTML = date.toLocaleDateString('en-US', options);
}

showData()
    const greeting = document.querySelector('.greeting')

function getTimeOfDay() {
  const date = new Date();
  const hour = date.getHours();
if (hour>= 6 && hour<12 ) {
  return 'morning';
 
} else if (hour>= 12 && hour<18) {
  return'afternoon';

} else if (hour>=18 && hour<24) {
  return'evening';

} else  {
    return'night';
}

}
 function showGreeting() {
  const greeting = document.querySelector('.greeting')
  let timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText
 }

const textName = document.querySelector('.name')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const errorCity = document.querySelector('.weather-error');


  
  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=6ceed6414670c6a32aa3cfcb0fa3e466&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.status === 200) {
        errorCity.textContent = ' ';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} м/с`;
        humidity.textContent = `Humidity: ${data.main.humidity.toFixed(0)} %`;
    }
    else if (res.status === 400) {
        errorCity.textContent = 'Error! Nothing to geocode for " " !';
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = ' ';
        weatherDescription.textContent = ' ';
        windSpeed.textContent = ' ';
        humidity.textContent = ' ';
    }
    else if (res.status === 404) {
        errorCity.textContent = `Error! city not found for ${city.value}`;
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = ' ';
        weatherDescription.textContent = ' ';
        windSpeed.textContent = ' ';
        humidity.textContent = ' ';
    }
  }

  (function(){
        if (localStorage.city) {
            city.value = localStorage.city;
        }
        city.onchange = function() {
            localStorage.city = this.value;
        }
    })()

  function setLocalStorage() {
    localStorage.setItem('name', textName.value);
   
  }
  window.addEventListener('beforeunload', setLocalStorage)
 
   function getLocalStorage() {
   if(localStorage.getItem('name')) {
      textName.value = localStorage.getItem('name');
      
   }
 }
 window.addEventListener('load', getLocalStorage)
 
 getWeather()

 function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

city.addEventListener('keypress', setCity);

  const body =document.querySelector ('body')
  const slideNext = document.querySelector('.slide-next')
  const slidePrev = document.querySelector('.slide-prev')
 
  const min = 0;
  const max = 20;
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomNum = getRandom(min, max);

  function setBg() {
    let timeOfDay = getTimeOfDay();
    const bgNum = String(randomNum).padStart(2,'0');
    const img = new Image();
    body.style.backgroundImage = `url(https://raw.githubusercontent.com/aleksandr2639/stage0-momentum/main/${timeOfDay}/${bgNum}.webp)`;
    //img.src = `url(https://raw.githubusercontent.com/aleksandr2639/stage0-momentum/main/${timeOfDay}/${bgNum}.webp)`;
    img.onload = () => {
      body.style.backgroundImage = `url(https://raw.githubusercontent.com/aleksandr2639/stage0-momentum/main/${timeOfDay}/${bgNum}.webp)`;
    }

  }

  setBg ()

  function getSlideNext () {
    if (randomNum < 20) {
      randomNum  = randomNum  + 1
    }
    else if(randomNum = 20) {
      randomNum = 1
    } 
      setBg ()
    }
  

  function getSlidePrev() {
    if (randomNum > 1) {
      randomNum = randomNum -1 ;
    } else if (randomNum === 1) {
      randomNum = 20
    }
    setBg ()
  }

  slideNext.addEventListener('click', getSlideNext)
  slidePrev.addEventListener('click', getSlidePrev)


  const anyQuotes = document.querySelector('.quote')
  const anyAuthor = document.querySelector('.author')
  const changeQuote = document.querySelector('.change-quote');
    
    
  function getQuotes() {
    const quotes = 'data.json';
      fetch(quotes)
        .then(res => res.json())
        .then(data => { 
          const anyQuotes = document.querySelector('.quote')
          const anyAuthor = document.querySelector('.author')
    
          const index = Math.floor(Math.random()* 31)
          anyQuotes.textContent = data[index].text
          anyAuthor.textContent = data[index].author
        });
    }
    getQuotes();
    
  changeQuote.addEventListener('click', getQuotes);

  const player = document.querySelector('.player'),
        progressContainer = document.querySelector('.progress-container'),
        progress = document.querySelector('.progress'),
        playBtn = document.querySelector('.play'),
        prevBtn = document.querySelector('.play-prev'),
        nextBtn = document.querySelector('.play-next'),
        audio = document.querySelector('.audio'),
        nameSong = document.querySelector('.song'),
        volumeBtn = document.querySelector('.volume-button')
       
 
    
   
  const songs = ['Aqua Caelestis','River Flows In You', 'Summer Wind', 'Ennio Morricone']

    let songIndex = 0
      function loadAudio(song) {
        nameSong.innerHTML = song
        audio.src = `assets/sounds/${song}.mp3`
      }   
      loadAudio(songs[songIndex])

      function playAudio() {
        audio.play();
        playBtn.classList.add('active');
      }
      function pauseAudio() {
        audio.pause();
        playBtn.classList.remove('active');
      }
      volumeBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
        if (audio.muted) {
          volumeBtn.classList.add("stop");
        } else {
          volumeBtn.classList.remove("stop");
        }
      });

  const volumeSlider = document.querySelector(".volume-container");
     volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
  document.querySelector(".volume-bar").style.width = newVolume * 100 + '%';
}, false)

    playBtn.addEventListener('click',() => {
      const playining = playBtn.classList.contains('active')
      if (playining) {
        pauseAudio()
      } else {
        playAudio()
      }
    });

    function nextSong() {
      songIndex = songIndex + 1

      if (songIndex > songs.length - 1) {
        songIndex = 0
      }
      loadAudio(songs[songIndex])
      playAudio() 
    }

    nextBtn.addEventListener('click',nextSong)
    function prevSong() {
      songIndex = songIndex - 1

      if (songIndex < 0) {
        songIndex = songs.length -1
      }
      loadAudio(songs[songIndex])
      playAudio() 
    }

    prevBtn.addEventListener('click',prevSong)
    function loadProgress(e) {
      const currentTime = e.target.currentTime; 
      const duration = e.target.duration;
      const progressPercent = (currentTime / duration) * 100
      progress.style.width = `${progressPercent}%`
      let musicCurrentTime = document.querySelector(".timer-header"),
          musicDuartion = document.querySelector(".duration");
  audio.addEventListener("loadeddata", ()=>{

    let mainAdDuration = audio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ 
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    }
    audio.addEventListener('timeupdate',loadProgress)
    function clickProgress (e) {
      const width = this.clientWidth
      const clickProgress = e.offsetX
      const duration = audio.duration
      audio.currentTime = (clickProgress / width) * duration 
    }
    progressContainer.addEventListener('click',clickProgress)
    audio.addEventListener('ended', nextSong)
    
    
   

   


   