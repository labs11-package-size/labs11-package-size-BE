POST /api/users/login – Creates a JSON Web Token for user, and creates a new account if their firebase uid is new to scannAR.
      
      A request to this login route is expected to be made immediately after logging in through firebase.
      Firebase login provides user data upon a successful login. Use this data in JSON form for making this POST request.
      
      Accepted request body properties: { 
        uid (required), 
        displayName, 
        email, 
        photoURL
      }
      Returns a JSON web token.
      
      GET /api/users/checkauth – Checks if user’s token is valid
      
      Returns true or false
      depending on if the token is still valid. Can be used in a
      componentDidMount() to set this.state.loggedIn upon browser refresh.
      
      GET /api/users/accountinfo - Returns all account info for current user
      Expects JSON web token. Returns JSON object representing user account data.
      PUT /api/users/accountinfo/edit - Edits account info of currently logged in user
       Expects JSON web token. Expected request body properties: { 
      displayName,
      email,
      photoURL } 
      Updates currently logged in user's account info and returns a JSON representing account info after update
      
      Products Routes
      
      GET /api/products – Returns a list of all products for current user
      
      
      Returns an array of JSON
      objects which represent products for the current user.
      
      
      POST /api/products/add – Creates a new record on the “products” table
      
      
      Expected request body properties: { 
        name, 
        productDescription, 
        weight, 
        value, 
        manufacturerId, 
        fragile(boolean), 
        length, 
        width, 
        height 
      } 
      Adds the product for the
      current user. Returns an array of JSON
      objects, representing all products for current user.
      
       DELETE /api/products/delete/:uuid - Deletes a product based on the URL parameter
      Deletes a product with UUID matching the URL parameter. Returns an array of JSON
      objects, which represent all products for current user after deletion changes.
       PUT /api/products/edit/:uuid - Edits a product based on the URL parameter
      Expects any of the same request body properties as add product. None of these are required, only the ones you want to update.  
      Edits a product with identifier matching the URL parameter. Returns an array of JSON
      objects, which represent all products for current user after update changes.
       GET /api/products/assets/:uuid - Returns an array of JSON objects for all assets for product provided in URL. If there is only one found asset, it will still be returned as an array with a length of 1, requiring a map.
       POST /api/products/assets/add/uuid - Adds a product asset and relates it to product with the UUID provided in the URL. 
      Expected request body properties: { label,  url,}
      
      
      Packaging Routes      
      GET to /api/packaging/ - Provides of list of all Packages-On-Deck for current user
      Returns an array of JSON objects which each represent one of the packages saved.
      POST to /api/packaging/preview - Provides a list of preview boxes based on an array of UUIDs sent in the request body.
      Expected Request Body: { products: (array of UUIDs of products), boxType (not required, "shipper" or "mailer") }
      Returns an array of JSON objects which each represent one preview box (packing configuration).
      Example Returned JSON:
      [{
        "size": "10 x 8 x 4",
        "id": "6",
        "size_1": 10,
        "size_2": 8,
        "size_3": 4,
        "weight_limit": 100,
        "curr_weight": 6,
        "item_count": 2,
        "items": [
            {
                "id": "8",
                "orig_size": "9 x 8 x 4",
                "sp_size": "9 x 8 x 4",
                "size_1": 9,
                "size_2": 8,
                "size_3": 4,
                "sp_size_1": 9,
                "sp_size_2": 8,
                "sp_size_3": 4,
                "x_origin_in_bin": -0.5,
                "y_origin_in_bin": 0,
                "z_origin_in_bin": 0,
                "weight": 1,
                "constraints": 0
            },
            {
                "id": "13",
                "orig_size": "8 x 1 x 3",
                "sp_size": "1 x 8 x 3",
                "size_1": 8,
                "size_2": 1,
                "size_3": 3,
                "sp_size_1": 1,
                "sp_size_2": 8,
                "sp_size_3": 3,
                "x_origin_in_bin": 4.5,
                "y_origin_in_bin": 0,
                "z_origin_in_bin": 0.5,
                "weight": 1,
                "constraints": 0
            }] 
      }
    ]
    POST to /api/packaging/add - Adds a "Package-On-Deck"
    Expected request body: One of, or an array of the bin objects as sent by the /api/packaging/preview GET route.
    Returns an array of JSON objects, which represent all packages for current user after the addition
    
    DELETE to /api/packaging/delete/:uuid - Deletes a "Package-On-Deck"
    Deletes package of the given UUID if it is linked to current logged in user.
    Returns an array of JSON objects, which represent all packages for current user after the deletion.
      
      
      Shipments Routes
      
      Status codes for tracking responses
        0 : Unknown,
        1: Shipping,
        2: En-Route,
        3: Out-For-Delivery,
        4: Delivered,
        5: Delayed
      GET to /api/shipments/ - Returns a list of all shipments for current user
      
     Returns an array of JSON
      objects, which represent all shipments for current user.
      
      POST to /api/shipments/add/:uuid - Adds a new shipment by using a USPS Tracking Number, and a Package's UUID in the URL
      *** Tracking Number must be sent as a string ***
      
      Expected request body properties: { trackingNumber }. Runs trackingNumber through USPS Api, 
      creates trackingData object, and then uses the object for creation in database. Returns an array of JSON objects,
      which represents all of the shipments after the addition.
      
      DELETE to /api/shipments/delete/:uuid - Deletes a shipment based on URL parameter
      Deletes shipment with UUID matching the URL parameter. Returns an array of JSON
      objects, which represent all shipments for current user after deletion changes. 
    