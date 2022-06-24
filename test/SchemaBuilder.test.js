
import assert from 'assert';

import {SchemaBuilder} from '../src/SchemaBuilder.js';


describe('SchemaBuilder', () => {

    it('should create user scheme without error', async () => {
        const schemaBuilder = new SchemaBuilder();
        schemaBuilder.createColumn('id', {});
        const got = schemaBuilder.build();
        const want = 'CREATE TABLE ';
        assert.equal(got, want);
    });

});
