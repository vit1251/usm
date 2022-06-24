
import { createConnection } from 'mysql';

import { SchemaBuilder } from './SchemaBuilder.js';
import { SchemaColumn } from './SchemaColumn.js';

export class SchemaService {

    constructor(conn, verbose = false) {
        this.conn = conn;
        this.verbose = verbose;
    }

    /**
     * Database query
     *
     * @return {Promise<
     */
    query(query) {
        return new Promise((resolve, reject) => {
            this.conn.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`result => `, results);
                    console.log(`fields => `, fields);
                    resolve([results, fields]);
                }
            });
        });
    }

    /**
     * Show tables
     *
     * @return {Promise<Array<String>>}
     */
    async showTables() {
        const sql = 'SHOW TABLES';
        const [rows, fields] = await this.query(sql);
        /* Create columns */
        const columns = [];
        for (const field of fields) {
            const { name } = field;
            columns.push(name);
        }
        console.log(columns);

        /* Extract columns */
        const result = [];
        for (const row of rows) {
        console.log('row => ', row);
            for (const column of columns) {
                    console.log('column => ', column);
                const { [column]: value } = row;
                console.log(`value =>`, value);
                result.push(value);
            }
        }
        return result;
    }

    /**
     * Describe schema
     *
     * @param {String} tableName
     */
    async describeTable(tableName) {
        const sql = `DESCRIBE ${tableName}`;
        const [rows, fields] = await this.query(sql);
        /* Create Schema */
        const result = [];
        for (const row of rows) {
            const { Field, Type, Null, Key, Default, Extra } = row;
            result.push(new SchemaColumn(Field, {
                type: Type,
                nullable: Null === 'YES',
            }));
        }
        return result;
    }

    async check() {
        const sql = 'SELECT 1 + 1 AS solution';
        const [results, fields] = await this.query(sql);
        //console.log('The solution is: ', results[0].solution);
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
        host: 'localhost',
        user: 'mysql',
        password: '',
        database: 'test',
        ...options,
    });

    conn.connect();

    const service = new SchemaService(conn);
    await callback(service);

    conn.end();

};
