import CustomClient from "./clients/CustomClient";
import RconManager, {serverInfo} from "./clients/RconManager";
import "reflect-metadata";
import {Interaction} from "discord.js";
(async () => {
    const client = new CustomClient({intents: ["Guilds", "GuildMessages"]})

    client.loadConfig();
    await client.connectDataSource()

    const rcon = RconManager.getInstance()
    client.config.servers.forEach((s: serverInfo) => {
        rcon.connectServer(s.name, s.ip, s.port, s.password);
    })


    client.on("ready", async () => {
        console.dir(client.config);
        await client.registerCommands();
        await client.postCommands();
    })
    client.on("interactionCreate", (intr: Interaction) => {
        if(intr.isCommand()) {
            const cmd = client.commands.get(intr.commandName);
            if(!cmd) {
                intr.reply({content: `command ${intr.command?.name} is deprecated`, ephemeral: true})
                return;
            }
            cmd.run({client, intr})
            return;
        }
    })
    client.login(client.config.token)
})()