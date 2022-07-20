
/**
 * Initialize USM repository or reinitialize
 *
 */
export const initAction = async () => {
    /* Step 1. Create directory */
    const baseDir = cwd();
    const migrationDir = join(baseDir, 'migration');
    await mkdir(migrationDir, {
        recursive: true,
    });

    /* Step 2. Create `dotenv` file */
    const configTemplate = new ConfigTemplate();
    const content = configTemplate.render();
    const configPath = join(baseDir, '.env');
    await writeFile(configPath, content);

    /* Step 3. Show init information */
    console.info(`Initialize USM project is complete.`);

};
