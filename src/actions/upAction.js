
import { cwd } from 'process';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';
import { MigrationService } from '../MigrationService.js';

/**
 * Up action
 *
 */
export const upAction = async (step, options) => {

    console.log(step);
    console.log(options);

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();
    const migrationService = new MigrationService();
    const migrations = await migrationService.searchMigrations();

    /* Create service context */
    await createSchemaService(connOptions, async (service) => {
        for (const m of migrations) {
            /* Step 1. Check migration is applyed */
            // TODO - check migration is apply ...

            /* Step 2. Apply migration */
            const {migrateUp} = m;
            console.log(migrateUp);
            await migrateUp(service, conn);

            /* Step 3. Save apply migation */
            await service.registerMigration(m);

        }
    });

};
