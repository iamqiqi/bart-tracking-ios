import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';
import { AppRegistry, View, Text, Picker, TouchableHighlight } from 'react-native';

export default class DirectionFilters extends Component {

  render() {
    const { currentStation, actions, stationListData, directionFilter } = this.props;

    return (
      <View>
        <TouchableHighlight onPress={() => {actions.setDirectionFilter("All")}}><Text>All</Text></TouchableHighlight>
        <TouchableHighlight onPress={() => {actions.setDirectionFilter("North")}}><Text>Northbound</Text></TouchableHighlight>
        <TouchableHighlight onPress={() => {actions.setDirectionFilter("South")}}><Text>Southbound</Text></TouchableHighlight>
      </View>
    );
  }
}

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
    directionFilter: state.directionFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(DirectionFilters);