import StationLocations from '../constants/StationLocations';

let uniqueId = 0;

const BARTApi = 'MW9S-E7SL-26DU-VV8V';

export function getBART(callback) {
  const bartRealTimeUri = 'https://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=' + BARTApi;
  console.log(bartRealTimeUri);
  fetch(bartRealTimeUri)
    .then((response) => response.text())
    .then((response) => {
        callback(response);
      })
    .done();
}

export function processBART(data) {
  var stations = {};

  data.station.forEach(function(station) {
    stations[station.abbr] = {
      abbr: station.abbr,
      name: station.name,
      lines: {}
    };

    if (!(station.etd instanceof Array)) {
      station.etd = [ station.etd ];
    }
    station.etd.forEach(function(destination) {
      stations[station.abbr].lines[destination.abbreviation] = {
        abbr: destination.abbreviation,
        name: destination.destination,
        color: "",
        direction: "",
        trains: []
      };

      if (! (destination.estimate instanceof Array)) {
        if (destination.estimate !== null)
          destination.estimate = [ destination.estimate ];
      }

      destination.estimate.forEach(function(estimate) {
          var train = {
            "time": estimate.minutes,
            "carCount": estimate.length,
            "id": uniqueId++,
          };
          stations[station.abbr].lines[destination.abbreviation].trains.push(train);
          if (stations[station.abbr].lines[destination.abbreviation].color === "") {
            stations[station.abbr].lines[destination.abbreviation].color = estimate.color;
            stations[station.abbr].lines[destination.abbreviation].direction = estimate.direction;
          }
      });
    });
  });
  return stations;
}

export function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  }
}

export function getGPSStation(position) {
  var clat = position.coords.latitude;
  var clng = position.coords.longitude;
  var stationAbbr = "";
  var shortest = Infinity;
  for (var station in StationLocations) {
    var slat = StationLocations[station]["lat"];
    var slng = StationLocations[station]["lng"];
    var dlat = clat - slat;
    var dlng = clng - slng;
    var distance = (dlat*dlat)+(dlng*dlng);
    if (shortest > distance) {
      shortest = distance;
      stationAbbr = station;
    }
  }
  return stationAbbr;
}

// export function getSchedule(orig, dest, callback) {
//   var bartScheduleUri = 'https://api.bart.gov/api/sched.aspx?cmd=depart&orig='+ orig + '&dest=' + dest + '&key=' + BARTApi + '&callback=?';
//   fetch(bartScheduleUri)
//     .then((response) => {
//         callback(response);
//       })
//     .done();
// }


// export function processSchedule(data) {

//   var scheduleArray = [];

//   data.schedule.request.trip.forEach(function(schedule) {
//     var details = schedule.leg;
//     if (!Array.isArray(details)) {
//       details = [details];
//     }
//     scheduleArray.push({
//       departure: schedule.origTimeMin,
//       arrival: schedule.destTimeMin,
//       details: details
//     });
//   });
  
//   console.log("returning:", scheduleArray);
//   return scheduleArray;
// }

