
export class ConfigTemplate {

    constructor() {
    }

    render() {
        const items = [];

        items.push("USM_HOST=127.0.0.1");
        items.push("USM_USERNAME=mysql");
        items.push("USM_PASSWORD=");
        items.push("USM_DATABASE=");

        return items.join("\n");
    }

}
