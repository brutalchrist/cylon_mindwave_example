var PythonShell = require('python-shell');
var Cylon = require('cylon');

var ATTENTION_NUMBERS = 3;

var mapping_devices = require('./arduino_devices.js');

Cylon.robot({
  connections: {
    neurosky: {
      adaptor: "neurosky",
      port: '/dev/cu.MindWaveMobile-SerialPo' 
    },
    arduino: {
      adaptor: 'firmata',
      port: '/dev/tty.usbmodem1411' 
    }
  },

  devices: {
    headset: { driver: "neurosky", connection: 'neurosky'},
    relay_1: {
      driver: 'relay',
      pin: 6,
      type: 'open',
      connection: 'arduino'
    },
    relay_2: {
      driver: 'relay',
      pin: 7,
      type: 'open',
      connection: 'arduino'
    }
  },

  work: function(my) {
    var attention_data = 0;
    var meditation_data = 0;
    var attention_counter = 0;

    var device_return = null;
    var pyshell = new PythonShell('python/markerdetect.py');

    every((1).second(), function() {
      if (attention_data > 80) {
        attention_counter++;
      }

      // if (meditation_data > 10) {
      //   attention_counter = 0;
      // }

      console.log('attention_data: ' + attention_data);
      // console.log('meditation_data: ' + meditation_data);
      console.log('attention_counter: ' + attention_counter);
      console.log('===================');

      if (attention_counter >= ATTENTION_NUMBERS) {
        if (device_return != null) {
          console.log(device_return);
          var device = mapping_devices[device_return];
          device.action(my[device.name])
          attention_counter = 0;
        }
      }
    });

    my.headset.on("attention", function(data) {
      attention_data = data;
    });

    // my.headset.on("meditation", function(data) {
    //   meditation_data = data;
    // });

    pyshell.on('message', function (message) {
      console.log(message);
      device_return = message;
    });

    pyshell.end(function (err) {
      if (err) throw err;
      console.log('finished');
    });
  }
}).start();
