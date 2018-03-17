import React from "react";
import "./SearchBar.css";

const sortByOptions = {
  "bestMatch": "best_match",
  "highestRated": "rating",
 " mostReviewed": "review_count"
};

class SearchBar extends React.Component{
  renderSortByOptions(){
    return Object.keys(sortByOptions).map(option => {
      let sortByOptionValue = sortByOptions[option];
      return(<li key="sortByOptionValue">{option}</li>)
    });
  }
  render() {
    return(
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            <renderSortByOptions/>
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" />
          <input placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;