import { IsString, IsNumber } from "class-validator";

import { uuidv4 } from '../../commons/utils/uuid';

export class Transaction {

    id: string;

    @IsString()
    description: string;

    @IsString({ each: true })
    tags: string[];

    @IsNumber()
    value: number;

    @IsString()
    emitter: string;

    @IsString()
    date: string;

    month: number;

    year: number;

    constructor(id: string, description: string,
        tags: string[], value: number, emitter: string, date: string) {

            this.id = id;
            this.description = description;
            this.tags = tags;
            this.value = value;
            this.emitter = emitter;
            this.date = date;
            this.month = parseInt(date.split('-')[1]);
            this.year = parseInt(date.split('-')[0]);
    }

    static fromRequest(body: any): Transaction{
        return new Transaction(uuidv4(), body.description,
            body.tags, body.value, body.emitter, body.date)
    }

}