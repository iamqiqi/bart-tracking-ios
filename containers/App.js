import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TrainLine from '../components/TrainLine';
import CarsTimeToggle from '../components/CarsTimeToggle';
import DirectionFilters from '../components/DirectionFilters';
//import Schedule from '../components/Schedule';

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <ScrollView style={ styles.app }>
        <Header />
        <DirectionFilters />
        <CarsTimeToggle />
        <TrainLine />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  }
});

function select(state) {
  return {};
}

export default connect(select)(App);
