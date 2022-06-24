
import { Command } from 'commander';
import { createConnection } from 'mysql';

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
  .argument('<step>', 'how many steps migration should do')
  .option('-v, --verbose', 'show additional debug messages and performance benchmarks')
  .action(async (step, options) => {
    console.log(step);
    console.log(options);
    
    const migration = './migration/20220624.js';
    const v = await import(migration);
    console.log(v);
    const { default: m } = v;
    const {migrateUp, migrateDown} = m;
    console.log(migrateUp);
    await migrateUp('as');
    
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
