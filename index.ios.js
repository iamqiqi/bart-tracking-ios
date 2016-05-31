import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles/Styles';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import {
  getBART,
  getSchedule,
  processSchedule,
  processBART,
  getLocation,
  getGPSStation,
} from './helpers/bartApi';
import { updateStationListData, setCurrentStation } from './actions/bart';

const store = configureStore();

getLocation((position) => {
  let defaultStation = getGPSStation(position);
  let action = setCurrentStation(defaultStation);
  store.dispatch(action);
});

const refresh = function () {
  getBART((xml) => {
    var parseString = require('xml2js').parseString;
    parseString(xml, function(err, data) {
      console.log(data);
      let stationListData = processBART(data);
      let action = updateStationListData(stationListData);
      store.dispatch(action);
      setTimeout(refresh, 10000);
    });

  });
};

refresh();

class bartios extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Root store={store} />
      </View>
    );
  }
}

AppRegistry.registerComponent('bartios', () => bartios);