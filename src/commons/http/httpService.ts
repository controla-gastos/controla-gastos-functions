import { BodyResponse, BodyErrorResponse, Response } from "./interfaces";
import { uuidv4 } from "../utils/uuid";

export class HttpService {

    constructor() {

    }

    static buildBodyResponse(data: any, total: number): BodyResponse {
        return { data: data ? data : null, total: total };
    }

    static buildResponse(status: number, body: BodyResponse | BodyErrorResponse): Response {
        return {
            statusCode: status ? status : 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'content-type': 'application/json'
            },
            body: body
        }
    }

    static buildErrorResponse(status: number, message: string): Response {
        return this.buildResponse(status, {
            error: {
                message: message,
                date: new Date().toUTCString(),
                id: uuidv4()
            }
        });
    }

}
