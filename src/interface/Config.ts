import {serverInfo} from "../clients/RconManager";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export default interface Config {
    token: string
    devGuild: string
    clientId: string
    isDev: boolean
    servers: serverInfo[]
    database: PostgresConnectionOptions
}