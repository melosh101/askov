"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    chatInputRun(intr) {
        return __awaiter(this, void 0, void 0, function* () {
            yield intr.reply({ content: "pong", ephemeral: true });
        });
    }
}
exports.PingCommand = PingCommand;
