require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const UserRouter = require('../users/usersRouter.js');
const ProductsRouter = require('../products/productsRouter.js');
const ShipmentsRouter = require('../shipments/shipmentsRouter.js');

const server = express();

// const originUrls = process.env.PERMITTED_URLS.split(',');

// const corsOptions = {
//   origin: '*',
//   credentials: true,
//   methods: ['GET', 'PUT', 'POST', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'UserId'],
// };

server.use(morgan());
server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/users', UserRouter);
server.use('/api/products', ProductsRouter);
// server.use('/api/shipments', ShipmentsRouter);

module.exports = server;