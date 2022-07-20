
import { cwd } from 'process';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { readdir, mkdir, writeFile } from 'fs/promises';

import { Command } from 'commander';
import { SchemaWriter } from './SchemaWriter.js';
import { ConfigTemplate } from './ConfigTemplate.js';
import { MigrationTemplate } from './MigrationTemplate.js';
import { MigrationSchemaInstaller } from './MigrationSchemaInstaller.js';
import { makeDate } from './DateUtil.js';
import { createConnOptions } from './BaseConfig.js';
import {
    initAction,
    statusAction,
    installAction,
    createAction,
    reverseAction,
    upAction,
    downAction,
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

    program.command('up')
      .description('Migration up')
      .argument('[step]', 'how many steps migration should do')
      .option('-v, --verbose', 'show additional debug messages and performance benchmarks')
      .action(upAction);

    program.command('down')
      .description('Migration down')
      .action(downAction);

    program.command('check')
      .description('Check MySQL server version and parameters')
      .action(checkAction);

    program.command('status')
      .description('Check migration status')
      .action(statusAction);

    program.parse();

};
