
import chalk from 'chalk';
import { stdout } from 'process';

import { cwd } from 'process';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';
import { MigrationService } from '../MigrationService.js';

const renderMigration = (migration) => {
    const { id, summary } = migration;
    const row = chalk.yellow(`Reverse ${id}...`);
    stdout.write(`${row}\n`);
};

/**
 * Reverse migration
 *
 * @param {Migration} migration
 */
const reverseMigration = async (migration) => {
    const connOptions = createConnOptions();
    await createSchemaService(connOptions, async (service) => {

        /* Step 1. Report migration activity */
        renderMigration(migration);

        /* Step 2. Apply migration */
        try {
            /* Step 1. Apply migration */
            const {migrateDown} = migration;
            //console.log(migrateUp);
            await migrateDown(service, service.conn);
            /* Step 2. Register applyed migation */
            await service.unregisterMigration(migration);
        } catch (err) {
            renderError(`${err}`);
        }

    });
};

const renderError = (msg) => {
    const row = chalk.red(msg);
    stdout.write(`${row}\n`);
}

/**
 * Restore schema
 *
 * @param {String} id
 */
export const restoreAction = async (id) => {

    /* Step 1. Restore migrations */
    const migrationService = new MigrationService();
    const migrations = await migrationService.searchMigrations();

    /* Step 2. Search migration */
    const migration = migrations.find((m) => `${m.id}`.startsWith(id));

    /* Step 3. Apply migration on schema */
    if (migration) {
        await reverseMigration(migration);
    } else {
        renderError(`No migration exists.`);
    }

};
