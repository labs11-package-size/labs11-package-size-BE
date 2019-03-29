const router = require("express").Router();
const db = require("../data/productsModule.js");
const { authenticate } = require("../api/globalMW.js");


router.get("/", authenticate, (req, res) => {
    const userId = req.decoded.subject
  db.getProducts(userId)
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
        res.status(code).json({ message });
      });
});

router.post("/add", authenticate, (req, res) => {
  const userId = req.decoded.subject
  const {
    name,
    productDescription,
    weight,
    value,
    manufacturerId,
    fragile
  } = req.body;
  const addition = {
    name,
    productDescription,
    weight,
    value,
    manufacturerId,
    fragile
  };
  db.addProduct(addition, userId)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.delete("/delete/:uuid", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const { uuid } = req.params;
  db.deleteProduct(uuid.toLowerCase(), userId)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({
          message:
            "Unable to find any Product entry matching the UUID given in the URL"
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
    name,
    productDescription,
    weight,
    value,
    manufacturerId,
    fragile
  } = req.body;
  const changes = {
    name,
    productDescription,
    weight,
    value,
    manufacturerId,
    fragile
  };
  db.editProduct(uuid.toLowerCase(), userId, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message:
            "Unable to find any Product entry matching the UUID given in the URL"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.get("/assets/:uuid", authenticate, (req, res) => {
  const { uuid } = req.params;
  db.getAssets(uuid.toLowerCase())
    .then(found => {
      if (found) {
      res.status(200).json(found);
    } else {
      res.status(404).json({
        message:
          "Unable to find any Product entry matching the UUID given in the URL"
      });
    }
  })
    .catch(({ code, message }) => {
        res.status(code).json({ message });
      });
})

router.post("/assets/add/:uuid", authenticate, (req, res) => {
const { uuid } = req.params;
const {
  label,
  url
} = req.body;
const addition = {
  label,
  url
};
db.addAsset(uuid.toLowerCase(), addition)
.then(added => {
  if (added) {
  res.status(200).json(added);
} else {
  res.status(404).json({
    message:
      "Unable to find any Product entry matching the UUID given in the URL"
  });
}
})
.catch(({ code, message }) => {
    res.status(code).json({ message });
  });
})

module.exports = router