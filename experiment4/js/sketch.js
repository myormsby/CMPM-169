let song;

function preload() {
  // Load the song
  song = loadSound('song.mp3');
}

function setup() {
  // Create a button to play/pause the song
  let button = createButton('Play/Pause');
  button.mousePressed(toggleSong);

}

function toggleSong() {
  if (song.isPlaying()) {
    // If the song is playing, pause it
    song.pause();
  } else {
    // If the song is paused, play it
    song.play();
  }
}
