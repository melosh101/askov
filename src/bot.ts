import CustomClient from "./clients/CustomClient";
import RconManager, {serverInfo} from "./clients/RconManager";
import "reflect-metadata";
import {createConnection} from "typeorm";
(async () => {
    const client = new CustomClient({intents: ["Guilds", "GuildMessages"]})

    client.loadConfig();
    createConnection(client.config.database);

    const rcon = RconManager.getInstance()
    client.config.servers.forEach((s: serverInfo) => {
        rcon.connectServer(s.name, s.ip, s.port, s.password);
    })

    setTimeout(() => {
        console.dir("sending message")
        const server = rcon.conns.get("askov-smp");
        if(!server) {
            console.dir("server not connected")
            return;
        }
        rcon.sendCommand("askov-smp", "say hello world")
    }, 5e3)
    client.on("ready", () => {
        console.dir(client.config)
    })
    client.login(client.config.token)
})()