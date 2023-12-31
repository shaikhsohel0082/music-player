//light mode to dark mode
const themeButton = document.querySelector(".theme");
themeButton.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    document.getElementById("theme-icon").classList.remove("fa-toggle-off");
    document.getElementById("theme-icon").classList.add("fa-toggle-on");
    document.getElementById("controls").style.backgroundColor = "#363636";
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    document.getElementById("theme-icon").classList.remove("fa-toggle-on");
    document.getElementById("theme-icon").classList.add("fa-toggle-off");
    document.getElementById("controls").style.backgroundColor = "white";
  }
});

//creating a JSON which contains all songs
songs = [
  {
    id: 1,
    title: "Desi Kalakaar",
    genre: "Hip Hop",
    aud: "songs/desi-kalakar.mpeg",
    image:
      "https://www.pianodaddy.com/sttorage/2014/09/Desi-Kalakaar-Yo-Yo-Honey-Singh.jpg",
    artist: "Honey Singh",
    duration: { min: 4, sec: 32 },
  },
  {
    id: 2,
    title: "Arjan Vailly",
    genre: "Pop",
    aud: "songs/argen-valley.mpeg",
    image:
      "https://i.cdn.newsbytesapp.com/images/l39020231118120754.jpeg?tr=w-480",
    artist: "Manan Bhardwaj, Bhupinder Babbal",
    duration: { min: 3, sec: 0 },
  },
  {
    id: 3,
    title: "Sadda Haq",
    genre: "Rock",
    aud: "songs/sada-haq.mp3",
    image: "https://i.ytimg.com/vi/n6mraYuSELU/maxresdefault.jpg",
    artist: "Mohit Chauhan",
    duration: { min: 2, sec: 3 },
  },
  {
    id: 4,
    title: "Kahani Suno 2.0",
    genre: "Pop",
    aud: "songs/kahani-suno.mp3",
    image:
      "https://www.desiblitz.com/wp-content/uploads/2023/02/kaifi-khalil-kahani-suno-2-0-official-music-video.jpg",
    artist: "Kaifi Khalil",
    duration: { min: 2, sec: 53 },
  },
  {
    id: 5,
    title: "Ek Din Pyar",
    genre: "Hip Hop",
    aud: "songs/ek-din-pyar.mp3",
    image:
      "https://imagestore.ffm.to/link/776e21c392f8b448977741552921bc71.jpg",
    artist: "MC Stan",
    duration: { min: 4, sec: 32 },
  },
  {
    id: 6,
    title: "Tum Hi Ho",
    genre: "Pop",
    aud: "songs/tum-hi-ho.mp3",
    image: "https://i.ytimg.com/vi/IJq0yyWug1k/hqdefault.jpg",
    artist: "Arijit Singh",
    duration: { min: 2, sec: 21 },
  },
  {
    id: 7,
    title: "Dolby walya",
    genre: "Rock",
    aud: "songs/dolby-walya.mp3",
    image: "https://i.ytimg.com/vi/w-ciWkHZBF4/maxresdefault.jpg",
    artist: "Earl D'Souza, Earl Edgar, and Nagesh Morwekaar",
    duration: { min: 4, sec: 50 },
  },
  {
    id: 8,
    title: "Wajah Tum Ho",
    genre: "Pop",
    aud: "songs/wajah-tum-ho.mp3",
    image: "https://s1.dmcdn.net/v/CX6TY1MOq_J12Tn5A/x720",
    artist: "Arman Malik",
    duration: { min: 4, sec: 36 },
  },
];
const songImage = document.getElementById("song-img");
const songName = document.getElementById("song-name");
const singer = document.getElementById("singer");
const playButton = document.getElementById("play-btn");
const myAudio = document.getElementById("myAudio");
const songDuration = document.getElementById("timer");
const rightButton = document.getElementById("right-btn");
const leftButton = document.getElementById("left-btn");
const currentindex = 0;
let isPlaying = false;
function mplayer(currentindex, isPlaying) {
  const { id, title, genre, aud, duration, artist, image } =
    songs[currentindex];

  function playsongs() {
    let timeSetFun;
    let seconds = 0;
    let minutes = 0;

    function setCard() {
      songImage.src = image;
      songName.textContent = title;
      singer.textContent = artist;
      myAudio.src = aud;
      songDuration.textContent =
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds) +
        "/" +
        (duration.min < 10 ? "0" + duration.min : duration.min) +
        ":" +
        (duration.sec < 10 ? "0" + duration.sec : duration.sec);
      playButton.addEventListener("click", () => {
        if (!isPlaying) {
          setTimer(duration);
          playButton.classList.remove("fa-play");
          playButton.classList.add("fa-pause");
          myAudio.play();
          isPlaying = true;
        } else {
          playButton.classList.add("fa-play");
          playButton.classList.remove("fa-pause");
          myAudio.pause();
          isPlaying = false;
          clearInterval(timeSetFun);
        }
      });
      // next and previous songs

      rightButton.addEventListener("click", () => {
        isPlaying = false;
        playButton.classList.add("fa-play");
        playButton.classList.remove("fa-pause");
        clearInterval(timeSetFun);
        leftButton.disabled = false;
        if (currentindex < songs.length - 1) {
          mplayer(++currentindex, false);
        } else {
          rightButton.disabled = true;
        }
      });
      leftButton.addEventListener("click", () => {
        isPlaying = false;
        playButton.classList.add("fa-play");
        playButton.classList.remove("fa-pause");
        clearInterval(timeSetFun);
        rightButton.disabled = false;
        if (currentindex > 0) {
          mplayer(--currentindex, false);
        } else {
          leftButton.disabled = true;
        }
      });
      const addButton = document.getElementById("add-btn");
      addButton.addEventListener("click", () => {
        addsongToPlayList(currentindex);
      });
    }
    setCard();
    function setTimer(dur) {
      timeSetFun = setInterval(() => {
        seconds++;
        if (seconds >= 59) {
          seconds = 0;
          minutes++;
        }
        songDuration.textContent =
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds) +
          "/" +
          (duration.min < 10 ? "0" + duration.min : duration.min) +
          ":" +
          (duration.sec < 10 ? "0" + duration.sec : duration.sec);

        if (minutes >= duration.min && seconds >= duration.sec) {
          clearInterval(timeSetFun);
          playButton.classList.add("fa-play");
          playButton.classList.remove("fa-pause");
        }
      }, 1000);
    }
  }
  playsongs();
}

