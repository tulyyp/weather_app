"use strict";

/* Common Functions used between modules */
var CommonFunctions = {
  randString: function(textLength) {
    // Return random string generated
    // usually we use unique token generated in the server. Here we just simulate unique token generator.
    return (Math.random() + 1).toString(36).substr(2, textLength + 2); // remove `0.`
  }
};
/* Sockets */
var SocketsClass = {
  data: {
    token: null, // socket token
    socket: null, // socket object
    connected: false, // connection status
    server: '54.238.157.9:5666', // socket server
    room_id: 'weather_app',
    status: 'offline' // room join status. "online"; connected to sockets and joinned the room
  },
  init: function() {
    // init token to identify broadcast consumer/client.
    SocketsClass.data.token = SocketsClass.socketToken();
    console.log(SocketsClass.data.token)
    // connect to socket server
    SocketsClass.data.socket = io.connect(SocketsClass.data.server);
    // bind socket events
    SocketsClass.bindings();
    // Join the weather app room
    SocketsClass.join();

  },
  socketToken: function() {
    // generate 5 random 4 char string blocks
    var parts = [CommonFunctions.randString(4), CommonFunctions.randString(4), CommonFunctions.randString(4), CommonFunctions.randString(4)];
    // return blocks
    return parts.join('-');
  },
  bindings: function() {
    // bind socket events
    SocketsClass.data.socket.on('connect', function () {
      // set connection stattus
      SocketsClass.data.connected = true;
    });
    // other events. Not used for this project
    SocketsClass.data.socket.on('announcement', function (data) {
      console.log('Server Announcement: ', data.message);
    });
    SocketsClass.data.socket.on('reconnect', function () {
    });
    SocketsClass.data.socket.on('reconnecting', function () {
    });
    SocketsClass.data.socket.on('error', function () {
    });
  },
  join: function() {
    // Join to weather app room to listen the boradcasted data.
    SocketsClass.data.socket.emit('join', SocketsClass.data.room_id);
  }

};

/* GEO Location */
var GeoOperationAPI = {
  data: {
    city: null,
    country: null,
    countryCode: null,
    lat: null,
    lon: null,
    ip: null
  },
  init: function() {
    // get geo location information
    $.getJSON("http://ip-api.com/json", function (data) {
      // set city
      if (data.city) GeoOperationAPI.data.city = data.city
      // set country
      if (data.country) GeoOperationAPI.data.country = data.country
      // set countryCode
      if (data.countryCode) GeoOperationAPI.data.countryCode = data.countryCode
      // set lat
      if (data.lat) GeoOperationAPI.data.lat = data.lat
      // set lon
      if (data.lon) GeoOperationAPI.data.lon = data.lon
      // set ip
      if (data.query) GeoOperationAPI.data.ip = data.query

      // we have geo coord. call weather api
      WeatherAPI.init();
    });

  }
};

/* Weather API */
var WeatherAPI = {
  data: {
    // full: api.openweathermap.org/data/2.5/weather?q={city name},{country code}
    apiBase: 'http://api.openweathermap.org/data/2.5/weather?APPID=8db4af47aafe14307ccf8406a0b028cc&units=metric',
  },
  init: function() {
    var url = WeatherAPI.data.apiBase;
    // use country code and city.
    if (GeoOperationAPI.data.city) {
      url += '&q=' +GeoOperationAPI.data.city;
      // use country code
      if (GeoOperationAPI.data.countryCode) {
        url +=  ',' + GeoOperationAPI.data.countryCode;
      }
    }
    else if (GeoOperationAPI.data.lat !== null && GeoOperationAPI.data.lon !== null) {
      // if city name is not found, use lat, lon instead. api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
      url +=  '&lat=' + GeoOperationAPI.data.lat + '&lon=' + GeoOperationAPI.data.lon;
    }
    else {
      alert('Can not detect user location and weather information!');
      return;
    }
    console.log('URL ', url);
    $.getJSON(url, function (data) {
      console.log('data w', data);
    });
  }
};

$(document).ready(function () {

  // activate sockets
  SocketsClass.init();
  GeoOperationAPI.init();
});