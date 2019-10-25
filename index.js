const fs = require('fs');
const zeew = require('zeew');

const config = require('./config.js');
const token = process.env.TOKEN;

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', async() => {
    console.info(`${client.user.tag} Funcionando en ${client.guilds.size} servidores.`)
    client.user.setPresence({
        game: {
            type: config.game,
            name: config.statusMSG
        },
        status: config.status
    })
});

client.on('message', async (message) => {
    const prefix = config.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
  

    if (!message.content.startsWith(prefix)) return; 
    if (message.author.bot) return;
    if(message.channel.type === "dm") return msg.channel.send("No respondo MD's");

    if(message.content.startsWith(prefix +'halloween-me')){
        let u = Math.round(message.author.username.length / 2)
        let first_half = message.author.username.slice(0, u)
        let img = await zeew.img.invert(message.author.avatarURL)
         let attachment = new Discord.Attachment(img, 'img.png');
        
        
        let e = new Discord.RichEmbed()
        .setAuthor("👻 Ghost 👻")
        .attachFile(attachment)
        .setThumbnail("attachment://img.png")
        .setColor("#FE8E00")
        .setTitle("Cambia tu perfil para que se vea mas halloween")
        .setDescription("Cambia tu foto de perfil a esto =>")
        .addField("Nick:", "`"+first_half+"Ghost 👻`")
        message.channel.send("attachment")
    }
});

client.on('error', async (error) => {
    if(error) console.error(error.stack);
})

client.login(token)