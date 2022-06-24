
import { SchemaBuilder } from './SchemaBuilder.js';

export class SchemaService {

    constructor(conn, verbose = false) {
        this.conn = conn;
        this.verbose = verbose;
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
