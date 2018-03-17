import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusinessList from "./components/businessList/BusinessList";
import SearchBar from "./components/searchBar/SearchBar";

const numberOfBusinessToDisplay = 6;

const business = {
  imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
  name: 'MarginOtto Pizzeria',
  address: '1010 Paddington Way',
  city: 'Flavortown',
  state: 'NY',
  zipCode: '10101',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 90
};

const businesses = [];

for (var i = numberOfBusinessToDisplay; i >= 0; i--) {
  businesses.push(business);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar/>
        <BusinessList businesses={businesses}/>
      </div>
    );
  }
}

export default App;
