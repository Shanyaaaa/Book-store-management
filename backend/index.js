import express, { response } from "express";
import {PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express();
app.use = express.json();

app.get('/', (req,res) => {
    return res.status(234).send('Welcome to book store management');
})



mongoose
.connect(mongoDBURL)
.then(() =>{
    console.log('Connected to MongoDB');
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});
})

.catch((err) => {
    console.log(err);
});
