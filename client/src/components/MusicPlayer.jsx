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
    axios.get('/api/songs/1').then(res => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        <h1>Music Player Service</h1>
      </div>
    );
  }
}

export default MusicPlayer;
