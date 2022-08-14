import { ApplicationCommandOptionData, CommandInteraction, PermissionResolvable } from "discord.js";
import CustomClient from "../clients/CustomClient";

interface CommandRun {
    client: CustomClient;
    intr: CommandInteraction;
}

type Run = (command: CommandRun) => void;

export interface SlashCommands {
    cooldown?: number;
    cooldownResponse?: string;
    name: string;
    description: string;
    dmOnly?: boolean;
    guildOnly?: boolean;
    options?: ApplicationCommandOptionData[];
    defaultPermission?: boolean;
    permissionsUser?: PermissionResolvable[];
    permissionsBot?: PermissionResolvable[];
    group: string;
    devOnly?: boolean;
    run: Run;

}