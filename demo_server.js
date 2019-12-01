/* Author     : Phani Vedula
Created on    : Sunday, December 1, 2019
Description   : Server Side Code using Web Sockets  */

// ws is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation.
const WebSocket = require('ws') 
// NodeJS module for Terminal string styling
const chalk = require('chalk')
 
// Creating a simple server 
const wss = new WebSocket.Server({ port: 8080 })
 
// event emmited when connected
wss.on('connection', ws => {
  
  // Generate values between 1 to 5 randomly to get the requisite command. 
  var value = Math.floor(Math.random() * (+5 - +1)) + +1; 
  var command = getCommand(value)[0]
  var response = getCommand(value)[1];

 // event emmited when receiving message 
  ws.on('message', message => {      
    console.log(`${chalk.bold('\nDriver Online.\nSending Command : ',response,'\nSending : "',command,'"\n')}`)
  })
  // sending a send event to websocket server
  ws.send(command)
  
  // Commendt the above line 26 and uncomment the following code to send commands every 2 seconda
  /*setInterval(
    () => ws.send(command),
    2000
  )*/
})


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


