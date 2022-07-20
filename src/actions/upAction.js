
import { createConnOptions } from '../BaseConfig.js';

/**
 * Up action
 *
 */
export const upAction = async (step, options) => {

    console.log(step);
    console.log(options);

        const baseDir = cwd();
        const path = join(baseDir, '.migration');

        console.log(`Path ${path}...`);

        /* Step 1. Restore database connection options */
        const connOptions = createConnOptions();

        /* Create service context */
        await createSchemaService(connOptions, async (service) => {

            const migrations = await readdir(path);
            for (const migr of migrations) {
                console.log(`Process migrations ${migr}...`);
                const migration = join(path, migr);
                const v = await import(migration);
                console.log(v);
                const { default: m } = v;
                const {migrateUp, migrateDown} = m;
                console.log(migrateUp);
                await migrateUp(service, conn);
                /* Step . Save apply migation at system table */
                await service.registerMigration()
            }

        });

};
