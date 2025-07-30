require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { router: authRouter } = require('./routes/auth');
const skillRoutes = require('./routes/skills.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Dummy route
app.get('/', (req, res) => res.send("API is running"));

// DB Connection
mongoose.set('strictQuery', true); // Optional but recommended
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log("MongoDB connection error: ", err));

// Fix: Add missing '/' in API routes
app.use('/api/auth', authRouter);
app.use('/api/skills', skillRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
