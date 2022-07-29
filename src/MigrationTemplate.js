
import { randomUUID } from 'crypto';

export class MigrationTemplate {

    /**
     * Create migration empty template
     *
     * @param {Migration} migration
     */
    constructor(migration) {
        const { id, created_on, author = 'Anonymous <void@example.com>', summary = 'No summary' } = migration;
        this.author = author;
        this.created_on = created_on ? created_on : new Date();
        this.id = id;
        this.summary = summary;
    }


    render() {
        const items = [];

        items.push(``);

        items.push(`export default {`);

        items.push(``);

        items.push(`    author: '${this.author}',`);
        items.push(`    date: '${this.created_on.toISOString()}',`);
        items.push(`    id: '${this.id}',`);
        items.push(`    summary: '${this.summary}',`);

        items.push(``);

        items.push(`    migrateUp: async (service, conn) => {`);
        items.push(`        throw new Error('Up migration is not implemented.');`);
        items.push(`    },`);

        items.push(``);

        items.push(`    migrateDown: async (service, conn) => {`);
        items.push(`        throw new Error('Down migration is not implemented.');`);
        items.push(`    },`);

        items.push(``);

        items.push(`}`);

        items.push(``);

        return items.join("\n");
    }

}

