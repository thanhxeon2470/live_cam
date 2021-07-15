const find = require('find');
const dialog = require('electron').remote.dialog;
const ipc = require('electron').ipcRenderer;
const ipcMain = require('electron').remote;
// const path = require('path');


// Link is
function init(link, urlSV) {
    console.log(urlSV);
    const protData = {
        "org.w3.clearkey": {
            // "clearkeys": {
            //     "oW5AK5BW43HzbTSKpiu3SQ": "hyN9IKGfWKdAwFaE5pm0qg"
            // }
            // "serverURL": "https://demo.edge247.xyz/api/v1/drm/key"
            "serverURL": urlSV
        }
    };
    var video,
        player,
        // url = "C:\\Users\\thanh\\Desktop\\drm_without_nodejs\\cam_17_2021_6_21_17_17_50\\stream.mpd"
        url = "../../" + link; 
        // url = "../../../../" + link; 
    video = document.querySelector("video");
    player = dashjs.MediaPlayer().create();
    player.initialize(video, url, true);
    player.setProtectionData(protData);
}




function runVideo(urlSV){
    try{
        find.file("dist", function(files) {
            console.log("leng ", files.length);
            for (let i = 0; i< files.length; i++){
                var tmp = files[i].split('\\');
                if(tmp[tmp.length-1] === "stream.mpd"){
                    console.log(files[i]);
                    init(files[i], urlSV);
                    return;
                }
            }
            dialog.showErrorBox('Error!!!', 'Wrong input or error video!');
        })

        
    } catch  (err) {
        dialog.showErrorBox('Extraction failed!!!', 'File cant to find');
    }
}