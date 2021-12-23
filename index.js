const { MessageMenuOption, MessageMenu, MessageActionRow, MessageButton } = require('discord-buttons');
const Discord = require('discord.js');
const config = require('./config.json');
const jointocreatemap = new Map();

const client = new Discord.Client();
require('discord-buttons')(client);

client.once('ready', () => {
    console.log(`${client.user.tag} is now online`)
});

client.on('clickMenu', async menu => {
    if (menu.values[0] == 'discord') {
        await menu.clicker.fetch()
        const channel = await menu.guild.channels.create(`Ticket-${menu.clicker.user.tag}`)
        const role = menu.guild.roles.cache.get(config.staff)
        channel.setParent(config.ticketParent)

        channel.updateOverwrite(menu.guild.id, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
        })
        channel.updateOverwrite(menu.clicker.user, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(role, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });
        menu.reply.defer();

        const embed1 = new Discord.MessageEmbed()
            .setTitle('<:discord:923550499054190643> Discord Services')
            .setColor('#5865F2')
            .setDescription(`**Καλησπέρα πώς θα μπορούσαμε να σε βοηθήσουμε;**`)
            .setThumbnail(menu.guild.iconURL({ dynamic: true }))

        const buttonclose = new MessageButton()
            .setStyle('red')
            .setEmoji('🔒')
            .setID('buttonclose');

        await channel.send(embed1, buttonclose)
    }
    if (menu.values[0] == 'fivem') {
        await menu.clicker.fetch()
        const channel = await menu.guild.channels.create(`Ticket-${menu.clicker.user.tag}`)
        const role = menu.guild.roles.cache.get(config.staff)
        channel.setParent(config.ticketParent)

        channel.updateOverwrite(menu.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        })
        channel.updateOverwrite(menu.clicker.user, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(role, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });

        menu.reply.defer();

        const embed1 = new Discord.MessageEmbed()
            .setTitle('<:fivem:923550498932551690> FiveM Services')
            .setColor('#ff6f00')
            .setDescription(`**Καλησπέρα πώς θα μπορούσαμε να σε βοηθήσουμε;**`)
            .setThumbnail(menu.guild.iconURL({ dynamic: true }))

        const buttonclose = new MessageButton()
            .setStyle('red')
            .setEmoji('🔒')
            .setID('buttonclose');

        await channel.send(embed1, buttonclose)
    }
    if (menu.values[0] == 'p2p') {
        await menu.clicker.fetch()
        const channel = await menu.guild.channels.create(`Ticket-${menu.clicker.user.tag}`)
        const role = menu.guild.roles.cache.get(config.staff)
        channel.setParent(config.ticketParent)

        channel.updateOverwrite(menu.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        })
        channel.updateOverwrite(menu.clicker.user, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(role, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });

        menu.reply.defer();

        const embed1 = new Discord.MessageEmbed()
            .setTitle('<:p2p:923550499196796989> P2P')
            .setColor('BLUE')
            .setDescription(`**Καλησπέρα πώς θα μπορούσαμε να σε βοηθήσουμε;**`)
            .setThumbnail(menu.guild.iconURL({ dynamic: true }))

        const buttonclose = new MessageButton()
            .setStyle('red')
            .setEmoji('🔒')
            .setID('buttonclose');

        await channel.send(embed1, buttonclose)
    }
    if (menu.values[0] == 'support') {
        await menu.clicker.fetch()
        const channel = await menu.guild.channels.create(`Ticket-${menu.clicker.user.tag}`)
        const role = menu.guild.roles.cache.get(config.staff)
        channel.setParent(config.ticketParent)

        channel.updateOverwrite(menu.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        })
        channel.updateOverwrite(menu.clicker.user, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });
        channel.updateOverwrite(role, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });

        menu.reply.defer();

        const embed1 = new Discord.MessageEmbed()
            .setTitle('<:support:923550498727002155> Support')
            .setColor('#5865F2')
            .setDescription(`**Καλησπέρα πώς θα μπορούσαμε να σε βοηθήσουμε;**`)
            .setThumbnail(menu.guild.iconURL({ dynamic: true }))

        const buttonclose = new MessageButton()
            .setStyle('red')
            .setEmoji('🔒')
            .setID('buttonclose');

        await channel.send(embed1, buttonclose)
    }
});

