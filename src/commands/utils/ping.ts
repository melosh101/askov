import {SlashCommands} from "../../interface/SlashCommand";

const PingCommand: SlashCommands = {
    description: "test your connection",
    group: "Util",
    name: "ping",
    run({intr}): void {
        intr.reply({content: "ping", ephemeral: true})
    }

}

export default PingCommand;