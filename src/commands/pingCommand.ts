import {ChatInputCommand, Command} from '@sapphire/framework';

export class PingCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options, name: 'ping', description: 'Ping bot to see if it is alive' });
    }

    public registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description));
    }
}