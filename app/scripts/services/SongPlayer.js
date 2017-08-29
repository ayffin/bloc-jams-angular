(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    var currentAlbum = Fixtures.getAlbum();
    /*
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;
    /*
    @function playSong
    @desc play the current Buzz and set song playing to true
    @parem {object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    /*
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };
    /*
     * @function getSongIndex
     * @desc to get indexOf a song
     * @param {Object} song
     */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    /*
     * @desc current selected song from song list and making it public
     * @type {Object}
     */
    SongPlayer.currentSong = null;
    /*
     * @function play
     * @desc play the current song which is clicked
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {

        setSong(song);
        playSong(song);

      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };
    /*
     * @function pause
     * @desc pause the current song
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    /*
     * @function previous
     * @desc getting the previous song

     */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }


  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
