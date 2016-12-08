Discord = require("discord.js");
var reload = require('require-reload')(require),
	config = reload('./blubot/config.json');
enableOptional = config.enableOptional
logfile = config.logfile
errorlog = config.logfile_error
mutedFile = config.mutefile
ver = config.version
admins = config.admins
prefix = config.prefix;
prefixlength = prefix.length;
blacklist = config.blacklist

var userstatus = config.onlinestatus
var userdisplay = config.onlinemessage



states = ["Singleplayer Hide and Seek", "with Blü", "Unhandled Exception", "WASTED!", "Dumb", "Who's a good bot?", "Debian x64", "*Dial up noises*", "4A-GE Repairs", "Saving for my E46", "Ricer Simulator 2004", "DDoS Simulator", "bi noob delet mw go play tetris", "Forza Horizon 3", "It's hot in here", "spam?", "owo whats this", "Multi Theft Auto: San Andreas", "everything", "with Lego", "with Putin's Tank", "Assetto Corsa", "Snail Snail..."]



kickbanmsg = ["Was about time.","Well, let's hope he doesnt come back..","aaand there goes him!","bye bye!","Get wrecked!","he was found to be unoptimised.","he did something wrong."]


if (enableOptional == true) {
	var jQuery = require("jquery");
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var weather = require('weather-js');
	var catNames = require('cat-names');
	var dogNames = require('dog-names');
	var catFacts = require('cat-facts');
	var magnet = require('magnet-uri');
	var giphy = require('giphy-api')();
	var fs = require('fs');
	var gis = require('g-image-search');
	var download = require('download');
	var glitch = require('glitch');
	var escape = require('escape-html');

}

function delLogs(item, index) {
	item.delete()
}

c = new Discord.Client({
	autoReconnect: true
});

var mutedUsers = [];
var choices = [];
var upSecs = 0;
var upMins = 0;
var upHours = 0;
var upDays = 0;
var blockedUser;

function getValue(key, array) {
	for (var el in array) {
		if (array[el].hasOwnProperty(key)) {
			return array[el][key];
		}
	}
}



process.on('uncaughtException', (err) => {
	console.log(`Caught exception: ${err}`);
	fs.open(errorlog, 'a', 666, function(e, id) {
		fs.write(id, "\r\n" + err, null, 'utf8', function() {
			fs.close(id, function() {});
		});
	});
});


function logError(text) {
		fs.open(errorlog, 'a', 666, function(e, id) {
		fs.write(id, "\r\n" + text, null, 'utf8', function() {
			fs.close(id, function() {});
		});
	});
}


function muteUser(user) {
	mutedUsers.push(user.id)
}

function ignoreUser(user) {
	blacklist.push(user.id)
	console.log(blacklist)
}

function unmuteUser(user) {
	for (var i = mutedUsers.length; i--;) {
		if (mutedUsers[i] === user.id) mutedUsers.splice(i, 1);
	}
}


function unignoreUser(user) {
	for (var i = blacklist.length; i--;) {
		if (blacklist[i] === user.id) blacklist.splice(i, 1);
	}
}

function removeTimeout(timeoutUser,timeoutChannel,theRole) {
	timeoutUser.removeRole(theRole).then(timeoutChannel.sendMessage(timeoutUser.user.username+"'s timeout has been lifted!"))
	console.log(timeoutUser.user.username+"'s timeout has been lifted!")
}


c.once("ready", _ => {
	console.log('Yip!')
	c.user.setStatus(userstatus)
	c.user.setGame(userdisplay)
	console.log('Yip Yap!')
	logError("I'm online!")
	userID = c.user.id
	console.log("My UserID: " + userID)
	botname = c.user.username

	setInterval(function() {
		upSecs = upSecs + 1
		if (upSecs >= 60) {
			var userdisplay = states[Math.floor(Math.random() * states.length)];
			c.user.setStatus(userstatus)
			c.user.setGame(userdisplay)
			upSecs = 0
			upMins = upMins + 1
		}
		if (upMins >= 60) {
			upMins = 0
			upHours = upHours + 1
		}
		if (upHours >= 24) {
			upHours = 0
			upDays = upDays + 1

		}


	}, 1000)



})

