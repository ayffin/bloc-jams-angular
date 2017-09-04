(function() {
  function SongPlayer($rootScope, Fixtures) {
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
    @function stopSong
    @desc stop the current Buzz and set song playing to false
    @parem {object} song
    */
    var stopSong = function(song) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;

    };
    /*
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong(song);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
          SongPlayer.currentVolume = currentBuzzObject.getVolume();
        });
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
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
    SongPlayer.currentTime = null;
    /*
     * @desc Current volume time  of currently playing song
     * @type {Number}
     */
    SongPlayer.currentVolume = 20;
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
          song.playing = true;
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
      var song = currentAlbum.songs[currentSongIndex];
      if (currentSongIndex < 0) {
        stopSong(song);
      } else {

        setSong(song);
        playSong(song);
      }
    };
    /*
     * @function next
     * @desc getting the next song

     */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      var song = currentAlbum.songs[currentSongIndex];
      if (currentSongIndex > currentAlbum.songs.length - 1) {
        stopSong(song);
      } else {

        setSong(song);
        playSong(song);
      }
    };
    /*
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };
    /*
     * @function setCurrentVolume
     * @desc Set current volume of currently playing song
     * @param {Number} volume
     */
    SongPlayer.setCurrentVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }
    };
    return SongPlayer;
  }



  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
