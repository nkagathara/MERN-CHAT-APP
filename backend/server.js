const express = require('express');
const { chats } = require('./data/data');
const dotenv   = require('dotenv');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/middleware');

dotenv.config();
connectDb();
const app = express();

app.use(express.json()); // to accept json data

app.use('/api/user',userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000 ;

app.listen(5000,console.log(`server started on port ${PORT}`));

