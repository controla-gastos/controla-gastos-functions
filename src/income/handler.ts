
import * as functions from 'firebase-functions';
import { ValidationError, validate } from 'class-validator';
import * as cors from 'cors';
const corsHandler = cors({ origin: true });

import { HttpService } from '../commons/http/httpService';
import { Response } from '../commons/http/interfaces';
import { IncomeRepository } from './repository/incomeRepository';
import { Income } from './models/income';
import { HttpError } from '../commons/exceptions/HttpError';
import { TransactionRepository } from '../transactions/repository/transactionRepository';


export const getIncome = functions.https.onRequest(
    async (request: functions.Request, response: functions.Response) => {
        corsHandler(request, response, async () => {
            let res: Response;

            try {

                const incomeRepository: IncomeRepository
                    = new IncomeRepository();

                const dbResponse = await incomeRepository.getIncome();
                
                const transRepository: TransactionRepository
                    = new TransactionRepository();
        
                const date = new Date();

                const params = {
                    month: date.getMonth() + 1,
                    year: date.getFullYear()
                }
                const amount: number = await transRepository.getTotalAmmount(params);

                let income: any = [];

                dbResponse.forEach((doc: any) => income.push(doc.data()));
                income = income[0];
                income.amountSpent = amount;

                res = HttpService.buildResponse(200, HttpService.buildBodyResponse(income, 1));
                response.status(res.statusCode).send(res.body);

            } catch (error) {

                if (error.statusCode) {
                    console.log(error.message, error.statusCode);
                    res = HttpService.buildErrorResponse(error.statusCode, error.message);
                } else {
                    console.log(`Ocorreu um erro inesperado: ${error}`);
                    res = HttpService.buildErrorResponse(500, 'Ocorreu um erro inesperado');
                }

                response.status(res.statusCode).send(res.body);

            }

        })

    });

export const updateIncome = functions.https.onRequest(
    async (request: functions.Request, response: functions.Response) => {
        corsHandler(request, response, async () => {
            let res: Response;

            try {

                const incomeRepository: IncomeRepository
                    = new IncomeRepository();

                const income: Income = Income
                    .fromRequest(request.body);

                const validation: ValidationError[] = await validate(income);

                if (validation.length > 0) {
                    const message: string = validation.map(v => v.toString()).toString();
                    throw new HttpError(message, 400);
                }

                await incomeRepository.updateIncome(income);

                res = HttpService.buildResponse(200, HttpService.buildBodyResponse(income, 1));
                response.status(res.statusCode).send(res.body);

            } catch (error) {

                if (error.statusCode) {
                    console.log(error.message, error.statusCode);
                    res = HttpService.buildErrorResponse(error.statusCode, error.message);
                } else {
                    console.log(`Ocorreu um erro inesperado: ${error}`);
                    res = HttpService.buildErrorResponse(500, 'Ocorreu um erro inesperado');
                }

                response.status(res.statusCode).send(res.body);

            }

        })

    });