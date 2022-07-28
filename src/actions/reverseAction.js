
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';
import { SchemaWriter } from '../SchemaWriter.js';

/**
 * Reverse enginering ERD schema and save as migrations
 *
 */
export const reverseAction = async () => {

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();

    /* Create service context */
    await createSchemaService(connOptions, async (service) => {

        /* Step 1. Determine database tables */
        const tables = await service.showTables();

        /* Step 2. Processing every database and receive schemas */
        for (const table of tables) {

            console.log(`--> Retreive schema for "${table}".`);

            /* Step 1. Receive table schema */
            const schema = await service.describeTable(table);

            /* Step 2. Write on disk */
            const schemaWriter = new SchemaWriter(`draft_${table}.js`);
            await schemaWriter.write(table, schema);

        }
    });

};
