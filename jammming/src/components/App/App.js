import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';
import TitleBar from "../TitleBar/TitleBar";
import SearchBar from "../SearchBar/SearchBar";
import ResultsColumn from "../ResultsColumn/ResultsColumn";
import PlaylistColumn from "../PlaylistColumn/PlaylistColumn";
import SpotifyUtil from "../../utils/SpotifyUtil";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "Playlist Name Here",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(!tracks.includes(track)){
      tracks.push(track);

      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    });
  }

  savePlaylist(){
    let trackUris = this.state.playlistTracks.map(item => item.uri)
    SpotifyUtil.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      playlistName: "New Playlist",
      playlistTracks: []
    });
  }

  search(searchTerm){
    SpotifyUtil.search(searchTerm).then(results => {
      this.setState({
        searchResults: results
      });
    });
  }

  render() {
    return (
      <div className="App">
        <TitleBar/>
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <ResultsColumn searchResults={this.state.searchResults} 
                         onAdd={this.addTrack}/>
          <PlaylistColumn playlistName={this.state.playlistName} 
                          playlistTracks={this.state.playlistTracks} 
                          onRemove={this.removeTrack} 
                          onNameChange={this.updatePlaylistName}
                          onSave={this.savePlaylist}/>
        </div>
      </div>
    );
  }
}

export default App;
