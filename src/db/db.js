const mongose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/pos';
const connectDB = async () => {
    try {
        await mongose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connected to database');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
