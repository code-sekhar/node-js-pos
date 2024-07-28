const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/db/db');
const userRoutes = require('./src/routes/user.routes');

connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello World!',
        version: '0.0.1',
        status:'200',
        success: true
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});