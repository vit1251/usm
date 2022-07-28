
import { MigrationService } from '../MigrationService.js';

/**
 * Index USM repository
 *
 */
export const indexAction = async () => {

    const migrationService = new MigrationService();
    const migrations = await migrationService.searchMigrations();

    for (const m of migrations) {
        console.log(m);
    }

};

