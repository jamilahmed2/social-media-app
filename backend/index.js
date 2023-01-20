import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from "./routes/Posts.js"

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));


// Available Routes
app.use('/posts', postRoutes);

mongoose.set('strictQuery', true);
const mongoURI = "mongodb+srv://socialmediappmern:socialmediapp123@cluster0.vfpg1kg.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURI, { useNewUrlParser: true }, { useUnifiedToplogy: true })
    .then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
    .catch ((error) => console.log(error.message));