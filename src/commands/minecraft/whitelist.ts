import {SlashCommands} from "../../interface/SlashCommand";
import Players from "../../entity/players";
import RconManager from "../../clients/RconManager";

const WhitelistCommand: SlashCommands = {
    description: "get whitelisted on out servers",
    group: "minecraft",
    name: "whitelist",
    options: [
        {
            name: "username",
            type: 3,
            description: "your username",
            required: true
        }
    ],
    async run({client, intr}): Promise<void> {
        let user = await Players.findOne({where: {id: intr.user.id}})
        let usernmame = intr.options.getString
        if(user) {
            intr.reply({content: "you're already whitelisted", ephemeral: true});
            return;
        }

        RconManager.getInstance().whitelistUser("askov-smp", )


    }

}