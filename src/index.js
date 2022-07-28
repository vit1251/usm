
import { readdir, mkdir, writeFile } from 'fs/promises';

import { Command } from 'commander';
import { SchemaWriter } from './SchemaWriter.js';
import { ConfigTemplate } from './ConfigTemplate.js';
import { MigrationSchemaInstaller } from './MigrationSchemaInstaller.js';
import { createConnOptions } from './BaseConfig.js';
import {
    initAction,
    statusAction,
    indexAction,
    installAction,
    createAction,
    reverseAction,
    applyAction,
    restoreAction,
    checkAction,
} from './actions/index.js';

export const main = () => {

    const program = new Command();

    program
      .name('usm')
      .description('CLI to universal schema migration utilities')
      .version('1.0.0');

    program.command('init')
      .description('Create an empty USM repository or reinitialize an existing one')
      .action(initAction);

    program.command('install')
      .description('Install a USM schema into a new database') // TODO - ... or reinitialize an existing one')
      .action(installAction);

    program.command('create')
      .description('Create new migration')
      .action(createAction);

    program.command('reverse')
      .description('Reverse engineering MySQL schema')
      .action(reverseAction);

    program.command('apply')
      .description('Apply migration')
      .argument('[id]', 'migration id')
      .action(applyAction);

    program.command('restore')
      .description('Restore (revoke) schema upgrade migration script')
      .argument('[id]', 'migration id')
      .action(restoreAction);

    program.command('check')
      .description('Check MySQL server version and parameters')
      .action(checkAction);

    program.command('status')
      .description('Check migration status')
      .action(statusAction);

    program.command('index')
      .description('Show migration index')
      .action(indexAction);

    program.parse();

};
