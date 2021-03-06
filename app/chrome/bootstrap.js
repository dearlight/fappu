var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

require('./menu').create(app);


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

//require('./DATABASE/config.js').initDatabase(null, function (err, db) {

  // This method will be called when atom-shell has done everything
  // initialization and ready for creating browser windows.
  app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({'node-integration': 'none'});
  
    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/www/index.html#debug=*');
    
    mainWindow.webContents.on('did-finish-load', function() {
      //mainWindow.webContents.send('database', db);
    });
  
    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
  });

//});