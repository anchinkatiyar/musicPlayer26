let currentSong = new Audio();
let songs;
let currentFolder;
// let signup = document.querySelector('#signup');
// signup.addEventListener('click',()=>{

// })
async function getSongs(folder) {
    currentFolder = folder;
    //using Fetch api get all the songs
    let a = await fetch(`./${folder}`);
    // let a = await fetch(`http://127.0.0.1:5500/javascript_apna/Spotify_Clone/${folder}`);
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    // console.log(response);
    let Lis = div.querySelectorAll('a');
    // console.log(Lis[8].href);
    songs = [];
    for (let idx = 0; idx < Lis.length; idx++) {
        if (Lis[idx].href.endsWith(".mp3")) {
            // console.log(Lis[idx].href);
            songs.push(Lis[idx].href.split(`/${folder}/`)[1])
            // console.log(songs)
        }
    }
    songUL = document.querySelector('.songList').getElementsByTagName('ul')[0];
    songUL.innerHTML = '';
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML +
            `<li>  
                                    <div class="songInfo rounded">
                                        <img src="img/music.svg" alt="music" class="invert">
                                        <div>${song.replaceAll('%20', ' ').split('_64(PagalWorld.com.sb)')[0]}</div>
                                    </div>
                                    <div class="playNow">
                                        <span>Play Now</span>
                                        <img src="playbar_images/play.svg" alt="play" class="invert">
                                    </div>
                                </li>`;
    }
    // if (currentSong.src === '') {
        let t = document.querySelector('.songList').getElementsByTagName('li')[0].querySelector('.songInfo').getElementsByTagName('div')[0].innerText;
        playMusic(t, true);

    // }
    // console.log(Array.from(document.querySelector('.songList').getElementsByTagName('li')));
    Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach((e) => {
        let songdiv = e.querySelector('.songInfo').getElementsByTagName('div')[0];
        e.addEventListener('click', () => {
            console.log(songdiv.innerText);
            playMusic(songdiv.innerText);
            
        });

    });
    

}
//display albums
async function displayAlbum(){
    // let a = await fetch(`http://127.0.0.1:5500/javascript_apna/Spotify_Clone/songs`);
    let a = await fetch(`./songs`);
    let response = await a.text();
    // console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    // console.log(div);
    let card_contain = document.querySelector('.card-container');
    let Lis = div.querySelectorAll('a');
    // console.log(Lis);
    card_contain.innerHTML='';
    for(let idx=0;idx<Lis.length;idx++){
        const e = Lis[idx];
        // if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            if(Lis[idx].title != '' && Lis[idx].title !='..'){
                // console.log(Lis[idx].href,Lis[idx].title);
                let folder = Lis[idx].title;
                //get meta data of folder
                // let meta = await fetch(`http://127.0.0.1:5500/javascript_apna/Spotify_Clone/songs/${folder}/content.json`);
                let meta = await fetch(`./songs/${folder}/content.json`);
                let Mresponse = await meta.json();
                // console.log(Mresponse);
                
                card_contain.innerHTML =card_contain.innerHTML+`<div data-anchin = ${folder} class="card ">
                            <div class="play-btn">
                                <img src="img/play.svg" alt="play">
                            </div>
                            <img src=${Mresponse.image} alt="playlist">
                            <h2>${Mresponse.heading} </h2>
                            <p>${Mresponse.description}</p>
                        </div>`
            }
        // }
    }
    Array.from(document.getElementsByClassName('card')).forEach((e) => {
        e.addEventListener('click', async (item) => {
            // console.log('e');
            await getSongs(`songs/${item.currentTarget.dataset.anchin}`);
            play =document.querySelector('#play');
            //This is done so that if we click on some another folder when the song is played the image shoud changeb back to pause
            if (play.getAttribute('src') == 'playbar_images/pause.svg'){
                play.setAttribute('src','playbar_images/play.svg');
            }
           
        });
    });
    
}

function playMusic(track, pause = false) {
    track.replaceAll('%20',' ')
    document.querySelector('.songInfoPlaybar').innerText = track;
    document.querySelector('.songTime').innerHTML = '00:00 / 00:00';
    let url = `${currentFolder}/`;
    let ext = '_64(PagalWorld.com.sb).mp3';
    track = url + track + ext;
    // console.log(`this is currentsrc ${currentSong.src}, this is track ${track}`);
    currentSong.src = track;
    // console.log(track);
    if (!pause) {
        currentSong.play();
        play.src = 'playbar_images/pause.svg';
    }
    
}

//main function start here

