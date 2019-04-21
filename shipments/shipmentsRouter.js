const router = require("express").Router();
const db = require("../data/shipmentsModule.js");
const { authenticate } = require("../api/globalMW.js");
const { uspsTracking, trackOne } = require("./shipmentsMW.js");

router.post("/add/:uuid", authenticate, uspsTracking, (req, res) => {
  const { uuid } = req.params
  const trackingdata = req.trackingObject;
  const userId = req.decoded.subject;
  db.addShipment(trackingdata, uuid.toLowerCase(), userId)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.post("/addweb/:uuid", authenticate, uspsTracking, (req, res) => {
  const { uuid } = req.params
  const trackingdata = req.trackingObject;
  const userId = req.decoded.subject;
  db.addShipmentWeb(trackingdata, uuid.toLowerCase(), userId)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
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


router.get("/all", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  db.getAllShipments(userId)
    .then(shipments => {
      res.status(200).json(shipments);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});


router.delete("/delete/:uuid", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const { uuid } = req.params;
  db.deleteShipment(uuid.toLowerCase(), userId)
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

router.delete("/deleteweb/:uuid", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const { uuid } = req.params;
  db.deleteShipmentWeb(uuid.toLowerCase(), userId)
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

router.put("/edit/:uuid", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const { uuid } = req.params;
  const {
    dateArrived,
    dateShipped,
    productId,
    shippedTo,
    trackingNumber,
    carrierName,
    shippingType,
    status
  } = req.body;
  const changes = {
    dateArrived,
    dateShipped,
    productId,
    shippedTo,
    trackingNumber,
    carrierName,
    shippingType,
    status
  };
  db.editShipment(uuid.toLowerCase(), userId, changes, productId)
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

router.get("/:uuid", authenticate, trackOne, (req, res) => {
  if (req.result) {
    return res.status(200).json(req.result)
  }
  else return res.status(500).json({message: "internal server error"})
})

module.exports = router;
