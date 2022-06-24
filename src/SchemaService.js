
import { createConnection } from 'mysql';

import { SchemaBuilder } from './SchemaBuilder.js';

export class SchemaService {

    constructor(conn, verbose = false) {
        this.conn = conn;
        this.verbose = verbose;
    }

    async check() {
        this.conn.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        });
    }

    async createTable(name, callback) {
        const schemaBuilder = new SchemaBuilder(name);
        const schema = await callback(schemaBuilder);
        console.log(schema);
    }

    async dropTable() {
    }

    async backupTable() {
    }

    async restoreTable() {
    }

    async registerMigration() {
    }

}

export const createSchemaService = async (options, callback) => {

    const conn = createConnection({
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'my_db'
    });

    conn.connect();

    const service = new SchemaService(conn);
    await callback(service);

    conn.end();

};
