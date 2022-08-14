import {Rcon} from "rcon-client";

export interface serverInfo {
    ip: string;
    port: number;
    name: string;
    connection: Rcon;
}

export default class RconManager {
    private static instance: RconManager | null = null;
    public conns: Map<String, {
        ip: string,
        port: number
        name: string
        connection: Rcon
    }> = new Map();

    private constructor() {

    }

    public getInstance(): RconManager {
        if (RconManager.instance == null)
            RconManager.instance = new RconManager()
        return RconManager.instance;
    }

    public async connectServer(name: string, ip: string, port: number,  password: string): Promise<void> {
        const conn = await Rcon.connect({
            host: ip,
            port,
            password: password
        })
        this.conns.set(name, {
            ip,
            name,
            connection: conn,
            port
        })
    }

    public async whitelistUser(name: String, player: string): Promise<boolean> {
        const con: serverInfo | undefined = this.conns.get(name);
        if(!con) {
            return false;
        }

        const rep = await con.connection.send(`whitelist ${player}`)
        return rep.toLowerCase().includes("added");


    }

}