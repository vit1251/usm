
/**
 * Create a new repository migration entity
 *
 */
export const createAction = async () => {
    /* Step 1. Generate UUID with migration */
    const migrationId = randomUUID();
    const stamp = new Date();
    const createAt = makeDate(stamp);

    /* Step 2. Write empty migration */
    const migrationTemplate = new MigrationTemplate({
        migrationId,
        createAt: stamp,
    });
    const content = migrationTemplate.render();
    const baseDir = cwd();
    const migrationName = `${createAt}.js`;
    const migrationPath = join(baseDir, 'migration', migrationName);
    await writeFile(migrationPath, content);

    /* Step 3. Show create information */
    console.info(`Create USM migration ${createAt} is complete.`);

};
