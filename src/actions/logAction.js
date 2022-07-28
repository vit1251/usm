
import chalk from 'chalk';
import { stdout } from 'process';

import { MigrationService } from '../MigrationService.js';
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';

const renderApplyMigrations = (migrations) => {
    for (const migration of migrations) {
        console.log(migration);
    }
};

/**
 * Show apply migration history
 * 
 */
export const logAction = async () => {

    const applyMigrations = [];

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();
    await createSchemaService(connOptions, async (service) => {
        /* Step 1. Restore apply migrations */
        const migrations = await service.restoreApplyMigrations();
        for (const migration of migrations) {
            applyMigrations.push(migration);
        }
    });

    /* Step 2. Render apply migrations */
    renderApplyMigrations(applyMigrations);

};
