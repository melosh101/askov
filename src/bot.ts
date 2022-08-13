import {SapphireClient} from "@sapphire/framework";
import dotenv from "dotenv";
import * as process from "process";
dotenv.config();

const client = new SapphireClient({intents: ["GUILDS", "GUILD_MESSAGES"]})
client.on("messageCreate", (msg) => {
    if(msg.author.bot)
        return;
    msg.content.toLowerCase().startsWith("cum");
    msg.channel.send("cum. YUMMY!")
})
client.login(process.env.TOKEN)