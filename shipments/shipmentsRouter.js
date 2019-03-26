const router = require("express").Router();
const db = require("../data/shipmentsModule.js");
const { authenticate } = require("../api/globalMW.js");
const { uspsTracking } = require("./shipmentsMW.js");

router.post("/add", authenticate, uspsTracking, (req, res) => {
  const trackingdata = req.trackingObject;
  const userId = req.decoded.subject;
  db.addShipment(trackingdata, userId)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

// I didn't make id: a URL parameter on this
// route, because it would deviate from what the url param
// points to on DELETE and PUT (productId vs shipmentId)

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

router.delete("/delete/:id", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const { id } = req.params;
  db.deleteShipment(id, userId)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({
          message:
            "Unable to find any shipment entry matching the identifier given in the URL"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.put("/edit/:id", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const { id } = req.params;
  const {
    dateShipped,
    productId,
    shippedTo,
    trackingNumber,
    carrierName,
    shippingType,
    status
  } = req.body;
  const changes = {
    dateShipped,
    productId,
    shippedTo,
    trackingNumber,
    carrierName,
    shippingType,
    status
  };
  db.editShipment(id, userId, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message:
            "Unable to find any shipment entry matching the identifier given in the URL"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

module.exports = router;
