/* Author     : Phani Vedula
Created on    : Sunday, December 1, 2019
Description   : Client Side Code using Node-IPC  */

// NodeJS moduel for inter-process communication
const ipc=require('node-ipc');
// NodeJS module for Terminal string styling
const chalk = require('chalk'); 

// The id of this socket or service
ipc.config.id = 'Device';
/* This is the time in milliseconds a client will wait before trying to 
 reconnect to a server if the connection is lost. */
ipc.config.retry= 1500;

// Used to connect as a client to a TCP or TLS socket via the network card.
ipc.connectToNet(
    'Driver',
    function(){
        ipc.of.Driver.on(
            'connect',     // Triggered when socket connected
            function(){
                ipc.log(chalk.bold("\nDevice Online.\nListening.\n"));
                ipc.of.Driver.emit(
                    'Device',
                    'Listening'
                );
            }
        );
        ipc.of.Driver.on(
            'disconnect',   // Triggered by client when socket has disconnected from server
            function(){
                ipc.log('Disconnected from Driver');
            }
        );

        ipc.of.Driver.on(
            'Device',
            function(data){
                var s = data;
                var char_array = []
                var hex_array = [];
                // For converting received command to Hexadecimal value
                for (var i = 0; i < s.length; i++) {
                   char_array.push(s.charAt(i))
                   hex_array.push('0x'+Buffer.from(s.charAt(i), 'utf8').toString('hex'))
                   ipc.log(chalk.bold('\nReceived : [', hex_array, '] is ', char_array.join('')))
                }
                ipc.log(chalk.green.bold("Command recognized."));
                ipc.log(chalk.red.bold("Simulating State..."))
                // Device Simulating response based on the command received
                ipc.log(chalk.bold("Response : ", getResponse( char_array.join(''))),"\n")

            }
        );
    }
);

// Function defining the various commands and their respective responses. 
function getResponse(command){

    // Generating random values for weight between 100 and 250 
    var weight = Math.floor(Math.random() * (+250 - +100)) + +100; 

    switch(command) {
      case 'S':
        response = 'The current stable net weight value is '+weight;
        
        break;
      
      case 'SU':
        response = 'The Current stable weight value is '+weight+'g';
        break;
      
      case 'SUI':
        response = 'Command Not Executable';
        break;
      
      case 'SU+':
        response = 'Balance in Overload Range';
        break;

      case 'SU-':
        response = 'Balance in Underload Range';
        break;

      default:
        response = 'Not a Valid Command';
    }
    return response
}
