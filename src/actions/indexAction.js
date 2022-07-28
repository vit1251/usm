
import chalk from 'chalk';
import { stdout } from 'process';

import { MigrationService } from '../MigrationService.js';

/**
 * Render migration
 *
 */
const renderMigration = (m) => {
    const { id, author, date, summary } = m;
    /* Migration row */
    const row1 = chalk.yellow(`migration ${id}`);
    stdout.write(`${row1}\n`);
    /* Author */
    const row2 = `Author: ${author}`;
    stdout.write(`${row2}\n`);
    /* Date */
    const row3 = `Date: ${date}`;
    stdout.write(`${row3}\n`);
    /* Summary */
    const row4 = `${summary}`;
    stdout.write(`\n`);
    stdout.write(`    ${row4}\n`);
    stdout.write(`\n`);
};

/**
 * Index USM repository
 *
 */
export const indexAction = async () => {

    const migrationService = new MigrationService();
    const migrations = await migrationService.searchMigrations();

    for (const m of migrations) {
        renderMigration(m);
    }

};

