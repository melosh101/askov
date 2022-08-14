import {Client, ClientOptions, Collection} from "discord.js";
import {SlashCommands} from "../interface/SlashCommand";
import Config from "../interface/Config";
import * as fs from "fs";
import * as yaml from "js-yaml"
import * as path from "path";
import {DataSource} from "typeorm"


export default class CustomClient extends Client {
    public static messageEvents: Collection<string, () => {}> = new Collection();
    public static commands: Collection<string, SlashCommands> = new Collection();
    public DataSource: any;
    public config!: Config;

    constructor(option: ClientOptions) {
        super(option);
    }

    public async connectDataSource(): Promise<void> {
        this.DataSource = new DataSource(this.config.database)
    }

    public loadConfig(): void {
        let fileContents = fs.readFileSync(path.resolve("config.yml"), "utf-8");
        this.config = yaml.load(fileContents) as Config;

    }
}