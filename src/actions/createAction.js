
import { makeDate } from '../DateUtil.js';
import { cwd } from 'process';
import { join } from 'path';
import { MigrationService } from '../MigrationService.js';

/**
 * Create a new repository migration entity
 *
 */
export const createAction = async () => {

    /* Step 1. Create migration stamp */
    const stamp = new Date();
    const createAt = makeDate(stamp);

    /* Step 2. Prepare migration name */
    const baseDir = cwd();
    const migrationName = `${createAt}.js`;
    const migrationPath = join(baseDir, '.migration', migrationName);

    /* Step 3. Create empty migration */
    const migrationService = new MigrationService();
    const m = await migrationService.createEmptyMigration({
        path: migrationPath,
        stamp,
    });

    /* Step 4. Show user report */
    console.info(`Create USM migration ${createAt} is complete.`);

};
