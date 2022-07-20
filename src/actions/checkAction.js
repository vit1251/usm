
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';

const queries = [
    {
        query: 'SELECT VERSION() AS "version"',
        name: "Server version",
    },
    {
        query: 'SELECT ICU_VERSION() AS "unicode_version"',
        name: "Unicode version",
    },
    {
        query: 'SELECT CONNECTION_ID() AS "connection_id"',
        name: "Connection ID",
    },
    {
        query: 'SELECT CURRENT_USER() AS "user"',
        name: 'Current user',
    },
    {
        query: 'SELECT DATABASE() as "database"',
        name: "Database",
    },
    {
        query: 'SELECT @@GLOBAL.time_zone AS "global_timezone"',
        name: "Timezone (global)",
    },
    {
        query: 'SELECT @@SESSION.time_zone AS "session_timezone"',
        name: "Timezone (session)",
    },
    {
        query: 'SELECT @@lc_time_names AS "localization"',
        name: "Localization",
    }
];

export const checkAction = async () => {

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();

    const parameters = {};

    await createSchemaService(connOptions, async (service) => {

        for (const { query, name } of queries) {
            try {
                const [results, fields] = await service.query(query);
                parameters[name] = results;
            } catch (err) {
                parameters[name] = `${err.sqlMessage}`;
            }
        }

    });

    console.table(parameters);

};
