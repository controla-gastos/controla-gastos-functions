import { Income } from '../models/income';
import { Firebase } from '../../commons/firebase/firebase';

export class IncomeRepository {

    private firebase: Firebase;

    private get collection() {
        return this.firebase
            .db.collection('income');
    }

    constructor() {
        this.firebase = new Firebase();
    }

    async updateIncome(income: Income) {
        return await this.collection.doc(income.id)
            .set(JSON.parse(JSON.stringify(income)))
    }

    async getIncome() {
        return this.collection.get();
    }

}
