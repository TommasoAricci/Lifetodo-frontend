const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const todoRoutes = require('./routes/todoRoute');
const thoughtRoutes = require('./routes/thoughtRoute');
const userRoutes = require('./routes/userRoute');
const songRoutes = require('./routes/songRoute');

app.use(express.json());

app.use(cors({
    origin: '*',
}));

app.use(express.static(path.join(__dirname, '../../build')));

app.use("/api", todoRoutes, thoughtRoutes, userRoutes, songRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
});

module.exports = app;
