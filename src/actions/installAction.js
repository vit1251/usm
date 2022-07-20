
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';

/**
 * Install migration schema 
 *
 */
export const installAction = async () => {

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();

    await createSchemaService(connOptions, async (service) => {

        const migrationTable = 'migration';
        const query = `CREATE TABLE IF NOT EXISTS ${migrationTable} (` +
            `  migration_id CHAR(128),` +
            `  apply_at TIMESTAMP` +
            `);`;
        const [results, fields] = await service.query(query);

    });

};

