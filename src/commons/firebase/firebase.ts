import * as admin from 'firebase-admin';

import * as configJson from "./config.json";

export class Firebase {

    private admin: any;

    private get config() {
        return {
            projectId: configJson.project_id,
            clientEmail: configJson.client_email,
            privateKey: configJson.private_key
        };
    }

    get db() {
        return this.admin.firestore();
    }

    constructor() {
        this.admin = admin.apps.length === 0 ?
            admin.initializeApp(this.config) : admin;
    }

}
