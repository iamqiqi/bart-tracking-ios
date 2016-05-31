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

let parseXmlString = require('react-native').NativeModules.RNMXml.parseString;

getLocation((position) => {
  let defaultStation = getGPSStation(position);
  let action = setCurrentStation(defaultStation);
  store.dispatch(action);
});

const reformatJSON = function (raw) {

  if (raw.content.length === 1 && typeof raw.content[0] == 'string') {
    return raw.content[0];
  } else {
    let formatted = {};
    raw.content.forEach((item) => {
      let value = reformatJSON(item);
      if (!formatted[item.tag]) {
        formatted[item.tag] = value;
      } else {
        if (Array.isArray(formatted[item.tag])) {
          formatted[item.tag].push(value);
        } else {
          formatted[item.tag] = [formatted[item.tag], value];
        }
      }
    })
    return formatted;
  }
};

const refresh = function () {
  getBART((xml) => {
    parseXmlString(xml, false, function(error, data) {
      var formattedData = reformatJSON(data);
      let stationListData = processBART(formattedData);
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
      <View style={ styles.container }>
        <Root store={ store } />
      </View>
    );
  }
}

AppRegistry.registerComponent('bartios', () => bartios);
