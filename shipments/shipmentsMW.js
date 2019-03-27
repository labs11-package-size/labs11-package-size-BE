const { UspsClient } = require("shipit");
const usps = new UspsClient({ userId: `${process.env.TRACKUSERNAME}` });
const db = require("../data/productsModule.js");
const moment = require("moment");

module.exports = {
  uspsTracking
};

// trackingNumber's value needs to be string format
function uspsTracking(req, res, next) {
  const trackingNumber = req.body.trackingNumber;
  const productId = req.body.productId;
  const currentDate = moment().format("YYYY-MM-DD hh:mm:ss");
  if (typeof trackingNumber !== "string") {
    return res.status(400)
    .json({ error: "Invalid Request, please provide trackingNumber as string" })
  }
  if (!productId) {
    return res
      .status(400)
      .json({ error: "Invalid Request, please provide productId in request body" });
  }
  db.getProductName(productId)
    .then(found => {
      if (found) {
        if (!trackingNumber) {
          return res.status(400).json({
            error:
              "Invalid Request, please include a trackingNumber in the request body"
          });
        }
        usps.requestData({ trackingNumber }, (err, data) => {
          if (err) {
            return res
              .status(401)
              .json({ error: "The tracking number supplied is not valid" });
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
            productName: found.name,
            trackingNumber,
            productId
          };
          next();
        });
      } else {
        return res.status(404).json({
          error: "No matching product found for given productId"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
}
