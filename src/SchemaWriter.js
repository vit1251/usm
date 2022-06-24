
import { writeFile } from 'fs/promises';

export class SchemaWriter {

    constructor(path) {
        this.path = path;
    }

    /**
     * Save schema on disk
     * @param {Array<SchemaColumn>} schema
     */
    async write(tableName, schemaColumns) {

        const parts = [];

        parts.push(`/* Step ?. Create '${tableName}' table */`);
        parts.push(`await service.createTable('${tableName}', async (schemaBuilder) => {`);
        for (const schemaColumn of schemaColumns) {
            parts.push(`    schemaBuilder.createColumn('${schemaColumn.name}', {`);
            if (schemaColumn.auto_increment === true) {
                parts.push(`        auto_increment: true,`);
            }
            parts.push(`        type: '${schemaColumn.type}',`);
            if (schemaColumn.nullable === true) {
                parts.push(`        nullable: true,`);
            }
            parts.push(`    });`);
        }
        parts.push(`});`);

        const content = parts.join("\n");

        await writeFile(this.path, content);
    }

}
