
export class SchemaColumn {
    constructor(name, options) {
        this.name = name;
        const {
            auto_increment = false,
            type = 'INT',
            nullable = true,
        } = options;
        this.auto_increment = auto_increment;
        this.type = type;
        this.nullable = nullable;
    }

    build() {
        const parts = [];
        parts.push(this.name);
        parts.push(this.type);
        /* Processing autoincrement options */
        if (this.auto_increment === true) {
            parts.push('AUTO_INCREMENT');
        }
        /* Processing nullable options */
        if (this.nullable === true) {
        } else if (this.nullable === false) {
            parts.push('NOT NULL');
        }
        return parts.join(' ');
    }

};
