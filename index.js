const Discord = require("discord.js");
const { lookup } = require("dns");
const bot = new Discord.Client();
const fs = require("fs")
const ms = require("ms")
const config = require("./config.json");




bot.on("ready", () => {
  console.log("I am ready!");
});
 
bot.on("guildMemberAdd", member => {
  let .guild = member.guild;
  Discord.Guild.defaultChannel.sendMessage(`Welcome ${member.user} to this server.`).catch(console.error);
});
 
bot.on("guildMemberRemove", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`${member.user} left this server.`).catch(console.error);
});
 
bot.on("guildCreate", guild => {
  console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});
 
bot.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing Overwatch");
  if(!playRole) return;
 
  if(newMember.user.presence.game && newMember.user.presence.game.name === "Overwatch") {
    newMember.addRole(playRole).catch(console.error);
  } else if(!newMember.user.presence.game && newMember.roles.has(playRole.id)) {
    newMember.removeRole(playRole).catch(console.error);
  }
});
 
bot.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
    
var scheldwoorden = ["mongool", "kut"]

var msg = message.content.toLowerCase();

for (let i = 0; i < scheldwoorden.length; i++) {
     
    if(msg.includes(scheldwoorden[i])){

        message.delete();

        return message.reply("gelieve niet te vloeken").then(msg => msg.delete({timeout: 3000}))

        }
    
}

  let args = message.content.split(" ").slice(1);
 
  if (command === "say") {
    message.channel.send(args.join(" ")).catch(console.error);
  }
  
  if (command === "help") {

    var Helpembed = new Discord.MessageEmbed()
    .setTitle(`**help**`)
    .setDescription(`**preifx:** -`)
    .addField('**GLOBAL**', "no perms nieded")
    .addField(`help`, "toont dit menu")
    .addField(`ping`, "speel ping pong")
    .addField(`say`, "maakt een mededeling")
    .addField('**STAFF COMMANDS**', "perms nieded")
    .addField(`say`, "maakt een mededeling")
    .addField(`kick`, "kickt iemand")
    .addField(`ban`, "bant iemand")
    .addField(`warn`, "geef iemand een warn")
    .addField(`mute`, "mute iemand")
    .addField(`unmute`, "unmute iemand")

      message.channel.send(Helpembed)
  }
 
  if (command === "ping") {
      const Pong = "Pong!";
    message.channel.send(Pong).catch(console.error);
  } else
 
  if (command === "kick") {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("jij kan dit niet doen loemperik")
     

    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to kick").catch(console.error);
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!kickMember) {
      return message.reply("That user does not seem valid");
    }
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
      return message.reply("I don't have the permissions (KICK_MEMBER) to do this.").catch(console.error);
    }
    kickMember.kick().then(member => {
      message.reply(`${member.user.username} was succesfully kicked.`).catch(console.error);
    }).catch(console.error)
  }

  if (command === "ban") {

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("jij kan dit niet doen loemperik")
     

    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to ban").catch(console.error);
    }
    let banMember = message.guild.member(message.mentions.users.first());
    if(!banMember) {
      return message.reply("That user does not seem valid");
    }
    if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
      return message.reply("I don't have the permissions (BAN_MEMBERS) to do this.").catch(console.error);
    }
    banMember.ban().then(member => {
      message.reply(`${member.user.username} was succesfully banned.`).catch(console.error);
    }).catch(console.error)
  };
 
  
  if (command === "warn") {

    if(!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send("jij kan dit niet doen loemperik")
     

    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to warn").catch(console.error);
    }
    let warnMember = message.guild.member(message.mentions.users.first());
    if(!warnMember) {
      return message.reply("That user does not seem valid");
    };

    if(!args[1]) return message.reply("gelieve een reden op te geven");

    if(warnMember.hasPermission("MOVE_MEMBERS")) return message.channel.send("sorry, je kunt deze gebruiken niet warnen!");

    var WarnEmbed = new Discord.MessageEmbed()
    .setColor("ff0000")
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`**gewarnd:** ${warnMember} (${warnMember.id})
    **warning door:** ${message.author}
    **reden:** ${args[1]}`)

    var WarnChannel = message.member.guild.channels.cache.get("816738486484336660");

    if(!WarnChannel) return console.log("het log channel bestaat niet");

    message.channel.send(WarnEmbed);
    WarnChannel.send(WarnEmbed);
    
  }


