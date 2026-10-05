import mongoose from 'mongoose';
import cowsay from 'cowsay';
import ENVIRONMENT from './environment.config.js';



async function connectMongoDB() {
    try {
        await mongoose.connect(`${ENVIRONMENT.MONGO_URI}/${ENVIRONMENT.MONGO_DB_NAME}`)
        console.log(cowsay.say({
            text: "Conexión a MongoDB exitosa",
            e: "oO",
            T: "U "
        }));

    } catch (error) {
        console.error("Error al conectar a MongoDB", error.message);
        process.exit(1)
    }
}

export default connectMongoDB;