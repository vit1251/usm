
export class MigrationTemplate {

    /**
     * Create migration empty template
     *
     */
    constructor({ migrationId = '' } = {}) {
        this.author = 'Anonymous <void@example.com>';
        this.createAt = new Date();
        this.migrationId = migrationId;
    }

    render() {
        const items = [];

        items.push(``);

        items.push(`export default {`);

        items.push(``);

        items.push(`    author: '${this.author}',`);
        items.push(`    date: '${this.createAt}',`);
        items.push(`    id: '${this.migrationId}',`);

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

