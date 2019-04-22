const { scannarUsps } = require("../shipit/scannarUsps");
const { UspsClient } = require("shipit");
const usps = new UspsClient({ userId: `${process.env.TRACKUSERNAME}` });
const uspsArray = new scannarUsps({ userId: `${process.env.TRACKUSERNAME}` });
const db = require("../data/dbConfig.js");
const moment = require("moment");

module.exports = {
  uspsTracking,
  trackOne,
  testingShipit
};


function testingShipit(req, res, next) {
  const userId = req.decoded.subject;
uspsArray.requestData({trackingNumber: ["9534612116879084152017","9405509699938306832585"]}, (err, data) => {
  if (err || typeof data.destination === "undefined") {
    return res
      .status(400)
      .json({ message: "The tracking number supplied is not valid" });
  }
  req.trackingObject = data;
  next();
})
}

function uspsTracking(req, res, next) {
  const userId = req.decoded.subject;
  const trackingNumber = req.body.trackingNumber;
  const { uuid }  = req.params
  if (!uuid) {
    return res.status(400).json({
      message:
        "Invalid Request, please include a uuid of a package object in the url parameter"
    });
  }
  const packageUUID = uuid.toLowerCase()
  const currentDate = moment().format("YYYY-MM-DD hh:mm:ss");
  if (!trackingNumber) {
    return res.status(400).json({
      message:
        "Invalid Request, please include the property trackingNumber in the request body"
    });
  }
  if (typeof trackingNumber !== "string") {
    return res.status(400)
    .json({ message: "Invalid Request, please provide trackingNumber as string" })
  }
  db('pendingShipments')
  .where("uuid", packageUUID)
  .andWhere({ userId })
  .first()
    .then(found => {
      if (found) {
        usps.requestData({ trackingNumber }, (err, data) => {
          if (err || typeof data.destination === "undefined") {
            return res
              .status(400)
              .json({ message: "The tracking number supplied is not valid" });
          }
          let parsedDate = moment(
            data.activities[data.activities.length - 1].timestamp
          ).format("YYYY-MM-DD");
          req.trackingObject = {
            tracked: true,
            lastUpdated: currentDate,
            dateShipped: parsedDate,
            shippedTo: data.destination,
            shippingType: data.service,
            status: data.status,
            carrierName: "USPS",
            trackingNumber,
            dimensions: found.dimensions,
            totalWeight: found.totalWeight,
            productNames: found.productNames,
            productUuids: found.productUuids,
            modelURL: found.modelURL,
            userId
          };
          next();
        });
      } else {
        return res.status(404).json({
          message: "No matching package found in this user's list for given UUID"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
}

function trackOne(req, res, next) {
  const userId = req.decoded.subject;
  const { uuid }  = req.params
  if (!uuid) {
    return res.status(400).json({
      message:
        "Invalid Request, please include a uuid of a package object in the url parameter"
    });
  }
  const packageUUID = uuid.toLowerCase()
  const currentDate = moment().format("YYYY-MM-DD hh:mm:ss");
  return db("shipments")
  .select(
    "tracked",
    "modelURL",
    "dateShipped",
    "dateArrived",
    "productNames",
    "productUuids",
    "totalWeight",
    "shippedTo",
    "trackingNumber",
    "carrierName",
    "shippingType",
    "dimensions",
    "status",
    "uuid",
    "lastUpdated",
  )
  .where({uuid})
  .andWhere("tracked", true)
  .andWhere("uuid", packageUUID )
  .andWhere({userId})
  .first()
  .then(providedShipment => {
    if (providedShipment) {
      usps.requestData({ trackingNumber: providedShipment.trackingNumber }, (err, data) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "The tracking number on given shipment is not valid" });
        }
        req.result = {
          ...providedShipment,
          shippingData: data
        };
        next();
      });
  } else {
    return res.status(404).json({
      message: "No matching package found in this user's list for given UUID"
    });
  }

})

}

