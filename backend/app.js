const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const designationRoute=require('./routes/designationRoute')
const QuestionAnswerRoute=require('./routes/QuestionAnswerRoute')

const cors = require('cors');

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000', 'https://onlineportalweb.com','http://localhost:3001'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, 
}));



// Parse application/x-www-form-urlencoded

app.use('/api/auth', authRoutes);
app.use('/api', designationRoute);
app.use('/api',QuestionAnswerRoute)

module.exports = app;