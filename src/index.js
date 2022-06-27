
import { cwd, env } from 'process';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { readdir, mkdir, writeFile } from 'fs/promises';
import { config } from 'dotenv';
import { Command } from 'commander';
import { createSchemaService } from './SchemaService.js';
import { SchemaWriter } from './SchemaWriter.js';
import { ConfigTemplate } from './ConfigTemplate.js';
import { MigrationTemplate } from './MigrationTemplate.js';

export const main = () => {

const program = new Command();

const settings = config();
//console.log(settings);

const createConnOptions = () => {
    const options = {
        host: env.USM_HOST,
        username: env.USM_USERNAME,
        password: env.USM_PASSWORD,
        database: env.USM_DATABASE,
    };
    return options;
};

program
  .name('usm')
  .description('CLI to universal schema migration utilities')
  .version('1.0.0');

program.command('init')
  .description('Initialize USM project in place')
  .action(async () => {
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

  });

program.command('create')
  .description('Create new migration')
  .action(async () => {
    /* Step 1. Generate UUID with migration */
    const migrationId = randomUUID();

    /* Step 2. Write empty migration */
    const migrationTemplate = new MigrationTemplate({
        migrationId,
    });
    const content = migrationTemplate.render();
    const baseDir = cwd();
    const migrationName = `${migrationId}.js`;
    const migrationPath = join(baseDir, 'migration', migrationName);
    await writeFile(migrationPath, content);

    /* Step 3. Show create information */
    console.info(`Create USM migration ${migrationId} is complete.`);

  });

program.command('reverse')
  .description('Reverse engineering MySQL schema')
  .action(async () => {

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

  });

program.command('up')
  .description('Migration up')
  .argument('[step]', 'how many steps migration should do')
  .option('-v, --verbose', 'show additional debug messages and performance benchmarks')
  .action(async (step, options) => {
    console.log(step);
    console.log(options);

    const baseDir = cwd();
    const path = join(baseDir, 'migration');

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

  });

program.command('down')
  .description('Migration down')
  .action(async (step, options) => {

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();

    await createSchemaService(connOptions, async (service) => {
        service.check();
    });

  });

program.command('check')
  .description('Check MySQL settings')
  .argument('[step]', 'how many steps migration should do')
  .option('-v, --verbose', 'show additional debug messages and performance benchmarks')
  .action(async (step, options) => {

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();

    await createSchemaService(connOptions, async (service) => {
        service.check();
    });

  });

program.command('status')
  .description('Check migration status')
  .action(async (step, options) => {

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();

    await createSchemaService(connOptions, async (service) => {
        service.check();
    });

  });

program.parse();

};
