# usm

Universal Schema Migration is DB migration utility to provide way to JavaScript developer keep DB schema is updated

## Usage workflow

1. Create settings
2. Create migration and commit it
3. Exchange migraions with version control system
4. Keep you database updated!

## Settings options

You may setup you `usm` migration project with additonal options by reading MySQL
driver documentation at https://github.com/mysqljs/mysql#connection-options

## Initialize migration project

You may initialize `usm` project with using command line utility with interactive mode:

    $ usm init

USM create directory `migration` and append new parameters `USM_HOST`, `USM_USERNAME`, `USM_PASSWORD`, `USM_DATABSE`
to you `.env`.

Since operation complete you may edit your `.env` with actual parameters and start use USM.

## Migration routines

You may migrate you database with next commands:

    $ usm up 1

or without steps count:

    $ usm up

This procdure update you MySQL instance up to latest migrations.

## Reverse engineering exist MySQL database

Since you already have MySQL database you may want to reverce enginering your exists database. You may
get this operation by next command:

    $ usm reverse

USM search database and iterate all tables and try to restory schema in current directory with `draft_{table}.js` file
you may move your code in associated migration scenario or create by `usm create` itself.

## Contribution and contacts

Please use GitHub contribution mechanism like disscussions or isses with you feedback at https://github.com/vit1251/usm.

Thanks.