const electron = require('electron');
const app = electron.app;
const BrsWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url')
const jsdom = require('jsdom');
const { ipcMain } = require('electron');
const ipc = electron.ipcRenderer;
const decompress = require('decompress');
const dialog = electron.dialog;
const { JSDOM } = jsdom;
const fs = require('fs');
const find = require('find');
global.document = new JSDOM(`...`).window.document;

 
let win;
let _urlSV;

function CreateWindow() {
    win = new BrsWindow({width : 900 ,
        height : 600,
        webPreferences :{
            enableRemoteModule : true,
            nodeIntegration : true,
            contextIsolation : false
        }});
    win.loadURL(url.format({
        pathname : path.join(__dirname,'./index_live.html'),
        // pathname : path.join(__dirname,'./src/html/index.html'),
        // pathname : path.join(__dirname,'./src/html/ptz_move.html'),
        protocol : 'file',
        slashes : true
    }));

    win.webContents.openDevTools();
    
    win.on('closed',() => {
        win = null;
    });
}

app.on('ready',CreateWindow);

ipcMain.on('file:submit', function (event, arg, urlSV) {
    _urlSV = urlSV;
    fs.rmdirSync('./dist',{ recursive: true });
        console.log("File is deleted.");
    try {
        decompress(arg, 'dist').then(files => {
            win.loadURL(url.format({
                pathname : path.join(__dirname,'./src/html/dash.html'),
                protocol : 'file',
                slashes : true
            }));
        });


    } catch (err) {
        dialog.showErrorBox('Extraction failed!!!', 'File cant to extract');
    }
})

ipcMain.on('video_load', function(event){
    event.sender.send('receive_url', _urlSV);
});


app.on('window-all-closed',() => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if ( win == null ){
        CreateWindow();
    }
});

