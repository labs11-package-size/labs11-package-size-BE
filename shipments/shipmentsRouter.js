const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../data/productsModule.js");
const { authenticate } = require("../api/globalMW.js");
const { jwtSecret } = require("../config/secrets.js");
const { UspsClient } = require("shipit");
const usps = new UspsClient({ userId: `${process.env.TRACKUSERNAME}` });

router.post("/tracking", authenticate, (req, res, next) => {
    const { trackingNumber } = req.body
  usps.requestData(
    { trackingNumber: `${trackingNumber}` },
    (err, data) => {
      if (err) {
        err.httpStatusCode = 500;
        return next(err);
      }
      res.send(data);
    }
  );
});

module.exports = router;
