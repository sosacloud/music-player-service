import React from 'react';
import css from '../styles/MusicPlayer.css';
import axios from 'axios';
import TimeAgo from 'react-timeago';

import SongBars from './SongBars.jsx';

let audio;

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    const barGenerator = () => {
      let bars = [];
      for (let i = 0; i <= 240; i++) {
        const bar = Math.floor((Math.random() + 1) * 35);
        bars.push(bar);
      }
      return bars;
    };

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
        'https://music-player-service.s3-us-west-1.amazonaws.com/play-button.png',
      songBars: barGenerator()
    };

    this.getSong = this.getSong.bind(this);
    this.clickPlay = this.clickPlay.bind(this);
    this.measureSongDuration = this.measureSongDuration.bind(this);
    this.measureCurrentDuration = this.measureCurrentDuration.bind(this);
    this.skipToTime = this.skipToTime.bind(this);
  }

  componentDidMount() {
    this.getSong();
  }

  getSong() {
    let id = window.location.pathname.slice(
      1,
      window.location.pathname.length - 1
    );

    if (id) {
      id = Number(id);
    } else {
      id = this.state.songID;
    }

    axios
      .get(`/api/songs/${id}`)
      .then(res => {
        // console.log('RES DATA', res.data);
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
    const secs = Math.floor(songLength - mins * 60)
      .toString()
      .substr(0, 2);
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

  skipToTime(time) {
    audio.currentTime = time * (this.state.songLength / 241);
    this.setState({
      currentTime: audio.currentTime
    });
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
            <TimeAgo className={'song-release'} date={this.state.songRelease} />
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

            <div className={'song-bars'}>
              <SongBars
                songBars={this.state.songBars}
                songLength={this.state.songLength}
                songCurrentTime={this.state.songCurrentTime}
                songPlay={this.state.songPlay}
                measureSongDuration={this.measureSongDuration}
                measureCurrentDuration={this.measureCurrentDuration}
                skipToTime={this.skipToTime}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
