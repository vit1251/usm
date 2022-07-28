
export class Migration {

    constructor({ applyed = false, summary = 'No summary', author, date, id, migrateUp, migrateDown }) {
        this.summary = summary;
        this.applyed = applyed;
    }

}
