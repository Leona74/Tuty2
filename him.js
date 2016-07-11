Discord=require("discord.js")
c=new Discord.Client()
prefix='c:'
var mutedUsers = [ ]
var upSecs = 0
var upMins = 0
var upHours = 0
var upDays = 0


c.on("ready",_=>{
	console.log('Woof!')
	c.setStatus("away", "with your feelings")
	console.log('Bark Woof Woof!')
	userID = c.user.id
	
	setInterval( function() {
		upSecs = upSecs + 1
		if (upSecs >= 60) {
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
		
		
	},1000)
	
	
	
	
	
		function muteUser(user) {
	mutedUsers.push(user)
	}
	
	
	function unmuteUser(user) {
		console.log("umute recieved")
		for(var i = mutedUsers.length; i--;){
	if (mutedUsers[i] === user) mutedUsers.splice(i, 1);
	}
	}
	
	
	c.on('message',m=>{
		
		mutedUsers.forEach(checkMuted)
		
				function checkMuted(item,index) {
	if ( m.sender.id == item.id ) {
		c.deleteMessage(m,30,
		function err(error) {
			if (error) {
		console.log(error)
}
		})
	}}
		
		if( m.author != m.server.members.get("name","Blübot") ) {
		x=m.cleanContent
		m.content = m.content.toLowerCase()
		content = m.content
		fetchm = m.content.replace("!", "")
		if(m.content === prefix+"uptime"){
		c.reply(m, "```Current Uptime: \n"+upDays+" Days \n"+upHours+" Hours \n"+upMins+" Minutes \n"+upSecs+" Seconds```")
		}
		
		if(m.content === prefix+"help")
		c.reply(m,"```Hello there, Here is what i can do: \nI will respond to meow's and woofs, react to questions such as *do you want a treat*, *who is a good doggy* etc \nI also react to commands like sit!, roll!, stand up! lay down! fetch!\nMy Commands are:\n"+prefix+"help \n"+prefix+"invite \n"+prefix+"kick [USER] \n"+prefix+"ban [USER] [DAYS AGO FOR MESSAGES TO BE DELETED] \n"+prefix+"mute [USER] \n"+prefix+"unmute [USER] \n"+prefix+"cleanup [NUMBER 1-50] ```")
		if(m.server == c.servers.get("name", "Phoenix Gaming")) {
			if(content.match("forum")) {
				c.reply(m,`Hey there, our Forum URL is http://pxg-mta.de`)
			}
		}
				console.log(m.author.name + ": " +content)
			if(content.match("who's a good dog")) {
			c.reply(m,`I AM!!!!!`) 
			return}
			if(content.match("who is a good dog")) {
				c.reply(m,`I AM!!!!!`)
			return}
			if(content.match("good night")){
				c.sendMessage(m,`Sweet Dreams!`)
			return}
			if(content.match("you want a treat")) {
				c.reply(m,`YES YES YES YES YES`)
			return}
			if(content.match("wants a treat")) {
				c.reply(m,"ME ME ME ME")
			return}
			if(content.match("yes you are")){
				c.reply(m,`^w^`)
			return}
			if(content === "sit!") {
				c.reply(m,'*sits down*')
				c.sendMessage(m,'http://thumbs.dreamstime.com/z/shiba-inu-sits-white-background-puppy-49353113.jpg') 
			return}
			if(content === "roll!") {
				c.reply(m,'*rolls over*')
				c.sendMessage(m,'https://img.buzzfeed.com/buzzfeed-static/static/2015-01/7/20/enhanced/webdr10/enhanced-30407-1420679140-11.jpg') 
			return}
			if(content === "roll over!") {
				c.reply(m,'*rolls over*')
				c.sendMessage(m,'https://img.buzzfeed.com/buzzfeed-static/static/2015-01/7/20/enhanced/webdr10/enhanced-30407-1420679140-11.jpg') 
			return}
			if(content === "stand up!") {
				c.reply(m,'*stands up*')
				c.sendMessage(m,'http://www.dogs-wallpapers.com/user-content/uploads/wall/o/86/shiba_inu_dog_on_leash_wallpaper.jpg') 
			return}
			if(content.match === "i love dogs"){
				c.reply(m,`i love you too!`)
			return}
			if(content.match === "whats my name?") {
				c.reply(m,`ohhh i'm gonna spell it out for you...`)
				c.reply(m,`https://wtfbabe.files.wordpress.com/2016/05/deadpool-43-sc-ima-spell-it-out-for-ya-wtf-watch-the-film-saint-pauly.jpg` )
			return}
			if(content.match("meow")) {
				c.reply(m,`Woof woof Woof woof woof woof woof!`)
			return}
			if(content.match("woof")) {
				c.reply(m,`woof!`)
			return}
			if(content.match("miau")) {
				c.reply(m,`Woof woof Woof woof woof woof woof!`)
			return}
			if(content.match("bark")) {
				c.reply(m,`bark bark bark bark!!`)
			return}	
			if(m.content === prefix+"invite") {
				c.reply(m,"Invite me to another server using this link: https://discordapp.com/oauth2/authorize?&client_id=200662581042479106&scope=bot")
			return}
			if(fetchm.split(' ')[0] == "fetch") {

			 if(!fetchm.split(' ')[1]) {
				c.reply(m,"*Looks at you confused*")
				}
			else
			{  		
			c.reply(m,"*fetches "+fetchm.split(' ')[1]+"*")		
			}
			return
			if(content.match("who is a cute")) {
				c.reply(m,`I AM!!!!!`)
			return}
			if(content === "lay down!") {
				c.reply(m,'*lies down*')
				c.sendMessage(m,'http://images.shibashake.com/wp-content/blogs.dir/7/files/2010/03/IMG_2728.jpg')
			return}

			
			
//			if(m.content.split(' ')[0] == prefix+"setprefix") {
//				if (m.channel.permissionsOf(m.sender).hasPermission("manageServer")) {
//					newprefix = m.content.split(' ')[1]
//					
//				console.log(m.sender.name+" set the prefix to"+ newprefix)
//				prefix=newprefix
//				c.sendMessage(m,"Successfully set Prefix to "+newprefix)
//				
//				
//			}
//			}
				
				
						if(m.content.split(' ')[0] == prefix+"mute") {
				if (m.channel.permissionsOf(m.sender).hasPermission("manageMessages")) {
				mutedUser = m.mentions[0]
			if(mutedUser == "<@"+userID+">") {
				c.sendMessage(m,"You can't mute me, silly!")	
			return}
				c.sendMessage(m,"User Silenced!")
				console.log(m.sender.name+" muted "+ mutedUser)
				muteUser(mutedUser)
				
			}
			else
			{
				c.sendMessage(m.channel, "You dont have the right Permissions, sorry! ( expected manageMessages )");
			}
			return
			}

			
			if(m.content.split(' ')[0] == prefix+"unmute") {
				if (m.channel.permissionsOf(m.sender).hasPermission("manageMessages")) {
				unmutedUser = m.mentions[0]
				c.sendMessage(m,"User Unsilenced!")
				console.log(m.sender.name+" unmuted "+ unmutedUser)
				unmuteUser(unmutedUser)
				
			}
			else
			{
				c.sendMessage(m.channel, "You dont have the right Permissions, sorry! ( expected manageMessages )");
				
			}
			return
			}
			
			if(m.content.split(' ')[0] == prefix+"cleanup") {
				if (m.channel.permissionsOf(m.sender).hasPermission("manageMessages")) {
					lmsg = m.channel.lastMessage
					chnel = m.channel
					cleanuprepeat = 1
					cleanuprepeat = m.content.split(' ')[1]
					if(!cleanuprepeat)  {
						cleanuprepeat =1						
					}
					if (cleanuprepeat >= 50) {
						cleanuprepeat = 50
					}
			
		c.getChannelLogs(chnel,cleanuprepeat, function resmsgerr(error,messages)
		{
		delLogs(messages)
		if (err) {
		console.log(err)
		}
		})
	function delLogs(item,index) {
		c.deleteMessages(item,
		function err(error) {
			if (error) {
		console.log(error)
				}
			})
		}
	}		
}

		
				
				
				
				
			if (m.content.split(' ')[0] == prefix+"kick") {
				if (m.channel.permissionsOf(m.sender).hasPermission("kickMembers")) {
				c.kickMember( m.mentions[0], m.server, function(err) {
					if (err) console.log(err);
					console.log("Kicked " + m.mentions[0].username + ".");
					c.sendMessage(m.channel, "Bye Bye!");
				}) } else {
			c.sendMessage(m.channel, "You dont have the right Permissions, sorry!");
			}
			return
			}			
			
			
			if (m.content.split(' ')[0] == prefix+"ban") {
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
			return
			}	
			
			if(content.match("<@"+ userID +">")) {
				c.reply(m,"Sup! use `"+ prefix+"help`")
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
