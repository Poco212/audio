const audio = document.querySelector('audio')
const onplay = document.querySelector('#playbutton')
const proges = document.querySelector('#progress')
const durasilagu = document.querySelector('.durasi-total')
const durasigerak = document.querySelector('.durasi-gerak')
const prev = document.querySelector('#prevbutton')
const next = document.querySelector('#nextbutton')

// load music
let xaka = "";

let loadmusic = () => {

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    player( this.responseText ) ;
  }
  xhttp.open("GET", "playlist.json", true);
  xhttp.send();

}


let player = ( data ) => {
   let baplay = JSON.parse(data);
   document.querySelector('audio').src = baplay[0].src;
   xaka = baplay;

}

loadmusic();


//button play pause 
let playaudio = false;

//audio on
audio.onplaying = event => {
    playaudio = true
    onplay.innerHTML = '<i class="fa-solid fa-pause"></i>'  
}

//audio off
audio.onpause = event => {
    playaudio = false 
     onplay.innerHTML = '<i class="fa-solid fa-play"></i>'
}


onplay.addEventListener('click', () =>  {
    if (playaudio) {
        audio.pause()
        return
    }
    audio.play()
    
})


// button next
let current = 0;
next.addEventListener(`click`, ()=> {
    current=(current + 1)
    document.querySelector('audio').src = xaka[current].src;
    audio.play();

})


// button prev
prev.addEventListener(`click`, () => {
    current=(current - 1);
    document.querySelector('audio').src = xaka[current].src;
    audio.play()
})

//playlist
let changeplaylist = Array.prototype.slice.call(document.querySelectorAll('.playlist-list'));

changeplaylist.forEach((playlist)=> {

  playlist.addEventListener('click', ()=> {
     document.querySelector('audio').src = xaka[playlist.dataset.music].src;
    audio.play();
  })
} )


//progress bar dan durasi lagu
audio.ontimeupdate = event => {
    const { currentTime,duration} = event.srcElement
    const percent = (currentTime / duration) * 100
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration - (minutes * 60))
    proges.style.width = `${percent}%`
    durasilagu.innerHTML = `${minutes}:${seconds}`

    const minutegerak = Math.floor(currentTime / 60)
    const secondsgerak = Math.floor(currentTime - (minutegerak * 60))
    console.log('time',minutegerak,secondsgerak)

    let zero = secondsgerak
    if (zero < 10) {
        zero = `0${secondsgerak}`
    }
         
    durasigerak.innerHTML = `${minutegerak}:${zero}`

    
}

//volume
let vol = document.querySelector('#volumeRange')

vol.addEventListener('input', () => {
    audio.volume = vol.value / 100;
    const volu = (vol.value - vol.min) / (vol.max - vol.min) * 100;
    vol.style.background = `linear-gradient(90deg, #333 ${volu}%, #e4e4e4ff ${volu}%)`;  
})


   

