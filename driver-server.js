/* Author     : Phani Vedula
Created on    : Sunday, December 1, 2019
Description   : Server Side Code using Node-IPC  */

// NodeJS moduel for inter-process communication
const ipc = require('node-ipc');
// NodeJS module for Terminal string styling
const chalk = require('chalk'); 

// The id of this socket or service
ipc.config.id = 'Driver';
/* This is the time in milliseconds a client will wait before trying to 
 reconnect to a server if the connection is lost. */
ipc.config.retry = 1500; 
// This is the max number of connections allowed to a socket.
ipc.config.maxConnections = 1;

// Used to create TCP,TLS or UDP Socket Server to which Clients can bind or other servers can send data to. 
ipc.serveNet(
    function(){
        ipc.server.on(
            'Device',
            function(data,socket){
              
                // Generate values between 1 to 5 randomly to get the requisite command. 
                var value = Math.floor(Math.random() * (+5 - +1)) + +1; 
                var command = getCommand(value)[0]
                var response = getCommand(value)[1];

                ipc.log(chalk.bold('\nDriver Online.\nSending Command : ',response,'\nSending : '+command,'\n'));
                ipc.server.emit(
                    socket, 
                    'Device',
                    command
                );
            }
        );

        ipc.server.on(
            'socket.disconnected',     // Triggered by server when a client socket has disconnected
            function(data,socket){
                console.log('Disconnected from Device.\n\n');
            }
        );
    }
);


ipc.server.on(
    'error',    // Triggered when an error has occured
    function(err){
        ipc.log('There was an ERROR!',err);
    }
);

ipc.server.start();


// Function defining the various commands and their respective descriptions. 
function getCommand(value){

  var command;
  var response;

  switch(value) {
      case 1:
        command = 'S';
        response = 'Send the current stable net weight value';
        break;
      
      case 2:
        command = 'SU';
        response = 'Current stable weight value in actually displayed unit';
        break;
      
      case 3:
        command = 'SUI';
        response = 'Command Not Executable';
        break;
      
      case 4:
        command = 'SU+';
        response = 'Balance in Overload Range';
        break;
    
      case 5:
        command = 'SU-';
        response = 'Balance in Underload Range';
        break;

      default:
        command = 'X';
        response = 'Not a Valid Command';
      }
  return [command, response];
}