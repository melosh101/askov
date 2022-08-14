import {Client, ClientOptions, Collection, REST} from "discord.js";
import {SlashCommands} from "../interface/SlashCommand";
import Config from "../interface/Config";
import * as fs from "fs";
import * as yaml from "js-yaml"
import * as path from "path";
import {DataSource} from "typeorm"
import {Routes} from "discord-api-types/v10";
import Players from "../entity/players";


export default class CustomClient extends Client {
    public static messageEvents: Collection<string, () => {}> = new Collection();
    public commands: Collection<string, SlashCommands> = new Collection();
    public db!: DataSource;
    public config!: Config;

    constructor(option: ClientOptions) {
        super(option);
    }

    public async connectDataSource(): Promise<void> {
        if(!this.config) {
            throw new Error("config not loaded")
        }
        this.db = new DataSource({
            type: this.config.database.type,
            host: this.config.database.host,
            port: this.config.database.port,
            username: this.config.database.username,
            password: this.config.database.password,
            database: this.config.database.database,
            entities: [Players],
            synchronize: this.config.database.synchronize,
            logging: this.config.database.logging,
        })
    }

    public loadConfig(): void {
        let fileContents = fs.readFileSync(path.resolve("config.yml"), "utf-8");
        this.config = yaml.load(fileContents) as Config;

    }

    public async registerCommands(): Promise<void> {
        const commandsPath = path.join(__dirname,"..", "commands");
        await fs.readdirSync(commandsPath).forEach( (dir) => {
            const commands = fs.readdirSync(`${commandsPath}/${dir}`).filter((file) => file.endsWith(".js"));
            commands.forEach(async (file) => {

                const cmd = await import(path.resolve(`${commandsPath}/${dir}/${file}`));
                 this.commands.set(cmd.default.name, cmd.default)
                console.log(`registering command ${cmd.default.name} in ${commandsPath}/${dir}/${file}`)
                console.log(cmd)
            })
            return;
        })
    }

    public async postCommands() {
        const rest = new REST({version: "10"}).setToken(this.config.token)
        if(this.config.isDev) {
            console.log("isdev")
            console.log(this.commands.toJSON())
            rest.put(Routes.applicationGuildCommands(this.config.clientId, this.config.devGuild), {body: this.commands.toJSON()})
                .then(() => console.log("pushed commands"))
                .catch(console.error)
        }
    }
}