
import { createConnOptions } from '../BaseConfig.js';
import { createSchemaService } from '../SchemaService.js';

const queries = [
    {
        query: 'SELECT VERSION() AS "version"',
        name: "Server version",
        column: 'version',
    },
    {
        query: 'SELECT ICU_VERSION() AS "unicode_version"',
        name: "Unicode version",
        column: 'unicode_version',
    },
    {
        query: 'SELECT CONNECTION_ID() AS "connection_id"',
        name: "Connection ID",
        column: 'connection_id',
    },
    {
        query: 'SELECT CURRENT_USER() AS "user"',
        name: 'Current user',
        column: 'user',
    },
    {
        query: 'SELECT DATABASE() as "database"',
        name: "Database",
        column: 'database',
    },
    {
        query: 'SELECT @@GLOBAL.time_zone AS "global_timezone"',
        name: "Timezone (global)",
        column: 'global_timezone',
    },
    {
        query: 'SELECT @@SESSION.time_zone AS "session_timezone"',
        name: "Timezone (session)",
        column: 'session_timezone',
    },
    {
        query: 'SELECT @@lc_time_names AS "localization"',
        name: "Localization",
        column: 'localization',
    },

];

export const checkAction = async () => {

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();

    const parameters = {};

    await createSchemaService(connOptions, async (service) => {

        /* Step 1. Request method */
        for (const { query, name, column } of queries) {
            try {
                const [results, fields] = await service.query(query);
                for (const result of results) {
                    const {[column]: value = 'N/A'} = result;
                    parameters[name] = value;
                }
            } catch (err) {
                const msg = err.sqlMessage ?? err.message;
                parameters[name] = `${msg}`;
            }
        }

        /* Step 2. Variable method */
        const query = 'SHOW VARIABLES';
        try {
            const [results, fields] = await service.query(query);
            for (const result of results) {
//                console.log(result);
            }
        } catch (err) {
        }

    });

    console.table(parameters);

};
