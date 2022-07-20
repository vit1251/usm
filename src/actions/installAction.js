
/**
 * Install migration schema 
 *
 */
export const installAction = async () => {
    const migrationSchemaInstaller = new MigrationSchemaInstaller();
    migrationSchemaInstaller.install();
};

