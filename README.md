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

## Migration routines

You may migrate you database with next commands:

    $ usm up 1

or without steps count:

    $ usm up

This procdure update you MySQL instance up to latest migrations.

## Contribution and contacts

Please use GitHub contribution mechanism like disscussions or isses with you feedback at https://github.com/vit1251/usm.

Thanks.