
export class Migration {

    constructor({ author, date, id, migrateUp, migrateDown,  summary = 'No summary', applyed = false }) {
        this.author = author;
        this.date = date;
        this.id = id;
        this.migrateUp = migrateUp;
        this.migrateDown = migrateDown;
        this.summary = summary;
        this.applyed = applyed;
    }

}
