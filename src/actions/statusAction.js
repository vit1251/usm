
import chalk from 'chalk';
import { stdout } from 'process';

import { MigrationService } from '../MigrationService.js';
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';

/**
 * Render migration with apply marker
 *
 * @param {Migration} m
 */
const renderMigration = (m) => {
    const { id, summary, applyed = false } = m;
    if (applyed) {
        const row = chalk.green(`applyed: ${id} - ${summary}`)
        stdout.write(`        ${row}\n`);
    } else {
        const row = chalk.red(`ready: ${id} - ${summary}`);
        stdout.write(`        ${row}\n`);
    }
};

const renderMigrations = (migrations) => {
    stdout.write(`Changes not staged for database:\n`);
    stdout.write(`  (use "usm apply <id>..." to apply what will be applyed)\n`);
    stdout.write(`  (use "usm restore <id>..." to discard changes in database scheme)\n`);

    for (const m of migrations) {
        renderMigration(m);
    }

};

export const statusAction = async (step, options) => {

    /* Step 1. Restore migrations */
    const migrationService = new MigrationService();
    const migrations = await migrationService.searchMigrations();

    /* Step 2. Restore database connection options */
    const connOptions = createConnOptions();
    await createSchemaService(connOptions, async (service) => {

        /* Step 1. Restore apply migrations */
        const applyMigrations = await service.restoreApplyMigrations();
        for (const applyMigration of applyMigrations) {
            console.log(applyMigration);
        }

    });

    /* Step 3. Show migrations */
    renderMigrations(migrations);

};
