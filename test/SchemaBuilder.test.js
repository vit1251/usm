
import assert from 'assert';

import {SchemaBuilder} from '../src/SchemaBuilder.js';


describe('SchemaBuilder', () => {

    it('should create user scheme without error', async () => {
        const schemaBuilder = new SchemaBuilder('User');
        schemaBuilder.createColumn('Id', {
            type: 'INT',
            auto_increment: true,
        });
        schemaBuilder.createColumn('Email', {
            type: 'VARCHAR(512)',
            nullable: false,
        });
        const got = schemaBuilder.build();
        const want = 'CREATE TABLE User (\n' +
                     '    Id INT AUTOINCREMENT,\n' +
                     '    Email VARCHAR(512) NOT NULL\n' +
                     ');';
        assert.equal(got, want);
    });

});
