Discord = require("discord.js");

// "reload" IS REQUIRED
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

var userstatus = config.onlinestatus
var userdisplay = config.onlinemessage

blacklist = ["199646936196841473", "141725069037666305", "177286767903244288"]



process.on('uncaughtException', (err) => {
	console.log(`Caught exception: ${err}`);
	// c.guilds.get('id',"190081288546418689").channels.get('name','bluebot').sendMessage("ERROR: "+err)
	fs.open(errorlog, 'a', 666, function(e, id) {
		fs.write(id, "\r\n" + err, null, 'utf8', function() {
			fs.close(id, function() {});
		});
	});
});


function muteUser(user) {
	mutedUsers.push(user)
}


function unmuteUser(user) {
	for (var i = mutedUsers.length; i--;) {
		if (mutedUsers[i] === user) mutedUsers.splice(i, 1);
	}
}

c.once("ready", _ => {
	console.log('Woof!')
	c.user.setStatus(userstatus, userdisplay)
	console.log('Bark Woof Woof!')
	userID = c.user.id
	console.log("My UserID: " + userID)
	botname = c.user.username

	setInterval(function() {
		upSecs = upSecs + 1
		if (upSecs >= 60) {
			var userdisplay = states[Math.floor(Math.random() * states.length)];
			c.user.setStatus(userstatus, userdisplay)
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




c.on('message', m => {
	datetime = new Date();

	fs.open(logfile, 'a', 666, function(e, id) {
		fs.write(id, "\r\n[" + datetime + "][" + m.guild.name + "#" + m.channel.name + "]  " + m.author.username + ": " + m.content, null, 'utf8', function() {
			fs.close(id, function() {});
		});
	});

	hisID = m.author.id

	mutedUsers.forEach(checkMuted)


	function checkMuted(item, index) {
		if (m.author.id == item.id) {
			m.delete()
		}
	}

	if (m.author.id == userID) {
		return
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
		m.reply("\n```Hello there, Here is what i can do: \nI will respond to meow's and woofs, react to questions such as *do you want a treat*, *who is a good doggy* etc \nI also react to commands like sit!, roll!, stand up! lay down! fetch!\nMy Commands are:\n" + prefix + "help \n" + prefix + "invite \n" + prefix + "kick [USER] \n" + prefix + "ban [USER] [DAYS AGO FOR MESSAGES TO BE DELETED] \n" + prefix + "mute [USER] \n" + prefix + "unmute [USER] \n" + prefix + "cleanup [NUMBER 1-50] \n" + prefix + "uptime \n" + prefix + "servers \n" + prefix + "gif [KEYWORD]\n" + prefix + "userinfo [USER] \n" + prefix + "img [KEYWORD]\n \n\nFun Commands:\n" + prefix + "catname\n" + prefix + "dogname\n" + prefix + "catfact\n" + prefix + "choice [CHOICES SEPERATED BY A ',']\n" + prefix + "pokemongo [Pokemon GO Server Status]	```")
		return;
	}


	if (content === prefix + "reloadcfg") {
		admins.forEach(function(item, index) {

			if (m.author.id === item) {
				try {
					config = reload('./blubot/config.json');
				} catch (e) {
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
			sb = content.substring(4)
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

		}

	}


	if ((content.split(' ')[0] == prefix + "userinfo")) {
		if (!m.mentions.users.first()) {
			m.channel.sendMessage("Missing User!");
			return
		}
		user = m.mentions.users.first()

		m.channel.sendMessage("```" + user.username + "\n" + user.status + "\n" + user.avatarURL + "\nJoined: " + user.createdAt + "```")



	}



	if ((content.split(' ')[0] == prefix + "setstatus")) {
		if (content.split(' ')[1] == "online" || content.split(' ')[1] == "away") {
			var userstatus = m.content.split(' ')[1] // Status of the bot, shown as icon next to the profile picture, values: offline, online, away

			if (content.split(' ')[1] == "online") {
				userdisplay = m.content.substring(prefixlength + 10 + 7)
			}
			if (content.split(' ')[1] == "away") {
				userdisplay = m.content.substring(prefixlength + 10 + 5)
			}
			m.reply("Successfully changed, please wait a minute...")
			c.user.setStatus(userstatus, userdisplay)


		}


	}




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
				c.setNickname(server, oldname, m.author, function(error) {
					if (error) {
						//console.log(error)
						m.channel.sendMessage(error)
					}
				})
				console.log(m.author.username + " reset his name to " + oldname)
				m.channel.sendMessage("Set Nickname back to " + oldname)
				return
			}

			c.setNickname(server, newname + " (" + oldname + ")", m.author, function(error) {
				if (error) {
					console.log(error)
					m.channel.sendMessage(error)
				}
			})
			console.log(m.author.username + " set his name to " + newname)
			m.channel.sendMessage("Set Nickname to " + newname)
		} else {
			m.reply("You dont have the right Permissions, sorry! ( expected CHANGE_NICKNAME )");
		}
		return
	}




	if (content.match("who's a good dog")) {
		m.reply(`I AM!!!!!`)
		return
	}
	if (content.match("who is a good dog")) {
		m.reply(`I AM!!!!!`)
		return
	}
	if (content.match("good night")) {
		m.channel.sendMessage(`Sweet Dreams!`)
		return
	}
	if (content.match("you want a treat")) {
		m.reply(`YES YES YES YES YES`)
		return
	}
	if (content.match("wants a treat")) {
		m.reply("ME ME ME ME")
		return
	}
	if (content.match("yes you are")) {
		m.reply(`^w^`)
		return
	}
	if (content === "sit!") {
		m.reply('*sits down*')
		m.channel.sendMessage('http://thumbs.dreamstime.com/z/shiba-inu-sits-white-background-puppy-49353113.jpg')
		return
	}
	if (content === "roll!") {
		m.reply('*rolls over*')
		m.channel.sendMessage('https://img.buzzfeed.com/buzzfeed-static/static/2015-01/7/20/enhanced/webdr10/enhanced-30407-1420679140-11.jpg')
		return
	}
	if (content === "roll over!") {
		m.reply('*rolls over*')
		m.channel.sendMessage('https://img.buzzfeed.com/buzzfeed-static/static/2015-01/7/20/enhanced/webdr10/enhanced-30407-1420679140-11.jpg')
		return
	}
	if (content === "stand up!") {
		m.reply('*stands up*')
		m.channel.sendMessage('http://www.dogs-wallpapers.com/user-content/uploads/wall/o/86/shiba_inu_dog_on_leash_wallpaper.jpg')
		return
	}
	if (content.match === "i love dogs") {
		m.reply(`i love you too!`)
		return
	}
	if (content.match("meow")) {
		m.reply(`Woof woof Woof woof woof woof woof!`)
		return
	}
	if (content.match("woof")) {
		m.reply(`woof!`)
		return
	}
	if (content.match("miau")) {
		m.reply(`Woof woof Woof woof woof woof woof!`)
		return
	}
	if (content.match("bark")) {
		m.reply(`bark bark bark bark!!`)
		return
	}

	if (fetchm.split(' ')[0] == "fetch") {
		if (fetchm.split(' ')[1] == "bacon") {
			m.reply("*eats bacon*")
			return
		}
		if (!fetchm.split(' ')[1]) {
			m.reply("*Looks at you confused*")
			return
		} else {

			m.reply("*fetches " + m.content.substring(6) + "*")
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

	if (content == "bacon?") {
		m.reply("bacon!")
		return
	}


	if (content.match("who is a cute")) {
		m.reply(`I AM!!!!!`)
		return
	}
	if (content === "lay down!") {
		m.reply('*lies down*')
		m.channel.sendMessage('http://images.shibashake.com/wp-content/blogs.dir/7/files/2010/03/IMG_2728.jpg')
		return
	}


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


	if (content.split(' ')[0] == prefix + "unmute") {
		if (m.member.hasPermission("MANAGE_MESSAGES")) {
			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				return
			}
			unmutedUser = m.mentions.users.first()
			m.channel.sendMessage("User Unsilenced!")
			console.log(m.author.username + " unmuted " + unmutedUser)
			unmuteUser(unmutedUser)

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
	}




	if (content.split(' ')[0] == prefix + "kick") {
		if (m.member.hasPermission("KICK_MEMBERS")) {

			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				return
			}
			unmuteUser(m.mentions.users.first())
			m.guild.member(m.mentions.users.first()).kick().then(m.channel.sendMessage("Bye Bye!")).catch(console.error);
		}
	}


	if (content.split(' ')[0] == prefix + "ban") {
		if (m.member.hasPermission("BAN_MEMBERS")) {
			banTime = 1

			if (!m.mentions.users.first()) {
				m.channel.sendMessage("Missing User!");
				return
			}

			unmuteUser(m.mentions.users.first())
			m.guild.member(m.mentions.users.first()).ban(0).then(m.channel.sendMessage("Banned!")).catch(console.error);
		}
	}

	if (content.match("<@" + userID + ">")) {
		m.reply("Sup! Use `" + prefix + "help`")
		return
	}





})

c.login(config.token)