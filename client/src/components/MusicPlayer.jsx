import React from 'react';
import axios from 'axios';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songArtist: '',
      songTitle: '',
      songURL: '',
      user: '',
      userComment: '',
      songRelease: '',
      songTags: '',
      songLength: 0,
      songThumbnail: '',
      songID: 1,
      songCurrentTime: 0,
      songPlay: false
    };
  }

  componentDidMount() {
    axios
      .get(`/api/songs/1`)
      .then(res => {
        console.log(res.data);
        let audio = new Audio(res.data['song_url']);
        audio.addEventListener('loadedmetadata', () => {
          this.setState({
            songLength: audio.duration + 1,
            songArtist: res.data.song_artist,
            songTitle: res.data.song_title,
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
        console.log(err, 'client: GET not working');
      });
  }

  render() {
    return (
      <div>
        <div className="music-player">
          <button className="button">Play</button>

          <div className="song-info">
            <div className="song-artist-album">{this.state.songArtist}</div>
            <div className="song-title">{this.state.songTitle}</div>
            <div className="song-titleartist-album">
              NEED TO ADD song_album STATE
            </div>
          </div>

          <img className="song-thumbnail" src={this.state.songThumbnail} />
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
