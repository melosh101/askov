import {serverInfo} from "../clients/RconManager";
import {DataSourceOptions} from "typeorm";

export default interface Config {
    token: string
    devGuild: string
    isDev: boolean
    servers: serverInfo[]
    database: DataSourceOptions
}