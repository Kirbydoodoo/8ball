const Discord = require("discord.js");
let client = new Discord.Client();
const Limiter = require("./limit.js");
let limit = new Limiter(15000);
const fs = require("fs");

const clockEmoji = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧"];

const re = /^(\>\s?r+o+ll+|\>\s?s+h+a+k+e+)(?:\s(.+))?/gim; // Regex to find out if a user types ">roll"
let responses;
fs.readFile('./responses.txt', "utf8", function(err, data) { // Allows custom responses
	if(err) {
		console.log("Can't read or find responses.txt, setting defaults");
		responses = ["``jvenberg@gmail.com:mjkr5674``" "count.luca1@gmail.com:science4", "jeff.jitb@gmail.com:bowser12", "dftbaman@gmail.com:Daniel02", "leecollege16@gmail.com:smitty16",
					"dapperbantam@gmail.com:C4tz0Mb13", "kimgatwood@yahoo.com:baby2544", "kenzieackley@yahoo.com:shelby32", "kcooper.14@hotmail.com:11.28.97", "k.o-the-gamer@hotmail.com:31ko32ko",
					"m3dium.v@gmail.com:otacno23", "sooosans@hotmail.com:pudding22", "gman007@yandex.ru:gaben1337"];
	} else {
		responses = data.split("\n"); // Responses are each individual line
	}
});

client.on('ready', () => {
  	console.log(`Logged in as ${client.user.tag}!`);
	console.log("Available responses: " + responses.length);
	client.user.setGame(">roll or >shake");
});

client.on('message', msg => {
	let matches = re.exec(msg.content);

  	if (!msg.author.bot && matches) {
  		if(limit && limit.exists(msg.author.id)) { // Checks if a usage limit is in place
  			for(let i = 0; i < Math.floor(Math.random()*5); i++) {
				msg.react(clockEmoji[Math.floor(Math.random()*clockEmoji.length)]);
  			}
		} else {
			var rand = Math.floor(Math.random()*responses.length);
	  		if(matches[2]) {
	  			msg.reply("You asked: \"" + matches[2] + "\" - " + responses[rand]);
	  		} else {
	  			msg.reply(responses[rand]);
	  		}
	  		limit.add(msg.author.id);
		}
  	}
});

fs.readFile('./token.key', "utf8", function(err, data) { // Keep this in a seperate file, trust me
	if(err) {
		console.log("Can't read or find token.key, make a token.key file if you haven't already"); 
		client.login('my token');
	} else {
		client.login(data);
	}
});
