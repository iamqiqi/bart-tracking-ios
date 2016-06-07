import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';
import { SegmentedControlIOS } from 'react-native';

export default class CarsTimeToggle extends Component {
  render() {

    const { currentStation, actions, stationListData, carsTimeFilter } = this.props;

    return (
      <SegmentedControlIOS
        values={['Time', 'Cars']}
        selectedIndex={0}
        onChange={(event) => { actions.setCarsTimeFilter((event.nativeEvent.value).toUpperCase()) }}
      />
    );
  }
}

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
    carsTimeFilter: state.carsTimeFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(CarsTimeToggle);
