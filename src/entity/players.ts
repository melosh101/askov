import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export default class Players extends BaseEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    username!: string;

    @Column({type: "uuid"})
    uuid!: string;

    @Column({default: false})
    banned!: boolean
}