import React from 'react';
import css from '../styles/MusicPlayer.css';
import axios from 'axios';

import SongBars from './SongBars.jsx';

let audio;

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songArtist: '',
      songTitle: '',
      songAlbum: '',
      songURL: '',
      user: '',
      userComment: '',
      songRelease: '',
      songTags: '',
      songLength: 0,
      songThumbnail: '',
      songID: 1,
      songCurrentTime: 0,
      songPlay: false,
      songButton:
        'https://music-player-service.s3-us-west-1.amazonaws.com/play-button.png'
    };

    this.getSong = this.getSong.bind(this);
    this.clickPlay = this.clickPlay.bind(this);
    this.measureSongDuration = this.measureSongDuration.bind(this);
    this.measureCurrentDuration = this.measureCurrentDuration.bind(this);
  }

  componentDidMount() {
    this.getSong();
  }

  getSong() {
    axios
      .get(`/api/songs/1`)
      .then(res => {
        console.log('RES DATA', res.data);
        audio = new Audio(res.data['song_url']);
        audio.addEventListener('loadedmetadata', () => {
          this.setState({
            songArtist: res.data.song_artist,
            songTitle: res.data.song_title,
            songAlbum: res.data.song_album,
            songURL: audio,
            user: res.data.user,
            userComment: res.data.user_comment,
            songRelease: res.data.song_release,
            songTags: res.data.song_tags,
            songLength: audio.duration,
            songThumbnail: res.data.song_thumbnail,
            songID: 1,
            songPlay: false
          });
        });
      })
      .catch(err => {
        throw err;
      });
  }

  clickPlay(event) {
    if (!this.state.songPlay) {
      audio.play();
      this.setState({
        songButton:
          'https://music-player-service.s3-us-west-1.amazonaws.com/pause-button.png',
        songPlay: true
      });

      this.songTime = setInterval(() => {
        this.setState({
          songCurrentTime: audio.currentTime
        });

        if (audio.ended) {
          this.setState({
            songButton:
              'https://music-player-service.s3-us-west-1.amazonaws.com/play-button.png',
            songPlay: false
          });
          clearInterval(this.songTime);
        }
      }, 1000);
    } else {
      audio.pause();
      this.setState({
        songButton:
          'https://music-player-service.s3-us-west-1.amazonaws.com/play-button.png',
        songPlay: false
      });
      clearInterval(this.songTime);
    }
  }

  measureSongDuration(songLength) {
    const mins = Math.floor(songLength / 60);
    const secs = (songLength - mins * 60).toString().substr(0, 1);
    const duration = `${mins}:${secs < 10 ? '0' + secs : secs}`;
    return duration;
  }

  measureCurrentDuration(songCurrentTime) {
    const currentMin = parseInt(songCurrentTime / 60) % 60;
    const currentSec = (songCurrentTime % 60).toFixed();
    const currentDuration = `${currentMin}:${
      currentSec < 10 ? '0' + currentSec : currentSec
    }`;
    return currentDuration;
  }

  render() {
    return (
      <div>
        <div className="music-player">
          <div className="button-grid">
            <img
              className="song-button"
              src={this.state.songButton}
              onClick={this.clickPlay}
            />
          </div>

          <div className="song-info">
            <div className="song-artist-album">{this.state.songArtist}</div>
            <div className="song-title">{this.state.songTitle}</div>
            <div className="song-artist-album">
              In album: {this.state.songAlbum}
            </div>
          </div>

          <img className="song-thumbnail" src={this.state.songThumbnail} />

          <div className={'date-tag-grid'}>
            <div className={'song-release'}>{this.state.songRelease}</div>
          </div>

          <div className={'date-tag-grid'}>
            <div className={'song-tags'}># {this.state.songTags}</div>
          </div>

          <div className={'duration-grid'}>
            <div className={'song-current-time'}>
              {this.measureCurrentDuration(this.state.songCurrentTime)}
            </div>

            <div className={'song-length'}>
              {this.measureSongDuration(this.state.songLength)}
            </div>

            <div>
              <SongBars />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
