
import { SchemaColumn } from './SchemaColumn.js';

export class SchemaBuilder {

    constructor(name) {
        this.name = name;
        this.columns = [];
    }

    /**
     * Create column
     *
     * @param {String} column
     * @param {Object} options
     */
    createColumn(column, options) {
        const c = new SchemaColumn(column, options);
        console.log(`column => `, c);
        this.columns.push(c);
    }

    createIndex() {
    }

    createUniqIndex() {
    }

    setParam() {
    }

    build() {
        const rows = [];
        rows.push(`CREATE TABLE ${this.name} (`);
        const parts = [];
        for (const column of this.columns) {
            const col = column.build();
            parts.push(`    ${col}`);
        }
        rows.push(parts.join(",\n"));
        rows.push(');');
        return rows.join("\n")
    }

};
