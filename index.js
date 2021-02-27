console.log('Bot online')
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.token) 



client.on('message', (message) =>{
    if (message.content == "n!time"){
        var data = new Date();
        var ora = data.getHours();
        var minuto = data.getMinutes();

        message.channel.send('Ora Attuale ' + ' ' + ora + ':' + minuto);
    }
});

client.on("message", message => {
    if (message.content.startsWith("n!ban")) {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission('UNBAN_MEMBERS')) { //Controllare che l'utente abbia il permesso di bannare
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteKick) {
            message.channel.send('Non hai menzionato nessun utente'); //Controllare che sia stato menzionato un utente
            return;
        }

        if (!message.mentions.members.first().kickable) { //Controllare che il bot abbia il permesso di bannare
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteKick.ban()
            .then(() => message.channel.send("<@" + utenteKick + ">" + " sbannato"))
    }
})

client.on("message", message => {
    if (message.content.startsWith("n!kick")) {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission('KICK_MEMBERS')) { //Controllare che l'utente abbia il permesso di bannare
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteKick) {
            message.channel.send('Non hai menzionato nessun utente'); //Controllare che sia stato menzionato un utente
            return;
        }

        if (!message.mentions.members.first().kickable) { //Controllare che il bot abbia il permesso di bannare
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + ">" + " kiccato"))

    }
})

client.on("message", message => {
    if (message.content.startsWith("n!clear")) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) { //Controllare che l'utente abbia il permesso di cancellare messaggi
            message.channel.send('Non hai il permesso');
            return;
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) { //Controllare che il bot abbia il permesso di cancellare messaggi
            message.channel.send('Non ho il permesso');
            return;
        }

        var count = message.content.slice(7); //Ottenere il numero inserito dall'utente
        count = parseInt(count);

        if (!count) {
            message.channel.send("Inserisci un numero valido")
            return
        }

        message.channel.bulkDelete(count, true)
        message.channel.send(count + " messaggi eliminati").then(msg => {
            msg.delete({ timeout: 1000 })
        })

    }
})

client.on("guildMemberAdd", member => { //Update canale quando entra un utente dal server
    var canale = client.channels.cache.get("812735152944971786")
    canale.setName("👾│members: " + member.guild.memberCount)
});
client.on("guildMemberRemove", member => { //Update canale quando esce un utente dal server
    var canale = client.channels.cache.get("812735152944971786")
    canale.setName("👾│members: " + member.guild.memberCount)
});

client.on('message', message => {
    const args = message.content.split(" ").slice(1);
    if(message.content.startsWith('n!say')) {
         
        var saytext = args.join(" ");
        var embed = new Discord.MessageEmbed()
        .setTitle("Un utente ha detto")
        .setDescription(saytext)
        .setColor("#00ff")
        .setTimestamp()

        
        message.delete({timeout: 1000})
        message.channel.send(embed)
    };
  } )

  client.on("message", message => {
    if (message.content == "n!serverinfo") {
        var server = message.member.guild;

        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var utentiCount = server.memberCount - botCount;

        var categoryCount = server.channels.cache.filter(c => c.type == "category").size
        var textCount = server.channels.cache.filter(c => c.type == "text").size
        var voiceCount = server.channels.cache.filter(c => c.type == "voice").size

        var embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("Tutte le info su questo server")
            .setThumbnail(server.iconURL())
            .addField("<a:right:808037988932124692>Owner", server.owner.user.username, true)
            .addField("<a:right:808037988932124692>Server id", server.id, true)
            .addField("<a:right:808037988932124692>Server region", server.region, true)
            .addField("<a:right:808037988932124692>Members", "Total: " + server.memberCount + " - Users: " + utentiCount + " - Bots: " + botCount, false)
            .addField("<a:right:808037988932124692>Channels", "Category: " + categoryCount + " - Text: " + textCount + " - Voice: " + voiceCount, false)
            .addField("<a:right:808037988932124692>Server created", server.createdAt.toDateString() + "```", true)
            .addField("<a:right:808037988932124692>Boost level", "Level " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")`", true)
            .setColor("")

        message.channel.send(embed)
    }
})

