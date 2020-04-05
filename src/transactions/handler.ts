'use strict';
import * as functions from 'firebase-functions';
import * as cors from 'cors';
const corsHandler = cors({ origin: true });

import { ValidationError, validate } from 'class-validator';

import { Transaction } from './models/transaction';
import { HttpService } from '../commons/http/httpService';
import { Response } from '../commons/http/interfaces';
import { HttpError } from '../commons/exceptions/HttpError';
import { TransactionRepository } from './repository/transactionRepository';

export const addTransaction = functions.https.onRequest(
  (async (request: functions.Request, response: functions.Response) => {
    corsHandler(request, response, async () => {
      let res: Response;

      try {

        const trans: Transaction = Transaction
          .fromRequest(request.body);

        const transRepository: TransactionRepository
          = new TransactionRepository();

        const validation: ValidationError[] = await validate(trans);

        if (validation.length > 0) {
          const message: string = validation.map(v => v.toString()).toString();
          throw new HttpError(message, 400);
        }

        await transRepository.addTransaction(trans);

        res = HttpService.buildResponse(200, HttpService.buildBodyResponse(trans, 1));
        return response.status(res.statusCode).send(res.body);

      } catch (error) {

        if (error.statusCode) {
          console.log(error.message, error.statusCode);
          res = HttpService.buildErrorResponse(error.statusCode, error.message);
        } else {
          console.log(`Ocorreu um erro inesperado: ${error}`);
          res = HttpService.buildErrorResponse(500, 'Ocorreu um erro inesperado');
        }

        return response.status(res.statusCode).send(res.body);

      }
    })


  }));

export const getTransactions = functions.https.onRequest(
  async (request: functions.Request, response: functions.Response) => {
    corsHandler(request, response, async () => {
      let res: Response;

      try {

        const params = request.query;

        const transRepository: TransactionRepository
          = new TransactionRepository();

        const dbResponse = await transRepository.getTransactions(params);

        const trasn: any[] = [];

        dbResponse.forEach((doc: any) => trasn.push(doc.data()));

        res = HttpService.buildResponse(200, HttpService.buildBodyResponse(trasn, trasn.length));
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

export const getTags = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  corsHandler(request, response, async () => {
    let res: Response;

    try {

      const transRepository: TransactionRepository
        = new TransactionRepository();

      const tags: string[] = await transRepository.getTags();

      res = HttpService.buildResponse(200,
        HttpService.buildBodyResponse(tags, tags.length));

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

export const getTotalAmmount = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  corsHandler(request, response, async () => {
    let res: Response;

    try {

      const params = request.query;

      const transRepository: TransactionRepository
        = new TransactionRepository();

      const amount: number = await transRepository.getTotalAmmount(params);

      res = HttpService.buildResponse(200,
        HttpService.buildBodyResponse({ amount: amount }, 1));

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
  });

});
