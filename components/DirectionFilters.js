import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';
import { AppRegistry, SegmentedControlIOS } from 'react-native';

export default class DirectionFilters extends Component {

  render() {
    const { currentStation, actions, stationListData, directionFilter } = this.props;

    return (
      <SegmentedControlIOS
        values={['All', 'North', 'South']}
        selectedIndex={0}
        onChange={(event) => {
          actions.setDirectionFilter(event.nativeEvent.value);
        }}
      />
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