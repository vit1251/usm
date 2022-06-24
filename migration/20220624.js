
export default {

    author: 'Vitold Sedyshev <vit1251@gmail.com>',
    date: '2022-06-24 21:08:10 +03:00',
    id: '31f766fc-b523-4d26-a5b2-4aaa815d5eff',

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

};
