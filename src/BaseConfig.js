
import { env }  from 'process';

import { config } from 'dotenv';

const settings = config();

/**
 * Create connection settings
 *
 */
export const createConnOptions = () => {
    const options = {
        host: env.USM_HOST,
        username: env.USM_USERNAME,
        password: env.USM_PASSWORD,
        database: env.USM_DATABASE,
    };
    return options;
};
