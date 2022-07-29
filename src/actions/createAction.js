
import { makeDate } from '../DateUtil.js';
import { cwd } from 'process';
import { join, basename } from 'path';
import { MigrationService } from '../MigrationService.js';

/**
 * Create a new repository migration entity
 *
 */
export const createAction = async () => {

    /* Step 1. Create migration stamp */
    const created_on = new Date();
    const stamp = makeDate(created_on);

    /* Step 2. Prepare migration name */
    const baseDir = cwd();
    const migrationName = `${stamp}.mjs`;
    const migrationPath = join(baseDir, '.migration', migrationName);

    /* Step 3. Create empty migration */
    const migrationService = new MigrationService();
    const m = await migrationService.createEmptyMigration({
        path: migrationPath,
        created_on,
    });

    /* Step 4. Show user report */
    const filename = basename(m.path);
    console.info(`Create USM migration ${filename} is complete.`);

};
