
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
        const baseDir = cwd();
        const defaultPath = join(baseDir, '.migration');
        const {
            path = defaultPath,
        } = options;
        const migrations = await readdir(path);
        for (const migr of migrations) {
            /* Step 1. Debug message */
            console.log(`Process migrations ${migr}...`);
            /* Step 2. Make migration absolute path */
            const migration = join(path, migr);
            /* Step 3. Import migration meta attrinutes */
            const v = await import(migration);
            console.log(v);
            const { default: module } = v;
            const { author, date, id, migrateUp, migrateDown } = module;
            /* Step 4. Populate migration */
            const m = new Migration({ author, date, id, migrateUp, migrateDown });
            m.module = module;
            /* Step 5. Store results */
            result.push(m);
        }
        return result;
    }

}
