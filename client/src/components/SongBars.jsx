import React from 'react';
import styles from '../styles/SongBars.css';

class SongBars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="bars">
          {this.props.songBars.map((bar, index) => {
            if (this.props.songCurrentTime > index) {
              return (
                <div
                  className="bar"
                  key={index}
                  style={{
                    height: bar,
                    background: 'linear-gradient(#ff6400, #ff3500)'
                  }}
                  onClick={() => this.props.skipToTime(index)}
                />
              );
            } else {
              return (
                <div
                  className="bar"
                  key={index}
                  style={{ height: bar }}
                  onClick={() => this.props.skipToTime(index)}
                />
              );
            }
          })}
        </div>

        <div className="bars-inverse">
          {this.props.songBars.map((bar, index) => {
            if (this.props.songCurrentTime > index) {
              return (
                <div
                  className="bar-inverse"
                  key={index}
                  style={{
                    height: bar / 3,
                    background: 'linear-gradient(#f7b589, #f7b4a3)'
                  }}
                />
              );
            } else {
              return (
                <div
                  className="bar-inverse"
                  key={index}
                  style={{ height: bar / 3 }}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default SongBars;
