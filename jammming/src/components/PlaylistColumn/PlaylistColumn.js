import React from "react";
import "./PlaylistColumn.css";
import TrackList from "../TrackList/TrackList";

class PlaylistColumn extends React.Component{
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  render(){
    return(
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={this.props.playlistName}/>
        <TrackList tracks={this.props.playlistTracks} 
                   onRemove={this.props.onRemove}
                   isRemoval={true}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlaylistColumn;