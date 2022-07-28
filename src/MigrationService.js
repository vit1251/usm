
import { randomUUID } from 'crypto';
import { cwd } from 'process';
import { join } from 'path';
import { readdir, writeFile } from 'fs/promises';

import { MigrationTemplate } from './MigrationTemplate.js';
import { Migration } from './Migration.js';

export class MigrationService {

    /**
     * Create empty migration
     *
     * @param {Object} options
     */
    async createEmptyMigration(options = {}) {
        const baseDir = cwd();
        const defaultPath = join(baseDir, '.migration');
        const {
            path = join(defaultPath, "1.js"),
            migrationId = randomUUID(),
            stamp,
        } = options;

        /* Step 1. Write empty migration */
        const migrationTemplate = new MigrationTemplate({
            migrationId,
            createAt: stamp,
        });
        const content = migrationTemplate.render();
        await writeFile(path, content);

    }

    /**
     * Search migrations
     *
     * @param {Object} options
     */
    async searchMigrations(options = {}) {
        const result = [];
        /* Step 1. Search migration path */
        const baseDir = cwd();
        const defaultPath = join(baseDir, '.migration');
        const {
            path = defaultPath,
        } = options;
        /* Step 2. Restore migrations */
        const migrations = await readdir(path);
        for (const migr of migrations) {
            /* Step 1. Make migration absolute path */
            const migration = join(path, migr);
            /* Step 2. Import migration meta attrinutes */
            const v = await import(migration);
            const { default: module } = v;
            const { author, date, id, migrateUp, migrateDown, summary } = module;
            /* Step 3. Populate migration */
            const m = new Migration({ author, date, id, migrateUp, migrateDown, summary });
            /* Step 4. Store results */
            result.push(m);
        }
        /* Step 3. Sort migrations */
        result.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
            }
            if (a.date < b.date) {
                return -1;
            }
            throw new Error(`Migration is collision detected between ${a.id} and ${b.id}.`);
        });
        return result;
    }

}
