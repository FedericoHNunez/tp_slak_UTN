import { config } from 'dotenv';
config();
const ENVIRONMENT = {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    PORT: process.env.PORT || 3000,
    JWT_TOKEN: process.env.TOKEN_JWT_KEY
}

export default ENVIRONMENT;