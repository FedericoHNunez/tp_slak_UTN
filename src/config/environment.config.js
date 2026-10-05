import {config} from 'dotenv';
config();
const EVIRONMENT = {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
}

export default EVIRONMENT;