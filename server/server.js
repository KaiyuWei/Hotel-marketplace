import express from 'express';
import fs from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require("morgan");
require ('dotenv').config();

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
//route middleware
fs.readdirSync('./routes').map((r) => 
    app.use('/api', require(`./routes/${r}`)));  // the reason of using Sync is that we want to make sure that all files are read

// db connection
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB ERR => ", err));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port 8000`));