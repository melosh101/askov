import { Command} from "@sapphire/framework";
import {Message} from "discord.js";

export class CumCommand extends Command {

    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "cum",
            aliases: ["comming"],
            description: "haha cum"
        });
    }
    public async messageRun(message: Message) {
        message.channel.send("ha CUM")
    }

    public registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder: SlashCommandBuilder) => {
            builder.setName(this.name).setDescription(this.description)
        })
    }
}
