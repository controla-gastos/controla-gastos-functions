import { IsNumber, IsString } from "class-validator";

export class Income {

    @IsString()
    id: string

    @IsNumber()
    plannedActual: number;

    @IsNumber()
    plannedIncome: number;

    @IsNumber()
    plannedAmountSpend: number;

    constructor(id: string, 
        plannedActual: number, plannedIncome: number,
        plannedAmountSpend: number) {
        this.id = id;
        this.plannedActual = plannedActual;
        this.plannedIncome = plannedIncome;
        this.plannedAmountSpend = plannedAmountSpend;
    }

    static fromRequest(body: any): Income {
        return new Income(body.id, body.plannedActual,
            body.plannedIncome,
            body.plannedAmountSpend);
    }

}