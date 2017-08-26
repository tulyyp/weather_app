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
    token: '' // default empty
  },
  init: function() {
    // init token to identify broadcast consumer/client.
    SocketsClass.data.token = SocketsClass.socketToken();
    console.log(SocketsClass.data.token)
  },
  socketToken: function() {
    // generate 5 random 4 char string blocks
    var parts = [CommonFunctions.randString(4), CommonFunctions.randString(4), CommonFunctions.randString(4), CommonFunctions.randString(4)];
    // return blocks
    return parts.join('-');
  }
};

/* External libs */
var GeoOperations = {
  init: function() {
    $.getJSON("http://jsonip.com/?callback=?", function (data) {
      console.log(data);
      alert(data.ip);
    });

    $.getJSON("http://ip-api.com/json/106.55.65.12", function (data) {
      console.log(data);
      alert(data.ip);
    });

  }
};

$(document).ready(function () {

  // activate sockets
  SocketsClass.init();
});