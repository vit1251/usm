
import process from 'process';
import { join } from 'path';
import { readdir } from 'fs/promises';
import { config } from 'dotenv';
import { Command } from 'commander';
import { createSchemaService } from './SchemaService.js';
import { SchemaWriter } from './SchemaWriter.js';

const program = new Command();

const settings = config();
//console.log(settings);

const createConnOptions = () => {
    const options = {
        host: process.env.USM_HOST,
        username: process.env.USM_USERNAME,
        password: process.env.USM_PASSWORD,
        database: process.env.USM_DATABASE,
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
    console.log(step);
    console.log(options);
  });

program.command('create')
  .description('Create new migration')
  .action(async () => {
    console.log(step);
    console.log(options);
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

    const baseDir = process.cwd();
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