client.on('clickButton', async button => {
    if (button.id == 'buttonclose') {
        setTimeout(function () {
            button.channel.delete()
        }, 5000);

        button.channel.send('Αυτο το ticket θα σβηστει σε 5 δευτερόλεπτα')


        button.reply.defer()
    }
})

client.on('message', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('Pong!')
    }
    if (command === 'ticket') {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.delete();
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription('**Για την εξυπηρέτηση σας ορίστε την επιλογή που παρουσιάζει το θεμα του ticket σας**')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setThumbnail(message.guild.iconURL({ dynamic: true }))

        const disc = new MessageMenuOption()
            .setLabel('Discord')
            .setDescription('Discord Services')
            .setEmoji('923550499054190643')
            .setValue('discord')

        const fivem = new MessageMenuOption()
            .setLabel('Fivem')
            .setDescription('FiveM Services')
            .setEmoji('923550498932551690')
            .setValue('fivem')

        const p2p = new MessageMenuOption()
            .setLabel('P2P')
            .setDescription('Paysafe To PayPal')
            .setEmoji('923550499196796989')
            .setValue('p2p')

        const support = new MessageMenuOption()
            .setLabel('Support')
            .setDescription('Για οποιαδήποτε ερώτηση')
            .setEmoji('923550498727002155')
            .setValue('support')

        const Menu = new MessageMenu()
            .setID('menu1')
            .setPlaceholder('Διάλεξε το θέμα του Ticket')
            .addOption(disc)
            .addOption(fivem)
            .addOption(p2p)
            .addOption(support)

        const row = new MessageActionRow()
            .addComponent(Menu)

        await message.channel.send(embed, { components: [row] })
    }
});
client.on("voiceStateUpdate", (oldState, newState) => {

    // SET CHANNEL NAME STRING
    //IGNORE BUT DONT DELETE!
    let oldparentname = "unknown"
    let oldchannelname = "unknown"
    let oldchanelid = "unknown"
    if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
    if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
    if (oldState && oldState.channelID) oldchanelid = oldState.channelID
    let newparentname = "unknown"
    let newchannelname = "unknown"
    let newchanelid = "unknown"
    if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
    if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
    if (newState && newState.channelID) newchanelid = newState.channelID
    if (oldState.channelID) {
        if (typeof oldState.channel.parent !== "undefined") oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
        else oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`
    }
    if (newState.channelID) {
        if (typeof newState.channel.parent !== "undefined") newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
        else newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`
    }
    // JOINED V12
    if (!oldState.channelID && newState.channelID) {
        if (newState.channelID !== config.JOINTOCREATECHANNEL) return;  //if its not the jointocreatechannel skip
        jointocreatechannel(newState);   //load the function
    }
    // LEFT V12
    if (oldState.channelID && !newState.channelID) {
        //get the jointocreatechannel id from the map
        if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
            //fetch it from the guild
            var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
            //if the channel size is below one
            if (vc.members.size < 1) {
                //delete it from the map
                jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`);
                //delete the voice channel
                return vc.delete();
            }
            else {
            }
        }
    }
    // Switch v12
    if (oldState.channelID && newState.channelID) {

        if (oldState.channelID !== newState.channelID) {
            //if its the join to create channel
            if (newState.channelID === config.JOINTOCREATECHANNEL)
                //make a new channel
                jointocreatechannel(oldState);
            //BUT if its also a channel ín the map (temp voice channel)
            if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
                //fetch the channel
                var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
                //if the size is under 1
                if (vc.members.size < 1) {
                    //delete it from the map
                    jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`);
                    //delete the room
                    return vc.delete();
                }
                else {
                }
            }
        }
    }
})
async function jointocreatechannel(user) {
    //user.member.user.send("This can be used to message the member that a new room was created")
    await user.guild.channels.create(`📞Support Room`, {
        type: 'voice',
        parent: user.channel.parent.id, //or set it as a category id
    }).then(async vc => {
        //move user to the new channel
        user.setChannel(vc);
        //set the new channel to the map
        jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
        //change the permissions of the channel
        const role = vc.guild.roles.cache.get('885632638856089602')
        await vc.overwritePermissions([
            {
                id: user.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: role,
                allow: ['VIEW_CHANNEL']
            }
        ]);
    })
}

client.login(config.token);