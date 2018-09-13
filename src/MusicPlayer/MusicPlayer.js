import React, { Component } from "react";
import "./MusicPlayer.css";



class MusicPlayer extends Component {

  render() {
    const question = this.props.question;
    return (
      <div className="musicPlayerDiv">
        <iframe className="musicPlayer"
          src={question.songLink}
          width="300"
          height="80"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
      </div>
    );
  }
}

export default MusicPlayer;
