const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../data/productsModule.js");
const { authenticate } = require("../api/globalMW.js");
const { jwtSecret } = require("../config/secrets.js");
const { UspsClient } = require("shipit");
const usps = new UspsClient({ userId: `${process.env.TRACKUSERNAME}` });

router.post("/tracking", authenticate, (req, res, next) => {
  const { trackingNumber } = req.body;
  usps.requestData({ trackingNumber: `${trackingNumber}` }, (err, data) => {
    if (err) {
      err.httpStatusCode = 500;
      return next(err);
    }
    res.send(data);
  });
});

router.get("/", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  db.getShipments(userId)
    .then(shipments => {
      res.status(200).json(shipments);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.post("/add", authenticate, (req, res) => {
  db.addShipment()
    .then(added => {
      res.status(201).json(added);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.delete("/delete/:id", authenticate, (req, res) => {
  const { id } = req.params;
  db.deleteShipment(id)
    .then(shipments => {
      res.status(200).json(shipments);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.put("/edit/:id", authenticate, (req, res) => {
  const { id } = req.params;
  { dateShipped, productId, shippedTo, trackingNumber, carrierName, shippingType, status }
  const changes = { dateShipped, productId, shippedTo, trackingNumber, carrierName, shippingType, status }
  db.editShipment(id, changes)
    .then(shipments => {
      res.status(200).json(shipments);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

module.exports = router;
