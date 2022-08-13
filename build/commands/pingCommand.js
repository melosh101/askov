"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const framework_1 = require("@sapphire/framework");
class PingCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, Object.assign(Object.assign({}, options), { name: 'ping', description: 'Ping bot to see if it is alive' }));
    }
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description));
    }
}
exports.PingCommand = PingCommand;
