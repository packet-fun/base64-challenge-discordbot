'use strict'; 
const Discord = require('discord.js');
const { prefix, token, challengechannel, passrole } = require('./config.json');
const btoa = require("btoa");
const client = new Discord.Client();


// The actual challenge and embed
function getEmbed(member) {

    let challenge = `Paste this whole line into the chat {${member.id.substr(member.id.length - 4)}}`;

    return new Discord.MessageEmbed()
        .setTitle(`Welcome ${member.user.tag}`)
        .setColor(0xffff00)
        .setDescription('This a basic test you must pass to gain access to the server.' +
            '**```autohotkey\nPlease decode:\n' + btoa(challenge) + '```**' +
            'Once you have the answer just type it below.');
}


client.once('ready', () => {
    console.log('Bot running.');
    client.user.setActivity('type !string if you lose your challenge');
});


// new member joins - send a challenge
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === challengechannel);

    if (!channel) return;
    channel.send(getEmbed(member));
});


client.on('message', message => {
    // ignore bots (including self)
    if (message.author.bot) return;

    // check if they sent a challenge
    check_challenge(message)
    
    // !string command - resend challenge
    if (message.channel.id === challengechannel && !message.member.roles.cache.some(role => role.name === passrole)) { 
	if (message.content.includes("!string")) {
            message.reply(getEmbed(message.member));
	}
    }
});


function check_challenge(message) {
    // correct channel + no member role
    if (message.channel.id === challengechannel && !message.member.roles.cache.some(role => role.name === passrole)) { 
        // correct - give member role - delete answer
        if (message.content === `Paste this whole line into the chat {${message.author.id.substr(message.author.id.length - 4)}}`) {
            message.delete()
            message.channel.send(`Well done ${message.member}, you can now access the server.`)

            let role = message.guild.roles.cache.find(r => r.name === passrole);
            message.member.roles.add(role);

        } else if (message.content.includes("Paste this whole line into the chat")) {
	    // close - delete the attempted answer and give a hint
            message.delete()
            message.channel.send(`Close ${message.member}, double check the numbers in the brackets. Perhaps you decoded someone elses string?`)

        } else { //incorrect
            if (!message.content.startsWith(prefix)) message.channel.send(`Nope, try again ${message.member}`)
        }
    }
}

client.login(token);
