import React, { Component } from "react";

const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";

class App extends Component {
  state = { artistQuery: "", artist: null, tracks: [] };

  updateArtistQuery = event => {
    this.setState({ artistQuery: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.searchArtist();
    }
  };

  searchArtist = () => {
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
      .then(response => response.json())
      .then(json => {
        if (json.artists.total > 0) {
          const artist = json.artists.items[0];

          this.setState({ artist });

          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then(response => response.json())
            .then(json => this.setState({ tracks: json.tracks }))
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error.message));

    console.log(this.state.results);
  };

  render() {
    console.log("this state", this.state);
    return (
      <div>
        <h2>Music Master</h2>
        <input
          onChange={this.updateArtistQuery}
          onKeyPress={this.handleKeyPress}
          placeholder="Search for an Artist"
        />
        <button onClick={this.searchArtist}>Search</button>
      </div>
    );
  }
}

export default App;
