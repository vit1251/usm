

const search = async () => {
    const migration = './migration/20220624.js';
    const v = await import(migration);
    console.log(v);
    const { default: m } = v;
    const {migrateUp, migrateDown} = m;
    console.log(migrateUp);
    await migrateUp('as');
};

search();
