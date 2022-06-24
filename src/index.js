
import process from 'process';
import { join } from 'path';
import { readdir } from 'fs/promises';
import { Command } from 'commander';
import { createConnection } from 'mysql';
import { SchemaService } from './SchemaService.js';

const program = new Command();

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

    //
    const conn = null;

    /* Create service */ 
    const service = new SchemaService(conn);

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

program.command('down')
  .description('Migration down')
  .action(async (step, options) => {
    console.log(step);
    console.log(options);
  });

program.command('check')
  .description('Check MySQL connection')
  .action(async (step, options) => {

    const connection = createConnection({
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'my_db'
    });

    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end();


  });


program.parse();
