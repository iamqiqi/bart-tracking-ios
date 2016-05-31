import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
//import Trainline from '../components/Trainline';
//import CarsTimeToggle from '../components/CarsTimeToggle';
//import DirectionFilters from '../components/DirectionFilters';
//import Schedule from '../components/Schedule';

import {
  AppRegistry,
  Text,
  View
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View>
        <Text>Hello</Text>
        <Header />
      </View>
    );
  }
}

function select(state) {
  return {};
}

export default connect(select)(App);
