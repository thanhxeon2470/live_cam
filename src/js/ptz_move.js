const onvif = require('node-onvif');

// Create an OnvifDevice object
let device = new onvif.OnvifDevice({
    xaddr: 'http://192.168.1.155:80/onvif/device_service',
    user : 'admin',
    pass : 'AI_team123'
});

function onvif_discovery(){

    console.log('Start the discovery process.');
    // Find the ONVIF network cameras.
    // It will take about 3 seconds.
    // onvif.startProbe().then((device_list) => {
    //     // Show the information of the found devices
    //     console.log(JSON.stringify(device_list, null, '  '));
    //   }).catch((error) => {
    //     console.error(error);
    //   });

    onvif.startProbe().then((device_info_list) => {
    console.log(device_info_list.length + ' devices were found.');
    // Show the device name and the URL of the end point.
    device_info_list.forEach((info) => {
        console.log('- ' + info.urn);
        console.log('  - ' + info.name);
        console.log('  - ' + info.xaddrs[0]);
    });
    }).catch((error) => {
    console.error(error);
    });
}

function initPTZ(){
    // Initialize the OnvifDevice object
    device.init().then((info) => {
        // Show the detailed information of the device.
        console.log(JSON.stringify(info, null, '  '));
    }).catch((error) => {
        console.error(error);
    });

    device.init().then(() => {
        // Get the UDP stream URL
        let url = device.getUdpStreamUrl();
        console.log(url);
      }).catch((error) => {
        console.error(error);
    });

    ptz_TurnRight();
}





  // Create the parameters
function ptz_TurnRight(){
    device.init().then(() => {
        // Move the camera
        return device.ptzMove({
          'speed': {
            x: 1.0, // Speed of pan (in the range of -1.0 to 1.0)
            y: 0.0, // Speed of tilt (in the range of -1.0 to 1.0)
            z: 0.0  // Speed of zoom (in the range of -1.0 to 1.0)
          },
          'timeout': 1 // seconds
        });
      }).then(() => {
        console.log('Done!');
      }).catch((error) => {
        console.error(error);
      });
    // let params = {
    //     'speed': {x: 0.5, y: 0.0, z: 0.0},
    //     'timeout': 60 // seconds
    // };
    // // Supposed to move the camera for 60 seconds
    // device.ptzMove(params).then(() => {
    //     console.log('Succeeded to move.');
    //     // Stop to the PTZ in 2 seconds
    //     // setTimeout(() => {
    //     // device.ptzStop().then(() => {
    //     //     console.log('Succeeded to stop.');
    //     // }).catch((error) => {
    //     //     console.error(error);
    //     // });
    //     // }, 2000);
    // }).catch((error) => {
    //     console.error(error);
    // });

}

