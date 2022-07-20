
export default {

    author: 'Vitold Sedyshev <vit1251@gmail.com>',
    date: '2022-06-27T21:09:23.666Z',
    id: '60fff39d-15f5-44ad-b708-a9bf1571fbfb',

    migrateUp: async (service, conn) => {

        /* Step 1. Create `user` table */
        await service.createTable(`user`, async (schemaBuilder) => {
            schemaBuilder.createColumn(`id`, {
                auto_increment: true,
                type: 'BIGINT',
                nullable: false,
            });
            schemaBuilder.createColumn(`name`, {
                type: 'VARCHAR(512)',
                nullable: true,
            });
            schemaBuilder.createColumn(`email`, {
                type: 'VARCHAR(512)',
                nullable: false,
            });
            schemaBuilder.createColumn(`create_at`, {
                type: 'DATETIME',
                nullable: false,
            });

            return schemaBuilder.build();
        });

    },

    migrateDown: async (service, conn) => {

        /* Step 0. Backup `user` data */
        await service.saveTableBackup(`user`);

        /* Step 1. Drop `user` table */
        await service.dropTable(`user`);

    },

}
