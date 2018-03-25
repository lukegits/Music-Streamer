import React, {
  Component
} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: this.formatTime(0),
      duration: this.formatTime(album.songs[0].duration),
      isPlaying: false,
      currentVolume: 0.5,

    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = this.state.currentVolume;

  }
  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({
          currentTime: this.audioElement.currentTime
        });
      },
      durationchange: e => {
        this.setState({
          duration: this.audioElement.duration
        });
      },
      currentVol: e => {
        this.setState({
          currentVolume: this.audioElement.currentVolume
        });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('currentVol', this.eventListeners.currentVol);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('currentVol', this.eventListeners.currentVol);
  }
  formatTime(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }

  play() {
    this.audioElement.play();
    this.setState({
      isPlaying: true
    });
  }
  pause() {
    this.audioElement.pause();
    this.setState({
      isPlaying: false
    });
  }
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({
      currentSong: song
    });
  }
  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }
  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({
      currentTime: newTime
    });
  }
  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({
      currentVolume: newVolume
    });
  }


  render() {
    console.log(this.audioElement);
    return (

      <
      section className = "album" >
      <
      section id = "album-info" >
      <
      img id = "album-cover-art"
      src = {
        this.state.album.albumCover
      }
      alt = "album-art" / >
      <
      div className = "album-details" >
      <
      h1 id = "album-title" > {
        this.state.album.title
      } < /h1> <
      h2 className = "artist" > {
        this.state.album.artist
      } < /h2> <
      div id = "release-info" > {
        this.state.album.releaseInfo
      } < /div> < /
      div > <
      /section> <
      table id = "song-list" >
      <
      colgroup >
      <
      col id = "song-number-column" / >
      <
      col id = "song-title-column" / >
      <
      col id = "song-duration-column" / >
      <
      /colgroup> <
      tbody >

      {
        this.state.album.songs.map((song, index) =>
          <
          tr className = "song"
          key = {
            index
          }
          onClick = {
            () => this.handleSongClick(song)
          }
          >

          <
          span className = "song-number" >
          <img src="https://i.imgur.com/YsHdG42s.jpg" alt="Paris" />
          {
            index + 1
          }
          < /span>

          <
          td className = "song-actions" >
          <
          button >
           <
          span className = "ion-play" > < /span> <
          span className = "ion-pause" > < /span> < /
          button > <
          /td> <
          td className = "song-title" > {
            song.title
          } < /td>
          <
          td className = "song-duration" > {
            this.formatTime(song.duration)
          } < /td>

          <
          /tr>

        )
      } <
      /tbody> < /
      table > <
      PlayerBar isPlaying = {
        this.state.isPlaying
      }
      currentSong = {
        this.state.currentSong
      }
      currentTime = {
        this.audioElement.currentTime
      }
      duration = {
        this.audioElement.duration
      }
      currentVolume = {
        this.audioElement.currentVolume
      }
      handleSongClick = {
        () => this.handleSongClick(this.state.currentSong)
      }
      handlePrevClick = {
        () => this.handlePrevClick()
      }
      handleNextClick = {
        () => this.handleNextClick()
      }
      handleTimeChange = {
        (e) => this.handleTimeChange(e)
      }
      handleVolumeChange = {
        (e) => this.handleVolumeChange(e)
      }
      formatTime = {
        (s) => this.formatTime(s)
      }
      /> < /
      section >

    )
  }

};

export default Album;
