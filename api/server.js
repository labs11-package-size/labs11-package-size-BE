require("dotenv").config();
const moment = require("moment");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const UserRouter = require("../users/usersRouter.js");
const ProductsRouter = require("../products/productsRouter.js");
const ShipmentsRouter = require("../shipments/shipmentsRouter.js");

const server = express();

// const originUrls = process.env.PERMITTED_URLS.split(',');

// const corsOptions = {
//   origin: '*',
//   credentials: true,
//   methods: ['GET', 'PUT', 'POST', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'UserId'],
// };

const testconfigvar = process.env.TESTINGVAR;

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  res.send(`
    <div>
      <h1>scannAR Back-End API</h1>
      <p>${testconfigvar}<p>
      <p>
        Welcome to the server! The time is now ${moment()
          .utcOffset(-7)
          .format("h:mm:ss a")} PST / ${moment()
    .utcOffset(-4)
    .format("h:mm:ss a")} EST.
      </p>
      <h3>POST /api/users/register – Creates a new record on the ‘users’ table.</h3>
      <p>
        Expected request body properties: { username (required, unique), password
        (required), fullName (required), email, oAuth(boolean) }
      </p>
      <h3>POST /api/users/login – Creates a JSON Web Token for user</h3>
      <p>
        Accepted request body properties: { username (required), password
        (required) }
      </p>
      <h3>GET /api/users/checkauth – Checks if user’s token is valid</h3>
      <p>
       Returns true or false
        depending on if the token is still valid. Can be used in a
        componentDidMount() to set this.state.loggedIn upon browser refresh.
      </p>
      <h3>GET /api/user/accountinfo - Returns all account info for current user</h3>
      <p>Expects JSON web token for Auth, and then returns JSON object representing user account data.</p>
      <h3>PUT /api/user/accountinfo/edit - Edits account info of currently logged in user</h3>
      <p> Expect JSON web token for Auth. Expected request body properties: { username, password, fullName, email, oAuth } <br>
      Updates currently logged in user's account info and returns a JSON representing account info after update</p>
      <hr>
      <h2>Products Routes<h2>
      <h3>
        GET /api/products – Returns a list of all products for current user
      </h3>
      <p>
       Returns an array of JSON
        objects which represent products for the current user.
      </p>
      <h3>
        POST /api/products/add – Creates a new record on the “products” table
      </h3>
      <p>
      Expected request body properties: { name, productDescription, weight, length, width, height, value, manufacturerId, fragile(boolean), userId } <br><br>
       Adds the product for the
        current user. Returns a single JSON object with all of that product’s
        properties.
      </p>
      <h3> DELETE /api/products/delete/:id - Deletes a product based on the URL parameter</h3>
      <p>Deletes a product with identifier matching the URL parameter. Returns an array of JSON
      objects, which represent all products for current user after deletion changes.</p>
      <h3> PUT /api/products/edit/:id - Edits a product based on the URL parameter</h3>
      <p>Expects all the same request body properties as add product. None of these are required, only the ones you want to update. <br><br> Edits a product with identifier matching the URL parameter. Returns an array of JSON
      objects, which represent all products for current user after update changes.</p>
      <h3> GET /api/products/assets/:id - Returns a list of all assets for product provided in URL</h3>
      <h3> POST /api/products/assets/add/:id - Adds a product asset.</h3>
      <hr>
      <h2>
      Shipments Routes
      </h2>
      <h5>Status codes for tracking responses
        0 : Unknown,
        1: Shipping,
        2: En-Route,
        3: Out-For-Delivery,
        4: Delivered,
        5: Delayed</h5>
      <h3>GET to /api/shipments/ - Returns a list of all shipments for current user</h3>
      <p>
     Returns an array of JSON
      objects, which represent all shipments for current user.
      </p>
      <h3>POST to /api/shipments/add - Adds a new shipment by using a USPS Tracking Number</h3>
      <p>
      Expected request body properties: { trackingNumber, productId }. <br><br>Runs trackingNumber through USPS Api, 
      creates trackingData object, and then uses the object for creation in database. Returns trackingData
      JSON object as response data.
      </p>
      <h3>DELETE to /api/shipments/delete/:id - Deletes a shipment based on URL parameter</h3>
      <p>Deletes shipment with identifier matching the URL parameter. Returns an array of JSON
      objects, which represent all shipments for current user after deletion changes. <p>
      <h3>PUT to /api/shipments/edit/:id - Edits a shipment based on URL parameter</h3>
      <p>Expected request body properties: { dateShipped,
        productId,
        shippedTo,
        trackingNumber,
        carrierName,
        shippingType,
        status } None of these are required, only what you want to update.<br><br>
      Edits shipment with identifier matching the URL parameter. Returns an array of JSON
      objects, which returns the updated object. <p>
    </div>
  `);
});

server.use("/api/users", UserRouter);
server.use("/api/products", ProductsRouter);
server.use("/api/shipments", ShipmentsRouter);

module.exports = server;
