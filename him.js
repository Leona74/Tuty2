Discord=require("discord.js")
c=new Discord.Client()
c.on("ready",_=>{
	console.log('Woof!')
	c.setStatus("away", "with your feelings")
	console.log('Bark Woof Woof!')
	userID = c.user.id
	c.on('message',m=>{
		if( m.author != m.server.members.get("name","Blübot") ) {
		x=m.cleanContent
		m.content = m.content.toLowerCase()
		content = m.content
		content = content.replace("'s", "")
		if(m.content === "c:help")
		c.reply(m,"```Hello there, Here is what i can do: \nI will respond to meow's and woofs, react to questions such as *do you want a treat*, *who is a good doggy* etc \nI also react to commands like sit!, roll!, stand up! lay down! fetch!\nMy Commands are:\nc:help \nc:invite \nc:kick [USER] \nc:ban [USER] [DAYS AGO FOR MESSAGES TO BE DELETED] ```")
		
		if(m.server == c.servers.get("name", "Phoenix Gaming")) {
			if(content.match("forum")) {
				c.reply(m,`Hey there, our Forum URL is http://pxg-mta.de`)
			}
		}
				console.log(m.author.name + ": " +content)
			if(content.match == "who a good dog") {
			c.reply(m,`I AM!!!!!`) }
			if(content.match("who is a good dog"))
				c.reply(m,`I AM!!!!!`)
			if(content.match("good night"))
				c.sendMessage(m,`Sweet Dreams!`)
			if(content.match("you want a treat"))
				c.reply(m,`YES YES YES YES YES`)
			if(content.match("wants a treat"))
				c.reply(m,"ME ME ME ME")
			if(content.match === "yes you are!")
				c.reply(m,`^w^`)
			if(content === "sit!") {
				c.reply(m,'*sits down*')
				c.sendMessage(m,'http://thumbs.dreamstime.com/z/shiba-inu-sits-white-background-puppy-49353113.jpg') }
			if(content === "roll!") {
				c.reply(m,'*rolls over*')
				c.sendMessage(m,'https://img.buzzfeed.com/buzzfeed-static/static/2015-01/7/20/enhanced/webdr10/enhanced-30407-1420679140-11.jpg') }
			if(content === "roll over!") {
				c.reply(m,'*rolls over*')
				c.sendMessage(m,'https://img.buzzfeed.com/buzzfeed-static/static/2015-01/7/20/enhanced/webdr10/enhanced-30407-1420679140-11.jpg') }
			if(content === "stand up!") {
				c.reply(m,'*stands up*')
				c.sendMessage(m,'http://www.dogs-wallpapers.com/user-content/uploads/wall/o/86/shiba_inu_dog_on_leash_wallpaper.jpg') }
			if(content.match === "i love dogs")
				c.reply(m,`i love you too!`)
			if(content.match === "whats my name?") {
				c.reply(m,`ohhh i'm gonna spell it out for you...`)
				c.reply(m,`https://wtfbabe.files.wordpress.com/2016/05/deadpool-43-sc-ima-spell-it-out-for-ya-wtf-watch-the-film-saint-pauly.jpg` )
			}
			if(content.match("meow")) {
				c.reply(m,`Woof woof Woof woof woof woof woof!`)
				}
			if(content.match("woof")) {
				c.reply(m,`woof!`)
				}
			if(content.match("miau")) {
				c.reply(m,`Woof woof Woof woof woof woof woof!`)
				}
			if(content.match("bark")) {
				c.reply(m,`bark bark bark bark!!`)
				}	
			if(m.content === "c:invite")
				c.reply(m,"Invite me to another server using this link: https://discordapp.com/oauth2/authorize?&client_id=200662581042479106&scope=bot")
			if(m.content === "c:test") {
			c.sendMessage(m,"Blübot greets you!")	
			}
			if(m.content === "fetch!")
			c.reply(m,"*Looks at you confused*")
			if(m.content === "fetch ball!")
			c.reply(m,"*fetches ball*")
			if(content.match("who is a cute"))
				c.reply(m,`I AM!!!!!`)
			if(content === "lay down!") {
				c.reply(m,'*lies down*')
				c.sendMessage(m,'http://images.shibashake.com/wp-content/blogs.dir/7/files/2010/03/IMG_2728.jpg')
			}
			if(content.match("<@"+ userID +">")) {
				c.reply(m,"Sup! use `c:help`!")
				} 
			
			
			if (m.content.split(' ')[0] == "c:kick") {
				if (m.channel.permissionsOf(m.sender).hasPermission("kickMembers")) {
				c.kickMember( m.mentions[0], m.server, function(err) {
					if (err) console.log(err);
					console.log("Kicked " + m.mentions[0].username + ".");
					c.sendMessage(m.channel, "Bye Bye!");
				}) } else {
			c.sendMessage(m.channel, "You dont have the right Permissions, sorry!");
			}
			}			
			
			
			if (m.content.split(' ')[0] == "c:ban") {
				if (m.channel.permissionsOf(m.sender).hasPermission("banMembers")) {
					banTime=m.content.split(' ')[2]
					if (banTime = null) {banTime=0} 
				c.banMember( m.mentions[0], m.server, banTime, function(err) {
					if (err) console.log(err);
					console.log("Banned " + m.mentions[0].username + ".");
					c.sendMessage(m.channel, "Banned!");
					c.sendMessage(m.channel, "Deleted all Messages from "+banTime+" Days ago!");
					console.log(m.content.split(' '[0]))
				}) } else {
			c.sendMessage(m.channel, "You dont have the right Permissions, sorry!");
			}
			}		
			
			
	}
	})
	c.on('serverNewMember',(x,y)=>{
	if(x === c.servers.get('name',"Blue's Private Discord"))
		c.sendMessage(x.channels.get('name','eingangshalle'),`Welcome ${y}! Read #regeln if you're German, otherwise #rules ! Enjoy your Stay!`)	
	if(x === c.servers.get('name','Phoenix Gaming'))
		c.sendMessage(x.channels.get('name','welcome'),`Welcome ${y}! Read #rules to make sure you dont break any, please enjoy your stay here!`)
})
})
c.loginWithToken("token","","")
