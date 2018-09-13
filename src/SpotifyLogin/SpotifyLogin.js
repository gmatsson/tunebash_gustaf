import React, { Component } from "react";
import axios from "axios";
import "./SpotifyLogin.css";

class SpotifyLogin extends Component {
  constructor(props) {
    super(props);
    this.getAuth = this.getAuth.bind(this);
    this.state = { loggedIn: false };
  }

  login = callback => {
    var CLIENT_ID = "82c3c3a0508a4fe986a13ae7aaf063f7";
    var REDIRECT_URI = "http://localhost:3000/callback";

    function getLoginURL(scopes) {
      return (
        "https://accounts.spotify.com/authorize?client_id=" +
        CLIENT_ID +
        "&redirect_uri=" +
        encodeURIComponent(REDIRECT_URI) +
        "&scope=" +
        encodeURIComponent(scopes.join(" ")) +
        "&response_type=token"
      );
    }

    var url = getLoginURL(["user-read-email"]);

    var width = 450,
      height = 730;

    window.addEventListener(
      "message",
      function(event) {
        var hash = JSON.parse(event.data);
        if (hash.type === "access_token") {
          callback(hash.access_token);
        }
      },
      false
    );

    window.open(
      url,
      "_self",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height
    );
    
  };

  getUserData = accessToken => {
    axios({
      method: "get",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
  };

  getAuth = () => {
    this.login(function(accessToken) {
      this.getUserData(accessToken).then(function(response) {
        this.setState({loggedIn: true}); 
      });
    });
  };

  

  render() {
    const loggedIn = this.state.loggedIn;
    
    return (
      <div className="spotifyDiv">
        <button className="spotifyButton" onClick={this.getAuth} style={ { display: loggedIn ? 'none' : 'flex'}}>
          Login to Spotify <i className="fa fa-spotify" />
        </button>
      </div>
    );
  }
}

export default SpotifyLogin;
