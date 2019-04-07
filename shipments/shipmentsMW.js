const { UspsClient } = require("shipit");
const usps = new UspsClient({ userId: `${process.env.TRACKUSERNAME}` });
const db = require("../data/dbConfig.js");
const moment = require("moment");

module.exports = {
  uspsTracking
};

// trackingNumber's value needs to be string format
function uspsTracking(req, res, next) {
  const userId = req.decoded.subject;
  const trackingNumber = req.body.trackingNumber;
  const { uuid }  = req.params
  if (!uuid) {
    return res.status(400).json({
      message:
        "Invalid Request, please include a uuid in the url parameter"
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
          if (err) {
            return res
              .status(401)
              .json({ message: "The tracking number supplied is not valid" });
          }
          let parsedDate = moment(
            data.activities[data.activities.length - 1].timestamp
          ).format("YYYY-MM-DD");
          req.trackingObject = {
            lastUpdated: currentDate,
            dateShipped: parsedDate,
            shippedTo: data.destination,
            shippingType: data.service,
            status: data.status,
            carrierName: "USPS",
            trackingNumber,
            productId: 13,
            dimensions: found.dimensions,
            totalWeight: found.totalWeight,
            productNames: found.productNames,
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
