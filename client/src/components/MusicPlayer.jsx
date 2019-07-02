import React from 'react';
import axios from 'axios';

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
      songButton: 'play'
    };

    this.clickPlay = this.clickPlay.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/songs/1`)
      .then(res => {
        console.log(res.data);
        audio = new Audio(res.data['song_url']);
        audio.addEventListener('loadedmetadata', () => {
          this.setState({
            songLength: audio.duration + 1,
            songArtist: res.data.song_artist,
            songTitle: res.data.song_title,
            songAlbum: res.data.song_album,
            songURL: audio,
            user: res.data.user,
            userComment: res.data.user_comment,
            songRelease: res.data.song_release,
            songTags: res.data.song_tags,
            songLength: res.data.song_length,
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
        songButton: 'pause',
        songPlay: true
      });

      this.songTime = setInterval(() => {
        this.setState({
          songCurrentTime: audio.currentTime
        });

        if (audio.ended) {
          this.setState({
            songButton: 'play',
            songPlay: false
          });
          clearInterval(this.songTime);
        }
      }, 1000);
    } else {
      audio.pause();
      this.setState({
        songButton: 'play',
        songPlay: false
      });
      clearInterval(this.songTime);
    }
  }

  render() {
    return (
      <div>
        <div className="music-player">
          <button
            className="song-button"
            src={this.state.songButton}
            onClick={this.clickPlay}
          />

          <div className="song-info">
            <div className="song-artist-album">{this.state.songArtist}</div>
            <div className="song-title">{this.state.songTitle}</div>
            <div className="song-album">In album: {this.state.songAlbum}</div>
          </div>

          <img className="song-thumbnail" src={this.state.songThumbnail} />
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
