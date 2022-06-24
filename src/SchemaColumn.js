
export class SchemaColumn {
    constructor(name, options) {
        this.name = name;
        const {
            auto_increment = false,
            type = 'INT',
        } = options;
        this.auto_increment = auto_increment;
        this.type = type;
    }
};
