const { Client } = require("discord.js");
const { channels, staffRoles, unregisterRoles, fhoozyunregisterSound, fhoozystaffSound, tokens } = require("./settings.json");   //Created By. Fhoozy Lyrocks (Fhoozy#0001)

 tokens.forEach((token, i) => {
  const client = new Client();
  let connection;
  client.on("ready", async () => connection = await client.channels.cache.get(channels[i]).join());   //Created By. Fhoozy Lyrocks (Fhoozy#0001)
    
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if ((oldState.channelID && !newState.channelID) || (oldState.channelID && newState.channelID && oldState.channelID === newState.channelID) || newState.member.user.bot || newState.channelID !== channels[i]) return;   //Created By. Fhoozy Lyrocks (Fhoozy#0001)
    const hasStaff = newState.channel.members.some((x)=> staffRoles.some((r) => x.roles.cache.has(r)));
    const staffSize = newState.channel.members.filter((x) => staffRoles.some((r) => x.roles.cache.has(r))).size;   //Created By. Fhoozy Lyrocks (Fhoozy#0001)
    const unregisterSize = newState.channel.members.filter((x) => unregisterRoles.some((r) => x.roles.cache.has(r))).size;
    if (!hasStaff && unregisterSize === 1) await connection.play(fhoozyunregisterSound);
    else if (hasStaff && staffSize === 1 && unregisterSize === 1) await connection.play(fhoozystaffSound);   //Created By. Fhoozy Lyrocks (Fhoozy#0001)
  });

  
  client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "Sunucu Adınız ❤️ İsminiz" }, status: "idle" }); //Created By. Fhoozy Lyrocks (Fhoozy#0001)
  })
  
  
  client.login(token).then(() => console.log(`${client.user.tag} Aktif!`)).catch(() => console.error(`${token} | Tokende Hata Var, Token Aktif Edilemedi!`));
});//Created By. Fhoozy Lyrocks (Fhoozy#0001)