async function main() {
    await getSongs('songs/NCS');

    displayAlbum();
    //attach event listener to play next and previous
    play.addEventListener('click',()=>{

        if(currentSong.paused){
            currentSong.play();
            play.src='playbar_images/pause.svg';
        }else{
            currentSong.pause();
            play.src='playbar_images/play.svg'
        }
    })
    //load the playlist whenever a card is clicked
    // console.log(document.getElementsByClassName('card')) 
    
    //listen for timeupdateEvent
    currentSong.addEventListener('timeupdate', () => {
        let cntTime = '00:00';
        let totalTime = '00:00';
        if (Math.floor(currentSong.currentTime % 60) < 10) {
            cntTime = `0${Math.floor(currentSong.currentTime / 60)}:0${Math.floor(currentSong.currentTime % 60)}`;
        } else {
            cntTime = `0${Math.floor(currentSong.currentTime / 60)}:${Math.floor(currentSong.currentTime % 60)}`;
        }
        if (isNaN(currentSong.duration / 60)) {
            totalTime = '00:00';
        } else if (Math.floor(currentSong.duration % 60) < 10) {
            totalTime = `0${Math.floor(currentSong.duration / 60)}:0${Math.floor(currentSong.duration % 60)}`;
        } else {
            totalTime = `0${Math.floor(currentSong.duration / 60)}:${Math.floor(currentSong.duration % 60)}`;
        }

        document.querySelector('.songTime').innerHTML = `${cntTime} / ${totalTime}`;
        // console.log(currentSong.currentTime, currentSong.duration);

        document.querySelector('.circle').style.left = `${(currentSong.currentTime / currentSong.duration) * 100}%`;
        // document.querySelector('.seeked').style.width = `${(currentSong.currentTime/currentSong.duration)*100}%`;
        // console.log(currentSong.currentTime);
        let index = songs.indexOf(currentSong.src.split(`/${currentFolder}/`)[1]);
        if (currentSong.duration == currentSong.currentTime && index<songs.length-1) {
        
        playMusic(songs[index + 1].replaceAll('%20', ' ').split('_64(PagalWorld.com.sb)')[0]);
        }
    })
    //add an event listener to seek bar
    document.querySelector('.seekbar').addEventListener('click', (e) => {
        document.querySelector('.circle').style.left = `${(e.offsetX / e.target.getBoundingClientRect().width) * 100}%`;
        currentSong.currentTime = (e.offsetX / e.target.getBoundingClientRect().width) * currentSong.duration;
        // document.querySelector('.seeked').style.width = `${(e.offsetX/e.target.getBoundingClientRect().width)*100}%`;
    })
    //add a event listeenr to previous and next
    previous.addEventListener('click', () => {

        let index = songs.indexOf(currentSong.src.split(`/${currentFolder}/`)[1]);
        if (index > 0) {
            playMusic(songs[index - 1].replaceAll('%20', ' ').split('_64(PagalWorld.com.sb)')[0]);
        } else {
            playMusic(songs[songs.length - 1].replaceAll('%20', ' ').split('_64(PagalWorld.com.sb)')[0]);
        }

    })
    next.addEventListener('click', () => {
        
        let index = songs.indexOf(currentSong.src.split(`/${currentFolder}/`)[1]);
        if (index < songs.length - 1) {
            playMusic(songs[index + 1].replaceAll('%20', ' ').split('_64(PagalWorld.com.sb)')[0]);
        }
        else {
            playMusic(songs[0].replaceAll('%20', ' ').split('_64(PagalWorld.com.sb)')[0]);
        }
    });
    //add and event to volume
    document.querySelector('#volume').addEventListener('change', (e) => {
        currentSong.volume = e.target.value / 100;
        // console.log(document.querySelector('.volume img').src)
        if (document.querySelector('.volume img').src.includes('img/mute.svg')){
            document.querySelector('.volume img').src = 'img/volume.svg';
        }

    })
    //mute 
    document.querySelector('.volume img').addEventListener('click',(ev)=>{
        if (ev.target.src.includes('img/volume.svg')){
            currentSong.volume = 0;
            ev.target.src = 'img/mute.svg'
            document.querySelector('#volume').value = 0;
        }else{
            currentSong.volume = 30/100;
            ev.target.src = 'img/volume.svg';
            document.querySelector('#volume').value = 30;
            
        }
    })

}

main();
//hamburger functionality
let hamburger = document.querySelector('.hamburger');
let left1 = document.querySelector('.left');
hamburger.addEventListener('click', (e) => {

    left1.style.left = '0';
});
let cross = document.querySelector('.close');
cross.addEventListener('click', () => {
    left1.style.left = '-100%';
});






















////waste 
// songs = await getSongs('songs/NCS');


    // console.log(songs);
    // let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0];
    // songUL.innerHTML = '';
    // for (const song of songs) {
    //     // console.log(song);
    //     // const newLi = document.createElement('li');
    //     // let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0];
    //     // newLi.textContent = song.replaceAll('%20',' ').split('_64(PagalWorld.com.sb)')[0];
    //     // songUL.appendChild(newLi);
    //     //show all the songs in the playlist
    //     songUL.innerHTML = songUL.innerHTML + 
    //                     `<li>  
    //                         <div class="songInfo rounded">
    //                             <img src="music.svg" alt="music" class="invert">
    //                             <div>${song.replaceAll('%20', ' ').split('_64(PagalWorld.com.sb)')[0]}</div>
    //                         </div>
    //                         <div class="playNow">
    //                             <span>Play Now</span>
    //                             <img src="playbar_images/play.svg" alt="play" class="invert">
    //                         </div>
    //                     </li>`;
    // }
    //play the firstsong
    // var audio = new Audio(songs[0]);
    // audio.play();
    // if (currentSong.src===''){
    //     let t = document.querySelector('.songList').getElementsByTagName('li')[0].querySelector('.songInfo').getElementsByTagName('div')[0].innerText;
    //     playMusic(t,true);

    // }
    // // console.log(Array.from(document.querySelector('.songList').getElementsByTagName('li')));
    // Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach((e)=>{
    //     let songdiv = e.querySelector('.songInfo').getElementsByTagName('div')[0];
    //     e.addEventListener('click',()=>{
    //         // console.log(songdiv.innerText);
    //         playMusic(songdiv.innerText);
    //     });

    // });
    // let play = document.getElementById('play')
