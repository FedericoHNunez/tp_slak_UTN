import mongoose from 'mongoose';
import cowsay from 'cowsay';
import  EVIRONMENT from './environment.config.js';



async function connectMongoDB(){
    try{
        await mongoose.connect( `${EVIRONMENT.MONGO_URI}/${EVIRONMENT.MONGO_DB_NAME}`)
        console.log(cowsay.say({
    text : "Conexión a MongoDB exitosa",
    e : "oO",
    T : "U "
}));
    
    } catch (error){
        console.error("Error al conectar a MongoDB", error.message);
        /* carasheo controlado */   
        process.exit(1) // Salida con error
    }
}

export default connectMongoDB;