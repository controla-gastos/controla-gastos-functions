// import { getRequestMock, getResponseMock } from "../../commons/utils/mocks";

// import { addTransaction } from '../handler';

// describe('TDD of transcations management', () => {

//     let request;
//     let response;

//     beforeAll(async () => {
//         request = getRequestMock();
//         response = getResponseMock();
//     });

//     it('Test: transcations must be added', async () => {

//         const body = {
//             "description": "teste",
//             "tags": ["tag 1"],
//             "value": 99.00,
//             "emitter": "mota",
//             "date": "2020-01-01"
//         };

//         request.body = body;

//         const res = await addTransaction(request, response);
        
//         console.log(res)
//     });

// });