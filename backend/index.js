import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from "./routes/Posts.js"
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


// Available Routes
app.use('/posts', postRoutes);

mongoose.set('strictQuery', true);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true }, { useUnifiedToplogy: true })
.then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
    .catch ((error) => console.log(error.message));