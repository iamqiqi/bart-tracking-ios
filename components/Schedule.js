import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';
import { getSchedule, processSchedule } from '../helpers/bartApi';

export default class Schedule extends Component {
  constructor(props) {
    super();
    this.state = { showDetails: false, details: {} };
  }
  
  handleTimeClick(details) {
    this.setState({showDetails: true, details});
  }
  
  render() {

    const { stationListData, currentStation, destStation, scheduleData, actions } = this.props;

    let destSelectElement;
    let { showDetails, details } = this.state;

    return (
      <div className="schedule">
        <div>
          destination: 
          <select className="form-control" ref={(elem) => { destSelectElement = elem }} onChange={()=> {
              var endStation = destSelectElement.value;
              if (endStation) {
                actions.setDestStation(destSelectElement.value);
                if (currentStation && currentStation !== "") {
                  getSchedule( currentStation, endStation, (xml) => {
                    let schedule = processSchedule(xml);
                    actions.updateScheduleData(schedule);
                  });
                }
              }
            }
          }>
            <option>--select--</option>
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
              return <option key={ stationAbbr } value={ stationAbbr }>{ stationListData[stationAbbr].name }</option>
            })}
          </select>
        </div>
        <div>
          estimated arrival time
            { scheduleData.map(({departure, arrival, details}) => {
                return (
                  <div>
                    <button key={ departure + arrival } value={ departure + arrival } onClick={(e) => this.handleTimeClick(details)}>{departure} - {arrival}</button>
                  </div>
                );
              })
            }
            <button onClick={() => {
              if (currentStation && destSelectElement.value ) {
                var schedule = getSchedule( currentStation, destSelectElement.value, (xml) => {
                  let schedule = processSchedule(xml);
                  actions.setDestStation(destSelectElement.value);
                  actions.updateScheduleData(schedule);
                });
              }
            }}>refresh</button>
            {
              showDetails && <div>
                details here
                <ul>
                  { details.map((detail) => {
                      return(
                        <li> departure: {detail.origin} at { detail.origTimeMin } - arrive { details.destination } at { detail.origTimeMin }. Direction: {detail.trainHeadStation}</li>
                      );
                    })
                  }
              </ul>
              </div>
            }
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
    destStation: state.destStation,
    scheduleData: state.scheduleData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(Schedule);