//display songs

const allSongEle = document.getElementById("display-songs");
const genreFilterEle = document.getElementById("genre-filter");
function displaySongs() {
  for (let i = 0; i < songs.length; i++) {
    const s = document.createElement("div");
    const para = document.createElement("p");
    para.textContent = songs[i].title;
    s.append(para);
    s.addEventListener("click", () => {
      mplayer(i, false);
    });
    allSongEle.append(s);
  }
}
displaySongs();
genreFilterEle.addEventListener("change", () => {
  allSongEle.innerHTML = ""; // Clear the previous content
  if (genreFilterEle.value === "All") {
    displaySongs();
  }

  for (let i = 0; i < songs.length; i++) {
    if (
      songs[i].genre.trim().toLowerCase() ===
      genreFilterEle.value.trim().toLowerCase()
    ) {
      const s = document.createElement("div");
      const para = document.createElement("p");
      para.textContent = songs[i].title;
      s.append(para);
      s.addEventListener("click", () => {
        mplayer(i, false);
      });
      allSongEle.append(s);
    }
  }
});
function getIdByTitle(tit, index) {
  if (songs[index].title === tit) {
    return songs[index].id;
  }
}
function clearCard() {}

mplayer(0, false);
//creating playlists
const playlistName = document.getElementById("playlist-input");
const createPlayListButton = document.getElementById("create-playlist");
const playListContainer = document.getElementById("div3-1");
let playListJSON = [];
let currentPlayList = 0;

createPlayListButton.addEventListener("click", () => {
  const playlistNameValue = playlistName.value.trim();

  // Check if a playlist with the same name already exists
  const playlistExists = playListJSON.some(
    (playlist) => playlist.name === playlistNameValue
  );

  if (!playlistExists && playlistNameValue !== "") {
    playListJSON.push({
      name: playlistNameValue,
      song: [],
    });

    const innerDiv = document.createElement("div");
    const para = document.createElement("p");
    para.textContent = playlistNameValue;
    innerDiv.append(para);
    playListContainer.append(innerDiv);
    playlistName.value = "";

    // Increment currentPlayList after creating a new playlist
    currentPlayList++;
  } else {
    if (playlistExists) {
      console.error("Playlist with the same name already exists.");
    } else {
      console.error("Playlist name cannot be empty.");
    }
  }
});

function addsongToPlayList(index) {
  const addButton = document.getElementById("add-btn");

  if (currentPlayList > 0) {
    const currentPlaylist = playListJSON[currentPlayList - 1];

    // Check if the song already exists in the playlist
    if (!currentPlaylist.song.includes(songs[index].title)) {
      currentPlaylist.song.push(songs[index].title);

      // Clear existing content in playListContainer
      playListContainer.innerHTML = "";

      for (let i = 0; i < playListJSON.length; i++) {
        const playlistDiv = document.createElement("div");
        const playlistNamePara = document.createElement("p");
        playlistNamePara.textContent = playListJSON[i].name;
        playlistDiv.append(playlistNamePara);

        const songListDiv = document.createElement("div");
        for (let j = 0; j < playListJSON[i].song.length; j++) {
          const songDiv = document.createElement("div");
          songDiv.innerHTML = playListJSON[i].song[j];

          songListDiv.append(songDiv);
        }
        playlistDiv.append(songListDiv);

        playListContainer.append(playlistDiv);
      }

      // Remove the event listener after adding the song
      addButton.removeEventListener("click", addsongToPlayList);
    } else {
      console.error("Song already exists in the playlist.");
    }
  } else {
    console.error("No playlist created. Create a playlist first.");
  }
}

// Attach the event listener to the button
const addButton = document.getElementById("add-btn");
addButton.addEventListener("click", () => {
  addsongToPlayList(currentIndex);
});
function getSongByName(songName) {
  let num = 0;
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].title.trim().toLowerCase() === songName) {
      num = i;
    }
  }
  return num;
}

//search a song
const searchInputEle = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", () => {
  let searchInput = searchInputEle.value.trim().toLowerCase();
  let searchInputId = getSongByName(searchInput);
  mplayer(searchInputId);
});
