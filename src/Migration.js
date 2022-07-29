
export class Migration {

    constructor({ path, author, date, id, migrateUp, migrateDown,  summary = 'No summary', applyed = false, created_on }) {
        this.path = path;
        this.author = author;
        this.date = date;
        this.id = id;
        this.migrateUp = migrateUp;
        this.migrateDown = migrateDown;
        this.summary = summary;
        this.applyed = applyed;
        this.created_on = created_on;
    }

}
