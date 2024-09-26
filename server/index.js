const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');


const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.options('*', cors());

require('dotenv').config();

app.use(express.json());

app.use('/api', router)
async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        app.listen(PORT, (e) => {
            if (e) console.log(e);
            console.log('Server has been started on port: ' + PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
