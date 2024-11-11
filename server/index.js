const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const HostelRouter = require('./routes/hostelCard');
const connectDB = require('./db');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/hostels', HostelRouter);



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});