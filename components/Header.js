import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';
import { AppRegistry, View, Text, Picker } from 'react-native';

export default class Header extends Component {
  render() {

    const { currentStation, actions, stationListData } = this.props;

    let stationName = 'Loading...';
    if (stationListData[currentStation]) {
      stationName = stationListData[currentStation].name;
    }

    return (
      <View>
        <Text>
          { stationName }
        </Text>
        <Picker
          selectedValue = { currentStation }
          onValueChange = {(itemValue) => { actions.setCurrentStation(itemValue) }}
        >
          {Object.keys(stationListData).sort((a, b) => {
              if (stationListData[a].name < stationListData[b].name) {
                return -1;
              }
              if (stationListData[a].name > stationListData[b].name) {
                return 1;
              }
              // a must be equal to b
              return 0;
          }).map((stationAbbr) => {
            return <Picker.Item key={stationAbbr} label={ stationListData[stationAbbr].name } value={ stationAbbr } />
          })}
        </Picker>
      </View>
    );
  }
}

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(Header);