
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';

export const statusAction = async (step, options) => {

    /* Step 1. Restore migrations */
    const migrations = [];
    const applyMigrations = [];

    /* Step 2. Restore database connection options */
    const connOptions = createConnOptions();
    await createSchemaService(connOptions, async (service) => {

        /* Step 1. Restore apply migrations */
        try {
            const withMigrations = await service.restoreApplyMigrations();
            for (const withMigration of withMigrations) {
                applyMigrations.push(withMigration);
            }
        } catch (err) {
            console.error(`Error: database no UMS migrations setup (${err.message}). Use 'usm up' to initialize.`);
        }

    });

    /* Step 3. Show difference between exists and apply migrations */
    // TODO - implement it later ...

};
