require("dotenv").config();
const moment = require("moment");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const UserRouter = require("../users/usersRouter.js");
const ProductsRouter = require("../products/productsRouter.js");
const ShipmentsRouter = require("../shipments/shipmentsRouter.js");
const PackagingRouter = require("../packaging/packagingRouter.js");
const serveStatic = require("serve-static");

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
server.use(helmet({frameguard: false}));
server.use(
  serveStatic("serveStatic", { index: ["default.html", "default.htm"] })
);

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
      <h3>POST /api/users/login – Creates a JSON Web Token for user, and creates a new account if their firebase uid is new to scannAR.</h3>
      
      <p>A request to this login route is expected to be made immediately after logging in through firebase.
      Firebase login provides user data upon a successful login. Use this data in JSON form for making this POST request.
      
      <p>Accepted request body properties: { <br>
        uid (required), <br>
        displayName, <br>
        email, <br>
        photoURL
      }<br>
      Returns a JSON web token.
      </p>
      <h3>GET /api/users/checkauth – Checks if user’s token is valid</h3>
      <p>
      Returns true or false
      depending on if the token is still valid. Can be used in a
      componentDidMount() to set this.state.loggedIn upon browser refresh.
      </p>
      <h3>GET /api/users/accountinfo - Returns all account info for current user</h3>
      <p>Expects JSON web token. Returns JSON object representing user account data.</p>
      <h3>PUT /api/users/accountinfo/edit - Edits account info of currently logged in user</h3>
      <p> Expects JSON web token. Expected request body properties: { <br>
      displayName,<br>
      email,<br>
      photoURL } <br><br>
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
      Expected request body properties: { <br>
        name, <br>
        productDescription, <br>
        weight, <br>
        value, <br>
        manufacturerId, <br>
        fragile(boolean), <br>
        length, <br>
        width, <br>
        height <br>
      } <br><br>
      Adds the product for the
      current user. Returns an array of JSON
      objects, representing all products for current user.
      </p>
      <h3> DELETE /api/products/delete/:uuid - Deletes a product based on the URL parameter</h3>
      <p>Deletes a product with UUID matching the URL parameter. Returns an array of JSON
      objects, which represent all products for current user after deletion changes.</p>
      <h3> PUT /api/products/edit/:uuid - Edits a product based on the URL parameter</h3>
      <p>Expects any of the same request body properties as add product. None of these are required, only the ones you want to update. <br><br> 
      Edits a product with identifier matching the URL parameter. Returns an array of JSON
      objects, which represent all products for current user after update changes.</p>
      <h3> GET /api/products/assets/:uuid - Returns an array of JSON objects for all assets for product provided in URL. If there is only one found asset, it will still be returned as an array with a length of 1, requiring a map.</h3>
      <h3> POST /api/products/assets/add/uuid - Adds a product asset and relates it to product with the UUID provided in the URL. </h3>
      <p>Expected request body properties: { <br>label, <br> url,}<br>
      <hr>
      <h2>
      Packaging Routes      </h2>
      <h3>GET to /api/packaging/ - Provides of list of all Packages-On-Deck for current user</h3>
      <p>Returns an array of JSON objects which each represent one of the packages saved.</p>
      <h3>POST to /api/packaging/preview - Provides a list of preview boxes based on an array of UUIDs sent in the request body.</h3>
      <p>Expected Request Body: { products: (array of UUIDs of products), boxType (not required, "shipper" or "mailer") }</p>
      <p>Returns an array of JSON objects which each represent one preview box (packing configuration).<br><br>
      Example Returned JSON:<br>
      [<br>{<br>
        "size": "10 x 8 x 4",<br>
        "id": "6",<br>
        "size_1": 10,<br>
        "size_2": 8,<br>
        "size_3": 4,<br>
        "weight_limit": 100,<br>
        "curr_weight": 6,<br>
        "item_count": 2,<br>
        "items": [<br>
            {<br>
                "id": "8",<br>
                "orig_size": "9 x 8 x 4",<br>
                "sp_size": "9 x 8 x 4",<br>
                "size_1": 9,<br>
                "size_2": 8,<br>
                "size_3": 4,<br>
                "sp_size_1": 9,<br>
                "sp_size_2": 8,<br>
                "sp_size_3": 4,<br>
                "x_origin_in_bin": -0.5,<br>
                "y_origin_in_bin": 0,<br>
                "z_origin_in_bin": 0,<br>
                "weight": 1,<br>
                "constraints": 0<br>
            },<br>
            {<br>
                "id": "13",<br>
                "orig_size": "8 x 1 x 3",<br>
                "sp_size": "1 x 8 x 3",<br>
                "size_1": 8,<br>
                "size_2": 1,<br>
                "size_3": 3,<br>
                "sp_size_1": 1,<br>
                "sp_size_2": 8,<br>
                "sp_size_3": 3,<br>
                "x_origin_in_bin": 4.5,<br>
                "y_origin_in_bin": 0,<br>
                "z_origin_in_bin": 0.5,<br>
                "weight": 1,<br>
                "constraints": 0<br>
            }]<br> 
      }<br>
    ]<br>
    <h3>POST to /api/packaging/add - Adds a "Package-On-Deck"</h3>
    <p>Expected request body: One of, or an array of the bin objects as sent by the /api/packaging/preview GET route.<br>
    <p>Returns an array of JSON objects, which represent all packages for current user after the addition</p>
    <br><br>
    <h3>DELETE to /api/packaging/delete/:uuid - Deletes a "Package-On-Deck"</h3>
    <p>Deletes package of the given UUID if it is linked to current logged in user.<br>
    Returns an array of JSON objects, which represent all packages for current user after the deletion.</p><br><br>
      <hr>
      <h2>
      Shipments Routes
      </h2>
      <h5>Status codes for tracking responses<br>
        0 : Unknown,<br>
        1: Shipping,<br>
        2: En-Route,<br>
        3: Out-For-Delivery,<br>
        4: Delivered,<br>
        5: Delayed</h5>
      <h3>GET to /api/shipments/ - Returns a list of all shipments for current user</h3>
      <p>
     Returns an array of JSON
      objects, which represent all shipments for current user.
      </p>
      <h3>POST to /api/shipments/add/:uuid - Adds a new shipment by using a USPS Tracking Number, and a Package's UUID in the URL</h3>
      <h5>*** Tracking Number must be sent as a string ***</h5>
      <p>
      Expected request body properties: { trackingNumber }. <br><br>Runs trackingNumber through USPS Api, 
      creates trackingData object, and then uses the object for creation in database. Returns an array of JSON objects,
      which represents all of the shipments after the addition.
      </p>
      <h3>DELETE to /api/shipments/delete/:uuid - Deletes a shipment based on URL parameter</h3>
      <p>Deletes shipment with UUID matching the URL parameter. Returns an array of JSON
      objects, which represent all shipments for current user after deletion changes. <p>
    </div>
  `);
});

server.use("/api/users", UserRouter);
server.use("/api/products", ProductsRouter);
server.use("/api/shipments", ShipmentsRouter);
server.use("/api/packaging", PackagingRouter);

module.exports = server;
