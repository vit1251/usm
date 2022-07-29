
import { createConnection } from 'mysql';

import { SchemaBuilder } from './SchemaBuilder.js';
import { SchemaColumn } from './SchemaColumn.js';
import { Migration } from './Migration.js';

export class SchemaService {

    constructor(conn, verbose = false) {
        this.conn = conn;
        this.verbose = verbose;
    }

    /**
     * Database SQL query
     *
     * @param {String} query
     * @param {Array} params
     * @return {Promise<Array<Array>>}
     */
    query(query, params = []) {
        return new Promise((resolve, reject) => {
            this.conn.query(query, params, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
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

    /**
     * Restore apply migrations
     *
     */
    async restoreApplyMigrations() {
        const result = [];
        const sql = 'SELECT migration_id, apply_at FROM migration ORDER BY apply_at ASC';
        const [results, fields] = await this.query(sql);
        for (const row of results) {
            const { migration_id, apply_at } = row;
            const m = new Migration({
                id: migration_id,
                applyed: true,
            });
            result.push(m);
        }
        return result;
    }

    async createTable(name, callback) {
        const schemaBuilder = new SchemaBuilder(name);
        const schema = await callback(schemaBuilder);
        console.log(schema);
    }

    /**
     * Drop table
     *
     * @param {String} name
     * @param {String} options
     */
    async dropTable(name, options = {}) {
        const { ifExists = true } = options;
        if (ifExists) {
            const query = 'DROP TABLE IF EXISTS ??';
            const [results, fields] = await this.query(query, [name]);
        } else {
            const query = 'DROP TABLE ??';
            const [results, fields] = await this.query(query, [name]);
        }
    }

    /**
     * Initialize migration registry
     */
    async initializeMigrationRegistry() {
    }

    /**
     * Register apply migration
     *
     * @param {Migration} m
     */
    async registerMigration(m) {
        const { id } = m;
        const stamp = new Date();
        const query = 'INSERT INTO migration (migration_id, apply_at) VALUES (?, ?)';
        const [results, fields] = await this.query(query, [id, stamp]);
    }

    /**
     * Unregister migration
     *
     * @param {Migration} m
     */
    async unregisterMigration(m) {
        const { id } = m;
        const stamp = new Date();
        const query = 'DELETE FROM migration WHERE migration_id = ?';
        const [results, fields] = await this.query(query, [id]);
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

    /* Step 1. Start session */
    console.log('---> Open connection...');
    conn.connect();

    /* Step 2. Processing */
    const service = new SchemaService(conn);
    await callback(service);

    /* Step 3. Close connection */
    console.log('---> Close connection...');
    conn.end();

};
