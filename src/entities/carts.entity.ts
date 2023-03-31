import { Column, Entity, PrimaryColumn } from 'typeorm';

export type TStatus = "OPEN" | "ORDERED";

@Entity()
export class Carts {
    @PrimaryColumn({
        name: 'id',
    })
    id: string;

    @Column({ type: 'text', nullable: false })
    user_id: string;

    @Column({ type: 'date', nullable: false })
    created_at: Date;

    @Column({ type: 'date', nullable: false })
    updated_at: Date;

    @Column({ type: 'enum', enum: ["hardcover", "paperback", "digital"] })
    status: TStatus
}