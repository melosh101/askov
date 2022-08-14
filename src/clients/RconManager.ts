import {Rcon} from "rcon-client";

export interface serverInfo {
    ip: string;
    port: number;
    name: string;
    password: string
    connection: Rcon;
}

export default class RconManager {
    private static instance: RconManager | null = null;
    public conns: Map<String, serverInfo> = new Map();

    private constructor() {

    }

    public static getInstance(): RconManager {
        if (RconManager.instance == null)
            RconManager.instance = new RconManager()
        return RconManager.instance;
    }

    public async connectServer(name: string, ip: string, port: number,  password: string): Promise<void> {
        console.log("connecting to server")
        const conn = new Rcon({
            host: ip,
            port,
            password: password
        });
        conn.on("authenticated", () => {
            console.log("server has connected")
            this.conns.set(name, {
                ip,
                name,
                connection: conn,
                port,
                password
            });
        });

        conn.connect();

    }

    public async whitelistUser(name: String, player: string): Promise<boolean> {
        const con: serverInfo | undefined = this.conns.get(name);
        if(!con) {
            return false;
        }

        const rep = await con.connection.send(`whitelist ${player}`)
        return rep.toLowerCase().includes("added");


    }

    public async sendCommand(server: string, command: string) {
        const con = this.conns.get(server);
        if(!con)
            throw new Error("rcon not connected to server");

        con.connection.send(command);
    }

}