import {Client, ClientOptions, Collection} from "discord.js";
import {SlashCommands} from "../interface/SlashCommand";
import Config from "../interface/Config";
import * as fs from "fs";
import * as yaml from "js-yaml"

export default class CustomClient extends Client {
    public static messageEvents: Collection<string, () => {}> = new Collection();
    public static commands: Collection<string, SlashCommands> = new Collection();
    public static config: Config;

    constructor(option: ClientOptions) {
        super(option);
    }

    public loadConfig(): Config {
        let fileContents = fs.readFileSync("./config.yml", "utf-8");
        return yaml.load(fileContents) as Config;

    }
}