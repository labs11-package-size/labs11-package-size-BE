const router = require("express").Router();
const db = require("../data/packagingModule.js");
const { authenticate } = require("../api/globalMW.js");
const { packit4me } = require("./packagingMW.js");

router.post("/preview", authenticate, packit4me, (req, res) => {
  const userId = req.decoded.subject;
  db.getPendingShipments(userId)
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

module.exports = router