if (command === "mute") {

    if(!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send("jij kan dit niet doen loemperik")
     

    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to mute").catch(console.error);
    }
    let muteMember = message.guild.member(message.mentions.users.first());
    if(!muteMember) {
      return message.reply("That user does not seem valid");
    };

    if(muteMember.hasPermission("MOVE_MEMBERS")) return message.channel.send("sorry, je kunt deze gebruiken niet muten!");  

    var muteRole = message.guild.roles.cache.get('805194051081994281');
    if(!muteRole) return message.channel.send('de role "muted" bestaad niet.');

    muteMember.roles.add(muteRole.id);
    message.channel.send(`${muteMember} is succesvol gemute`);

}


if (command === "unmute") {

    if(!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send("jij kan dit niet doen loemperik")
     

    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to mute").catch(console.error);
    }
    let unmuteMember = message.guild.member(message.mentions.users.first());
    if(!unmuteMember) {
      return message.reply("That user does not seem valid");
    };

    if(unmuteMember.hasPermission("MOVE_MEMBERS")) return message.channel.send("sorry, je kunt deze gebruiken niet muten!");  

    var unmuteRole = message.guild.roles.cache.get('805194051081994281');
    if(!unmuteRole) return message.channel.send('de role "muted" bestaad niet.');

    unmuteMember.roles.remove(unmuteRole.id);
    message.channel.send(`${unmuteMember} is succesvol geunmute`);

}

if(command === "vkick"){
    
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("jij kan dit niet doen loemperik")
     

    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to voice kick").catch(console.error);
    }
    let VkickMember = message.guild.member(message.mentions.users.first());
    if(!VkickMember) {
      return message.reply("That user does not seem valid");
    };

    if(VkickMember.hasPermission("MOVE_MEMBERS")) return message.channel.send("sorry, je kunt deze gebruiken niet voice kicken!");  

    VkickMember.voice.kick()

    message.channel.send(`${unmuteMember} is succesvol gekickt uit zijn channel`);




}

if(command === "vmute"){
    
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("jij kan dit niet doen loemperik")
     

    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to voice kick").catch(console.error);
    }
    let VmuteMember = message.guild.member(message.mentions.users.first());
    if(!VmuteMember) {
      return message.reply("That user does not seem valid");
    };

    if(VmuteMember.hasPermission("MOVE_MEMBERS")) return message.channel.send("sorry, je kunt deze gebruiken niet voice kicken!");  

    VmuteMember.voice.mute()

    message.channel.send(`${VmuteMember} is succesvol gekickt uit zijn channel`);

}

if(command === "vmute"){
    
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("jij kan dit niet doen loemperik")
     

    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to voice kick").catch(console.error);
    }
    let VunmuteMember = message.guild.member(message.mentions.users.first());
    if(!VunmuteMember) {
      return message.reply("That user does not seem valid");
    };

    if(VunmuteMember.hasPermission("MOVE_MEMBERS")) return message.channel.send("sorry, je kunt deze gebruiken niet voice kicken!");  

    VunmuteMember.voice.mute()

    message.channel.send(`${VunmuteMember} is succesvol geserver mute`);

}

if(command === serverinfo){
var Servernaam = message.member.guild.name
var Members = message.member.guild.members

var InfoEmbed = new Discord.MessageEmbed()
.setTitle(Servernaam)
.addField("Members:", Members)

}

})




 // END MESSAGE HANDLER
 
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
 
bot.login(process.env.token);