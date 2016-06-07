import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';
import { View, Text, StyleSheet, Dimensions} from 'react-native';

export default class Trainline extends Component {
  lineClickHandler(line) {
    const { actions, lineFilter } = this.props;
    if (lineFilter === 'All')
      actions.setLineFilter(line);
    else
      actions.setLineFilter('All');
  }

  render() {
    const { currentStation, actions, stationListData, carsTimeFilter, directionFilter, lineFilter } = this.props;
    let stationInfo = 'Loading...';
    let lines = {};
    if (stationListData[currentStation]) {
      stationInfo = stationListData[currentStation];
      lines = stationInfo.lines;
    }

    return (
      <View style={styles.container}>
        {Object.keys(lines).map((lineAbbr) => {
          return (
            (directionFilter === 'All' || directionFilter === lines[lineAbbr].direction) &&
            (lineFilter === 'All' || lineFilter === lines[lineAbbr].color) &&
            <View key={lineAbbr} style={ styles.trainLineBlock }>
              <Text onClick={()=> this.lineClickHandler(lines[lineAbbr].color)} style={ styles[lines[lineAbbr].color] }>
                  { lines[lineAbbr].name }
              </Text>
              { carsTimeFilter === 'TIME' && <View style={ styles.trainLineDetailsWrapper }>
                {lines[lineAbbr].trains.map((train) => {
                  if (isNaN(train.time))
                    return <Text key={train.id} style={ styles.trainLineDetails }>{ train.time }</Text>;
                  else
                    return <Text key={train.id} style={ styles.trainLineDetails }>{ train.time } min</Text>;
                })}
              </View> }

              { carsTimeFilter === 'CARS' && <View style={ styles.trainLineDetailsWrapper }>
                {lines[lineAbbr].trains.map((train) => {
                  return <Text key={train.id} style={ styles.trainLineDetails }>{ train.carCount } cars</Text>;
                })}
              </View> }
            </View>
          )
        })}
      </View>
    );
  }
}

const lineName = {
  padding: 10,
  fontSize: 25,
  fontWeight: 'bold',
  color: 'white',
  alignSelf: 'stretch',
  textAlign: 'center',
};

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },

  trainLineBlock: {
    alignSelf: 'stretch',
  },

  trainLineDetails: {
    width: width * .33,
    padding: 15,
    fontSize: 20,
    alignSelf: 'auto',
    textAlign: 'center',
  },

  trainLineDetailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },

  BLUE: {
    ...lineName,
    backgroundColor: '#1575D5'
  },

  YELLOW: {
    ...lineName,
    backgroundColor: '#E6E600'
  },

  RED: {
    ...lineName,
    backgroundColor: '#E93939'
  },

  GREEN: {
    ...lineName,
    backgroundColor: '#51BF16'
  },

  ORANGE: {
    ...lineName,
    backgroundColor: '#F7B016'
  },

  GRAY: {
    ...lineName,
    backgroundColor: 'gray'
  },
});

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
    carsTimeFilter: state.carsTimeFilter,
    directionFilter: state.directionFilter,
    lineFilter: state.lineFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(Trainline);
