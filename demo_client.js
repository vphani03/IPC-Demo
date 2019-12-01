/* Author     : Phani Vedula
Created on    : Sunday, December 1, 2019
Description   : Client Side Code using Web Sockets  */

// ws is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation.
const WebSocket = require('ws') 
// NodeJS module for Terminal string styling
const chalk = require('chalk');

const url = 'ws://localhost:8080'
const connection = new WebSocket(url)
 
// On Connection begin 
connection.onopen = () => {
  connection.send('Device Online') 
  console.log(chalk.bold("\nDevice Online.\nListening."));
}
 
// On Connection Error
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
	var s = e.data;
	var char_array = []
	var hex_array = [];
	// For converting received command to Hexadecimal value
	for (var i = 0; i < s.length; i++) {
	   char_array.push(s.charAt(i))
	   hex_array.push('0x'+Buffer.from(s.charAt(i), 'utf8').toString('hex'))
	   console.log(chalk.bold('Received : [', hex_array, '] is ', char_array.join('')))
	}
	console.log(chalk.green.bold("Command recognized."));
	console.log(chalk.red.bold("Simulating State..."))
	// Device Simulating response based on the command received
	console.log(chalk.bold("Response : ", getResponse( char_array.join(''))),"\n")
}


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
