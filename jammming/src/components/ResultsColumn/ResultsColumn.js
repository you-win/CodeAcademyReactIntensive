import React from "react";
import "./ResultsColumn.css";
import TrackList from "../TrackList/TrackList";

class ResultsColumn extends React.Component{
  render(){
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}/>
      </div>
    );
  }
}

export default ResultsColumn;