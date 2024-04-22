import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import dotenv from 'dotenv';
import router from './routes/route.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Routes
app.get('/', (req, res) => {
    res.status(200).json("Home GET Request");
});

app.use('/api',router)

// Connect to the database and start the server
connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process if database connection fails
    });
