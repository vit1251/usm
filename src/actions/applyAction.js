
import chalk from 'chalk';
import { stdout } from 'process';

import { cwd } from 'process';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';
import { MigrationService } from '../MigrationService.js';

const applyMigration = async (migration) => {
    const connOptions = createConnOptions();
    await createSchemaService(connOptions, async (service) => {

        /* Step 1. Apply migration */
        const {migrateUp} = migration;
        console.log(migrateUp);
        await migrateUp(service, service.conn);

        /* Step 2. Register applyed migation */
        await service.registerMigration(migration);

    });
};

const renderError = (msg) => {
    const row = chalk.red(msg);
    stdout.write(`${row}\n`);
}

/**
 * Apply migration action
 *
 * @param {String} id
 */
export const applyAction = async (id) => {

    /* Step 1. Restore migrations */
    const migrationService = new MigrationService();
    const migrations = await migrationService.searchMigrations();

    /* Step 2. Search migration */
    const migration = migrations.find((m) => `${m.id}`.startsWith(id));

    /* Step 3. Apply migration on schema */
    if (migration) {
        await applyMigration(migration);
    } else {
        renderError(`No migration exists.`);
    }

};
