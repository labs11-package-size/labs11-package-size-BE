const { UspsClient } = require("shipit");
const usps = new UspsClient({ userId: `${process.env.TRACKUSERNAME}` });

module.exports = {
  uspsTracking
};

function uspsTracking(req, res, next) {
  const trackingNumber = req.body.trackingNumber
  const productId = req.body.productId;
  if (trackingNumber || productId) {
    usps.requestData({ trackingNumber: trackingNumber }, (err, data) => {
        if (err)
        return res
          .status(401)
          .json({ error: "The tracking number supplied is not valid" });
      req.trackingObject = {
        dateShipped: data.activities[
          data.activities.length - 1
        ].timestamp,
        shippedTo: data.destination,
        shippingType: data.service,
        status: data.status,
        carrierName: "USPS",
        trackingNumber,
        productId
      }
      next();
    });
  } else {
    return res.status(400).json({
      error:
        "Invalid Request, please include both a trackingNumber and productId in the request body"
    });
  }
}