client.on("message", message => {
    if (message.content.startsWith("n!userinfo")) {
        if (message.content == "n!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Non ho trovato questo utente")
            return
        }

        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.avatarURL())
            .addField("<a:right:808037988932124692>User id", utente.user.id, true)
            .addField("<a:right:808037988932124692>Status", utente.user.presence.status, true)
            .addField("<a:right:808037988932124692>Is a bot?", utente.user.bot ? "Yes" : "No`", true)
            .addField("<a:right:808037988932124692>Account created", utente.user.createdAt.toDateString(), true)
            .addField("<a:right:808037988932124692>Joined this server", utente.joinedAt.toDateString(), true)
            .addField("<a:right:808037988932124692>Permissions", elencoPermessi, false)
            .addField("<a:right:808037988932124692>Roles", utente.roles.cache.map(ruolo => ruolo.name).join("\r"), false)

        message.channel.send(embed)
    }
})

client.on("message", message => {
    if (message.content.startsWith("n!avatar")) {
        if (message.content.trim() == "n!avatar") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Utente non trovato")
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("L'avatar di questo utente")
            .setImage(utente.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 512
            }))

        message.channel.send(embed)
    }
})

client.on("message", message => {
    if (message.content.startsWith("n!roleinfo")) {
        var idRuolo = message.content.slice(13, -1);
        var ruolo = message.guild.roles.cache.get(idRuolo);

        if (!ruolo) {
            message.channel.send("Non ho trovato questo ruolo")
            return
        }

        var memberCount = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == ruolo)).size;

        var permessiRuolo = new Permissions(ruolo.permissions.bitfield);
        var elencoPermessi = "";
        if (permessiRuolo.has("ADMINISTRATOR")) {
            elencoPermessi = "👑ADMINISTRATOR";
        }
        else {
            var permissions = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permissions.length; i++) {
                if (permessiRuolo.has(permissions[i])) {
                    elencoPermessi += "- " + permissions[i] + "\r";
                }
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(ruolo.name)
            .setDescription("Tutte le statistiche di questo ruolo")
            .addField("Role ID", "```" + ruolo.id + "```", true)
            .addField("Members", "```" + memberCount + "```", true)
            .addField("Color", "```" + ruolo.hexColor + "```", true)
            .addField("Role created", "```" + ruolo.createdAt.toDateString() + "```", true)
            .addField("Permissions", "```" + elencoPermessi + "```", false)

        message.channel.send(embed)
    }
})

const { Permissions } = require('discord.js');

client.on("message", message => {
    if (message.content == "n!help") {
        const nomeEmbed = new Discord.MessageEmbed()
            .setColor("#0000") // Colore principale
            .setTitle("👻Help👻") //Titolo
            .setAuthor("Nigth.") //Autore (nome, link immagine, link sul nome)
            .setDescription("Qui ci saranno tutti i coamndi per i mod e per i non mod \r my prefix is n!") //Descrizione
            .addField("ban", "`banna un utente specifico`", true / false) //True o false = se questo elemento deve essere in linea con gli altri
            .addField("kick", "`espelli un utente specifico`", true / false)
            .addField("userinfo", "`le informazioni su un utente specifico`", true / false)
            .addField("serverinfo", "`le informazioni del server`", true / false)
            .addField("avatar", "`l'avatar di un utente specifico` ", true / false)
            .addField("roleinfo", "`le informazioni su un ruolo specifico`", true / false)
            .addField("say", "`manda un messaggio anonimo`", true / false)
            .addField("time", "`vi dice l'ora attuale` ", true / false)
            

        message.channel.send(nomeEmbed)
    }
})

client.once('ready', () => {
    console.log('sta giocando a n!help');
    client.user.setActivity('👻n!help👻', { type: 'WATCHING'});

});

client.on("message", message => {
    if (message.content.startsWith("n!unban")) {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission('UNBAN_MEMBERS')) { //Controllare che l'utente abbia il permesso di bannare
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteKick) {
            message.channel.send('Non hai menzionato nessun utente'); //Controllare che sia stato menzionato un utente
            return;
        }

        if (!message.mentions.members.first().unkickable) { //Controllare che il bot abbia il permesso di bannare
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteKick.unaban()
            .then(() => message.channel.send("<@" + utenteUnban + ">" + " sbannato"))
    }
})