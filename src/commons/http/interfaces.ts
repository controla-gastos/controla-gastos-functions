export interface BodyResponse {
    data: any;
    total: number;
};

export interface BodyErrorResponse {
    error: {
        message: string;
        date: string;
        id: string;
    }
};

export interface Response {
    statusCode: number;
    headers: { [key: string]: string },
    body: BodyResponse | BodyErrorResponse
};
