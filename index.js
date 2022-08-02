//checkt ob node version 16 oder höher benutzt wird.
if (process.version.slice(1).split(".")[0] < 16) throw new Error("Node 16.0.0 wird benötigt. Aktualisiere Node auf deinem System.");

//lädt das Discord library
const {Client: DiscordClient} = require("discord.js");
let config;
try {
    config = require("./config.json");
    if(!config.token) throw new Error("No token found in config.json");
} catch (err) {
    console.error("config.json file konnte nicht gefunden werden oder ist nicht korrekt aufgesetzt.\n"+
    "Klick hier um das Grundgerüst herunterzuladen: https://pastebin.com/dl/Hc406mbP");
    process.exit(1);
}

//erstellt den Client (aka. bot, self)
const Client = new DiscordClient({
    allowedMentions: {parse: ['users']},
    partials: ['USER', 'GUILD_MEMBER', 'MESSAGE'],
    restTimeOffset: 150,
    intents: [37377]
});

const init = async () => {

    await Client.once("ready", async () => {
        console.log("Bot wurde erfolgreich gestartet!");

        const seiner = await Client.users.fetch("231468084710342656");
        await seiner.send("SeinerBot wurde gestartet, du Hurensohn :)");
    })

    Client.on("messageCreate", async (message) => {
        if (message.author.id === Client.user.id) return;
        if (message.channelId === "1000407782937333803") {
            if (message.embeds.length < 1) return;

            const seiner = await Client.users.fetch("231468084710342656");
            await seiner.send({embeds: [...message.embeds]});
            console.log("Nachricht weitergeleitet");
        }
    });

    await Client.login(config.token);
}

init();