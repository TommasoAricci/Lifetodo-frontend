const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://ariccitommaso:Lifeistariccitommaso@prod-cluster.ds6ve.mongodb.net/Lifeist";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database connection successful');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;