c.once("disconnect", error => {
console.log("Disconnected! Following Error Occured:"+error)
logError("Disconnected, Error: "+error)
})




c.on('message', m => {
	hisID = m.author.id
		if (m.author.id == userID) {
		return
	}
	if(!m.guild) {
	m.reply("Hey, i dont work using DMs, please invite me to a Server! https://discordapp.com/oauth2/authorize?&client_id=200662581042479106&scope=bot")
	logError("INFO: Got DM'ed, Responded accordingly")
	return
	}

	datetime = new Date();

	fs.open(logfile, 'a', 666, function(e, id) {
		fs.write(id, "\r\n[" + datetime + "][" + m.guild.name + "#" + m.channel.name + "]  " + m.author.username + ": " + m.content, null, 'utf8', function() {
			fs.close(id, function() {});
		});
	});


	mutedUsers.forEach(checkMuted)


	

	function checkMuted(item, index) {
		if (m.author.id == item) {
			m.delete()
		}
	}

	x = m.cleanContent
	

	blacklist.forEach(checkBlacklisted)


	function checkBlacklisted(item, index) {

		if (m.author.id == item) {
			console.log("Ignoring blacklist entry: " + m.author.id + ", Name:" + m.author.username)
			blockedUser = 1
		}
	}

	if (blockedUser == 1) {
		blockedUser = 0
		return
	}



	content = m.content.toLowerCase()
	fetchm = content.replace("!", "")
	if (content === prefix + "uptime") {
		m.reply("```Current Uptime: \n" + upDays + " Days \n" + upHours + " Hours \n" + upMins + " Minutes \n" + upSecs + " Seconds```")
	}


	if (content === prefix + "help") {
		m.reply("\n```Hello there, My current version is: "+ver+" \nMy Commands are:\n" + prefix + 
		"help \n" + prefix + 
		"invite \n" + prefix + 
		"kick [USER] \n" + prefix + 
		"ban [USER] [DAYS AGO FOR MESSAGES TO BE DELETED] \n" + prefix + 
		"mute [USER] \n" + prefix + 
		"unmute [USER] \n" + prefix + 
		"timeout [USER] [TIME] \n" + prefix + 
		"cleanup [NUMBER 1-50] \n" + prefix + 
		"uptime \n" + prefix + 
		"servers \n" + prefix + 
		"gif [KEYWORD]\n" + prefix + 
		"userinfo [USER] \n" + prefix + 
		"serverinfo \n" + prefix + 
		"img [KEYWORD]\n \n\nFun Commands:\n" + prefix + 
		"catname\n" + prefix + 
		"dogname\n" + prefix + 
		"catfact\n" + prefix + 
		"math\n" + prefix +
		"choice [CHOICES SEPERATED BY A ',']\n" + prefix + 
		"pokemongo [Pokemon GO Server Status]	```")
		admins.forEach(function(item, index) {

			if (m.author.id === item) {
				m.reply("\n```Commands that **you** can use:\n" + prefix + "reloadcfg \n" + prefix + "shutdown\n" + prefix + "newavatar \n and other secret functions...```")
			}

		})
		return;
	}


	if (content === prefix + "newavatar") {
		admins.forEach(function(item, index) {

			if (m.author.id === item) {
				c.user.setAvatar('blubot/avi.jpg')
					.then(user => console.log(`New avatar set!`))
					.catch(console.log);
			}
		})
	}

	if (content === prefix + "reloadcfg") {
		admins.forEach(function(item, index) {

			if (m.author.id === item) {
				try {
					config = reload('./blubot/config.json');
				} catch (e) {
					//if this threw an error, the api variable is still set to the old, working version
					m.reply("Following Error occured:" + e)
					console.log(e)
					return
				}

				enableOptional = config.enableOptional
				logfile = config.logfile
				errorlog = config.logfile_error
				mutedFile = config.mutefile
				ver = config.version
				prefix = config.prefix;
				prefixlength = prefix.length;
				admins = config.admins
				blacklist = config.blacklist
			


				m.reply("Config Reloaded")
			}

		})
		return;
	}


	////////////////////////////////////////////////////////////////		




	if (enableOptional == true) {


		if ((content.split(' ')[0] == prefix + "pokemongo")) {
			var req = new XMLHttpRequest();
			req.open('GET', 'http://cmmcd.com/PokemonGo/', false);
			req.send(null);
			if ((req.status == 200)) {
				result = req.responseText


				pokedex = result.indexOf("Go Server Status:")


				pokestatus = result.substring(pokedex + 37, pokedex + 50)

				console.log(pokestatus)



				pokestatus = pokestatus.substring(0, pokestatus.indexOf('!'));

				pokestatus = pokestatus.substring(pokestatus.indexOf(">") + 1);

				m.reply("\nCommunity Reports: " + pokestatus)


				delete req;
			}
		}



		if ((content.split(' ')[0] == prefix + "weather")) {
			loc = content.substring(prefixlength + 8)
			if (!loc) {
				m.channel.sendMessage("You need to supply a City!")
				return
			}
			weather.find({
				search: loc,
				degreeType: 'C'
			}, function(err, result) {
				if (err) {
					m.channel.sendMessage(err)
				};



				m.channel.sendMessage("Weather for: " + result[0].location.name + "\nTemperature: " + result[0].current.temperature + "°C\nFeels like: " + result[0].current.feelslike + "°C\n" + result[0].current.skytext + "\n" + result[0].current.humidity + "% Humidity \nWind Speed: " + result[0].current.winddisplay)
			});
		}

		if ((content.split(' ')[0] == prefix + "forecast")) {
			loc = content.substring(prefixlength + 9)
			if (!loc) {
				m.channel.sendMessage("You need to supply a City!")
				return
			}
			weather.find({
				search: loc,
				degreeType: 'C'
			}, function(err, result) {
				if (err) {
					m.channel.sendMessage(err)
				};
				m.channel.sendMessage("Weather forecast for: " + result[0].location.name + "\n`" + result[0].forecast[1].day + "`\nLow: " + result[0].forecast[1].low + "°C\nHigh: " + result[0].forecast[1].high + "°C\n" + result[0].forecast[1].skytextday + "\n\n`" + result[0].forecast[2].day + "`\nLow: " + result[0].forecast[2].low + "°C\nHigh: " + result[0].forecast[2].high + "°C\n" + result[0].forecast[2].skytextday + "\n\n`" + result[0].forecast[3].day + "`\nLow: " + result[0].forecast[3].low + "°C\nHigh: " + result[0].forecast[3].high + "°C\n" + result[0].forecast[3].skytextday + "\n\n`" + result[0].forecast[4].day + "`\nLow: " + result[0].forecast[4].low + "°C\nHigh: " + result[0].forecast[4].high + "°C\n" + result[0].forecast[4].skytextday)
			})
		}

		if ((content.split(' ')[0] == prefix + "catname")) {
			name = catNames.random()
			m.channel.sendMessage(name)
		}

		if ((content.split(' ')[0] == prefix + "dogname")) {
			name = dogNames.allRandom()
			m.channel.sendMessage(name)
		}

		if ((content.split(' ')[0] == prefix + "catfact")) {
			fact = catFacts.random()
			m.channel.sendMessage(fact)
		}
		
		if ((content.split(' ')[0] == prefix + "math")) {
			q = content.split(' ')[1]
			
			q = escape(q)
			
			q = q.replace("π","3.14159265359")
			
			try{
				res = eval(q)
			}
			catch(err){
				res = "Invalid math Question!"
			}
			m.channel.sendMessage(res)
		return}


		if ((content.split(' ')[0].match("magnet:"))) {
			uri = content.split(' ')[0]
			var parsed = magnet.decode(uri)
			var announce = parsed.announce
			announce = announce.toString()
			announce = announce.replace(",", "\n")
			m.channel.sendMessage("```Magnet Name: " + parsed.name + "\nHash: " + parsed.infoHash + "\nTrackers:\n" + announce + "```")


		}


		if ((content.split(' ')[0] == prefix + "gif")) {
			sb = content.substring(4)
			giphy.random({
				tag: sb,
				rating: 'g',
				fmt: 'json'
			}, function(err, res) {
				if (getValue("image_url", res)) {

					m.channel.sendMessage(getValue("image_url", res))
				}

			});

		}


		if ((content.split(' ')[0] == prefix + "img")) {
		sb = content.substring(5)
		if (sb.match("porn") || sb.match("yiff") || sb.match("sex") || sb.match("nude") || sb.match("scat") || sb.match("shit") ) {
			m.reply("no.")
			return
			
		}  
			msg = m.channel.sendMessage("```Searching...```").then((msg) =>
				gis(sb).then(function logResults(results) {
					results = results.slice(0, 20)
					img = results[Math.floor(Math.random() * results.length)]
					if (img == undefined) {
						msg.edit("```An Error Occured!```")
						return
					}
					msg.edit(img)
				}).catch(function(err) {
					console.log(err);
					msg.edit("```An Error Occured!```")
				}));

		return}

	}


	if ((content.split(' ')[0] == prefix + "userinfo")) {
		if (!m.mentions.users.first()) {
		
			user = m.author
			guildMember = m.member
			userRoles = guildMember.roles
			} else {
				
		user = m.mentions.users.first()
		guildMember = m.guild.member(user)
		userRoles = guildMember.roles
				
			}

		
		roleCollection = []
		
		userRoles.forEach(function (role,roleID) {
			roleCollection.push(role.name)
		})
		
			if (user.presence.game) {
			gamestring = "\nGame: " + user.presence.game.name
			} else {
			gamestring = ""
			}

		m.channel.sendMessage("```Name: " + user.username + "#"+ user.discriminator+
		"\nStatus: " + user.presence.status + 
		gamestring +
		"\nID: "+ user.id +
		"\nJoined: " + guildMember.joinedAt +
		"\nCreated: " + user.createdAt +
		"\nHighest Role: "+guildMember.highestRole.name+
		"\nKickable: "+guildMember.kickable+
		"\nUser Roles: "+roleCollection.join(', ')+
		"\n```"+user.avatarURL);



	return}
	
	
	if ((content.split(' ')[0] == prefix + "serverinfo")) {
		
		theGuild = m.guild
		guildRoles = m.guild.roles
		
		roleCollection = []
		
		guildRoles.forEach(function (role,roleID) {
			roleCollection.push(role.name)
		})
		
		m.channel.sendMessage("```Name: " + theGuild.name + 
		"\nOwner: " + theGuild.owner.user.username + "#"+theGuild.owner.user.discriminator+
		"\nID: "+ theGuild.id +
		"\nRegion: " + theGuild.region +
		"\nRegion Server Online: "+theGuild.available+
		"\nMembers: "+theGuild.memberCount+
		"\nDefault Channel: "+theGuild.defaultChannel+
		"\nCreated: "+theGuild.createdAt+
		"\nVerification Level: "+theGuild.verificationLevel+
		"\n\n\nRoles:"+roleCollection.join(', ')+
		"\nGuild Icon: ```"+theGuild.iconURL);



	return}





	mlow = content
	if ((mlow.split(' ')[0] == "call") && (mlow.split(' ')[1] == "me")) {
		if (m.member.hasPermission("CHANGE_NICKNAME")) {
			n1 = m.content.substring(8)
			server = m.guild
			oldname = m.author.username
			newname = n1
			console.log(oldname)
			console.log(newname)
			if ((oldname === newname) || (!newname) || (newname == "nothing") || (newname == "maybe")) {
				m.member.setNickname(oldname)
				console.log(m.author.username + " reset his name to " + oldname)
				m.channel.sendMessage("Set Nickname back to " + oldname)
				return
			}

			m.member.setNickname(newname + " (" + oldname + ")")
			console.log(m.author.username + " set his name to " + newname)
			m.channel.sendMessage("Set Nickname to " + newname)
		} else {
			m.reply("You dont have the right Permissions, sorry! ( expected CHANGE_NICKNAME )");
		}
		return
	}



	if (content.split(' ')[0] == prefix + "choice") {
		tempcnt = content.replace(prefix + "choice", "")
		choices = tempcnt.split(',')


		var choice = choices[Math.floor(Math.random() * choices.length)];

		if (choice) {

			m.channel.sendMessage("I choose `" + choice + "`!")
		}
		choices = []
		tempcnt = undefined
		return
	}

	if (content.split(' ')[0] == prefix + "getservers") {
		
		
		run = 0
		admins.forEach(function(item, index) {
			if (run == 1) return
			
			if (m.author.id === item) {

			guilds = c.guilds.array()
			
			response = "Guilds that i am in:\n`"
			
			guilds.forEach(function(item, index) {
			console.log(item.id)
			console.log(item.name)
			
			response = response + "\n "+ item.id + "     " +item.name
			
				
				
			})
			response = response + "`\n"
			console.log(response)
			m.reply(response)
			
			
	
			}

		})

	return}
		
		
	if (content.split(' ')[0] == prefix + "leaveserver") {
		
		
		run = 0
		admins.forEach(function(item, index) {
			if (run == 1) return
			
			if (m.author.id === item) {

			theGuild = content.split(' ')[1]
			guilds = c.guilds.array()
			guilds.forEach(function(item, index) {
			
			if (theGuild == item.id) {
				
				console.log("Just left "+item.name+" ("+item.id+")")
				m.reply("Just left "+item.name+" ("+item.id+")")
				item.leave()
				return
			}
			
			
			
			})
			}

		})

	return}
		
	


	if (content.split(' ')[0] == prefix + "mute") {
		if (m.member.hasPermission("MANAGE_MESSAGES")) {
			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				return
			}

			mutedUser = m.mentions.users.first()
			console.log(mutedUser)
			if (mutedUser == "<@" + userID + ">") {
				m.channel.sendMessage("You can't mute me, silly!")
				return
			}
			m.channel.sendMessage("User Silenced!")
			console.log(m.author.username + " muted " + mutedUser)
			muteUser(mutedUser)

		} else {
			m.reply("You dont have the right Permissions, sorry! ( expected MANAGE_MESSAGES )");
		}
		return
		}

	
	if (content.split(' ')[0] == prefix + "ignore") {
		if (m.member.hasPermission("MANAGE_MESSAGES")) {
			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				return
			}

			ignoredUser = m.mentions.users.first()
			if (ignoredUser == "<@" + userID + ">") {
				m.channel.sendMessage("You make me ignore myself!")
				return
			}
			m.channel.sendMessage("Ignoring User!")
			ignoreUser(ignoredUser)

		} else {
			m.reply("You dont have the right Permissions, sorry! ( expected MANAGE_MESSAGES )");
		}
		return
	}
	

	if (content.split(' ')[0] == prefix + "unmute") {
		if (m.member.hasPermission("MANAGE_MESSAGES")) {
			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				return
			}
			unmutedUser = m.mentions.users.first()
			m.channel.sendMessage("User Unsilenced!")
			console.log(m.author.username + " unmuted " + unmutedUser)
			console.log(unmutedUser)
			unmuteUser(unmutedUser)

		} else {
			m.reply("You dont have the right Permissions, sorry! ( expected MANAGE_MESSAGES )");

		}
		return
	}
	
	if (content.split(' ')[0] == prefix + "unignore") {
		if (m.member.hasPermission("MANAGE_MESSAGES")) {
			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				return
			}
			unignoredUser = m.mentions.users.first()
			m.channel.sendMessage("User unignored!")
			unignoreUser(unignoredUser)

		} else {
			m.reply("You dont have the right Permissions, sorry! ( expected MANAGE_MESSAGES )");

		}
		return
	}

	if (content.split(' ')[0] == prefix + "cleanup") {
		if (m.member.hasPermission("MANAGE_MESSAGES")) {
			lmsg = m.channel.lastMessage
			chnel = m.channel
			cleanuprepeat = 1
			cleanuprepeat = content.split(' ')[1]
			if (!cleanuprepeat) {
				cleanuprepeat = 1
			}



			chnel.fetchMessages({
				limit: cleanuprepeat
			}).then(messages => messages.forEach(delLogs)).catch(console.error)
			m.reply("cleaned the chat up! (" + cleanuprepeat + ")")
		}
	return}




	if (content.split(' ')[0] == prefix + "kick") {
		var theirRoles = m.member.roles
		kicked = 0
		
		theirRoles.forEach(checkUserGroup)
		
	function checkUserGroup(item, array) {
	if (item.name == "owner" || item.name == "mods" || item.name == "owner rank" || item.name == "admin" || item.name == "moderator" && kicked == 0) {
	if (kicked == 1) return;
	

			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				kicked = 1
				return
			}
			kickmsg = kickbanmsg[Math.floor(Math.random() * kickbanmsg.length)]
			
			
			kickname = m.mentions.users.first().username
			unmuteUser(m.mentions.users.first())
			m.guild.member(m.mentions.users.first()).kick().then(m.channel.sendMessage(kickmsg)).catch(console.error);
			kicked = 1
		return
		
		
	}
if (kicked == 1) return;
	if (m.member.hasPermission("KICK_MEMBERS")) {
			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				kicked = 1
				return
			}
			unmuteUser(m.mentions.users.first())
			
			kickmsg = kickbanmsg[Math.floor(Math.random() * kickbanmsg.length)]
			
			
			kickname = m.mentions.users.first().username
			m.guild.member(m.mentions.users.first()).kick().then(m.channel.sendMessage(kickmsg)).catch(console.error);
			kicked = 1
			return


	}

	}
	return}


	if (content.split(' ')[0] == prefix + "ban") {
		var theirRoles = m.member.roles
		banned = 0
		if (banned == 1) return
		theirRoles.forEach(checkUserGroup)
		
	function checkUserGroup(item, array) {
	if (banned == 1) return
	if (item.name == "owner" || item.name == "mods" || item.name == "owner rank" && banned == 0) {
	
	if (banned == 1) return
			banTime = 1
			
			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				banned = 1
				return
			}

			
			
			kickmsg = kickbanmsg[Math.floor(Math.random() * kickbanmsg.length)]
			
			
			kickname = m.mentions.users.first().username
			unmuteUser(m.mentions.users.first())
			m.guild.member(m.mentions.users.first()).ban(0).then(m.channel.sendMessage(kickmsg)).catch(console.error);
			banned = 1
			banTime = 1
			return
	}
	
	
	if (banned == 1) return
	
		if (m.member.hasPermission("BAN_MEMBERS")) {
			banTime = 1

			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				banned = 1
				return
			}
			
			
			
			kickmsg = kickbanmsg[Math.floor(Math.random() * kickbanmsg.length)]
			
			
			kickname = m.mentions.users.first().username
			unmuteUser(m.mentions.users.first())
			m.guild.member(m.mentions.users.first()).ban(0).then(m.channel.sendMessage(kickmsg)).catch(console.error);
			banned = 1
		}
	}
	return}

	
	if (content.match("<@" + userID + ">")) {
		m.reply("Sup! Use `" + prefix + "help`")
		return
	}

	if (content === prefix + "shutdown") {
		admins.forEach(function(item, index) {

			if (m.author.id === item) {
			m.reply("Ok")
			logError("I'm shutting down!")
			c.destroy()
			}

		})

	}

	
	if (content.split(' ')[0] == prefix + "giverole") {
		run = 0
		admins.forEach(function(item, index) {
			if (run == 1) return
			
			if (m.author.id === item) {
			if (run == 1) return

			run = 1
			var sb = m.content.substring(10)
			var roles = m.guild.roles
			var theRole = roles.find('name', sb)

			
			
			m.member.addRole(theRole)
			logError("Gave "+m.author.username+" the "+sb+" role.")
			
			
			m.delete()		
	
			}

		})

	return}
	
	if (content.split(' ')[0] == prefix + "timeout") {
		var theirRoles = m.member.roles
		timedout = 0
		theirRoles.forEach(checkUserGroup)
		var timeout = parseInt("0") 
	function checkUserGroup(item, array) {
	if (timedout == 1) return
	if (item.name == "owner" || item.name == "mods" || item.name == "owner rank" || item.name == "admin" || item.name == "moderator"  && timedout == 0) {
	
	if (timedout == 1) return
			
			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				timedout = 1
				return
			}
			if(content.split(' ')[2]) {
			timeout = content.split(' ')[2]
			}
			else
			{
			timeout = 5
			}
			

			
			
			var roles = m.guild.roles
			var theRole = roles.find('name', "timeout")
			
			if(!theRole) {
				m.reply("`timeout` role missing, please create one and set its permissions first!")
				return
				
				
			}

			timeout = timeout * 60 * 1000
			if(!timeout) {timeout = 5*60*1000}
			timeoutUser = m.guild.member(m.mentions.users.first())
			timeoutChannel = m.channel
			timeoutUser.addRole(theRole).then(m.channel.sendMessage(timeoutUser.user.username+" has been timed out for "+timeout/60/1000+" minutes!")).catch(console.error);
			//m.guild.member(m.mentions.users.first()).kick().then(m.channel.sendMessage(kickmsg)).catch(console.error);
			timedout = 1
			
			setTimeout(removeTimeout, timeout,timeoutUser,timeoutChannel,theRole)
			console.log(timeoutUser.user.username+" has been timed out")
			return
	}

	}
	}
	
	if (content.split(' ')[0] == prefix + "removerole") {
		run = 0
		admins.forEach(function(item, index) {
			if (run == 1) return
			
			if (m.author.id === item) {
			if (run == 1) return

			run = 1
			var sb = m.content.substring(12)
			var roles = m.guild.roles
			var theRole = roles.find('name', sb)

			
			
			m.member.removeRole(theRole)
			console.log("removed "+m.author.username+"'s "+sb+" role.")
			
			
			m.delete()		
	
			}

		})

	}
	
	if (content.split(' ')[0] == prefix + "getroles") {
		run = 0
		admins.forEach(function(item, index) {
			if (run == 1) return
			
			if (m.author.id === item) {
			if (run == 1) return

			run = 1
			var roles = m.guild.roles

			var response = "Roles on this Server:\n`"

			roles.forEach(function(item, index) {
			console.log(item.id)
			console.log(item.name)
			
			response = response + "\n "+ item.id + "     " +item.name
			
				
				
			})
		response = response + "\n`"
			
m.reply(response)	
	
			}

		})

	}
	


	if (content === prefix + "glitchmypic") {
m.reply("Please wait while i glitch your pic!")

download(m.author.avatarURL).pipe(fs.createWriteStream('normal.jpg'))

setTimeout(createGlitch,800)

function createGlitch(){

glitch('normal.jpg', 'glitch.jpg', 0.003, 2, 0777);
m.channel.sendFile("glitch.jpg", "glitch.jpg","Here you go!")
}

};
	


	



})

					
c.on("guildMemberAdd", (member) => {
	
guild = member.guild	
if (guild.id == "190081288546418689")
		guild.defaultChannel.sendMessage("Welcome <@"+member.id+">! Read "+ guild.channels.find("name", "regeln")+ " if you're German, otherwise "+ guild.channels.find("name", "rules")+ " ! Enjoy your Stay!")
	
	if (guild.id == '178890089374547979') 
		guild.defaultChannel.sendMessage("Welcome <@"+member.id+">! Read "+ guild.channels.find("name", "rules")+ " to make sure you dont break any, please enjoy your stay here!")
	})


c.login(config.token)
