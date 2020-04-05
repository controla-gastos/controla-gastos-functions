import { Transaction } from '../models/transaction';
import { Firebase } from '../../commons/firebase/firebase';

export class TransactionRepository {

    private firebase: Firebase;

    private get collection() {
        return this.firebase
            .db.collection('transactions');
    }

    constructor() {
        this.firebase = new Firebase();
    }

    async addTransaction(transaction: Transaction) {
        return await this.firebase.db
            .collection('transactions').doc(transaction.id)
            .set(JSON.parse(JSON.stringify(transaction)))
    }

    async getTransactions(params: { [key: string]: any }) {

        let query: any = null;

        if (Object.keys(params).length > 0) {
            query = this.composeWhere(params);
            if (params.limit) {
                query = query.limit(parseInt(params.limit))
            }
        } else {
            query = this.collection;
        }

        return query.get();
    }

    private composeWhere(params: { [key: string]: any }) {

        let query = this.collection;

        if (params.tags) {
            query = query
                .where('tags', 'array-contains-any', params.tags.split(','));
        }

        if (params.description) {
            query = query
                .where('description', '==', params.description);
        }

        if (params.month) {
            query = query
                .where('month', '==', parseInt(params.month));
        }

        if (params.year) {
            query = query
                .where('year', '==', parseInt(params.year));
        }

        return query;
    }

    async getTags() {

        const tags: string[] = [];

        const query = await this.collection.get();

        query.forEach((doc: any) => {
            doc.data()
                .tags
                .forEach((t: string) => {
                    const index: number =
                        tags.findIndex(tag => tag == t);
                    if (index < 0) {
                        tags.push(t);
                    }
                })
        });

        return tags;
    }

    async getTotalAmmount(params: { [key: string]: any }) {

        let ammount: number = 0;

        const query = await this.composeWhere(params).get();

        query.forEach((doc: any) => {
            ammount = ammount + doc.data().value;
        });

        return ammount;
    }

}
