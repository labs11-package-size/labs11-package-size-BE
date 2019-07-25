const router = require("express").Router();
const db = require("../data/productsModule.js");
const { authenticate } = require("../api/globalMW.js");

router.get("/", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  db.getProducts(userId)
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.get("/option", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const { limit, page } = req.query;
  db.getProductsLimited(userId, limit, page)
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.post("/add", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const {
    name,
    productDescription,
    weight,
    length,
    width,
    height,
    value,
    manufacturerId,
    fragile,
    thumbnail,
    images
  } = req.body;
  const addition = {
    name,
    productDescription,
    weight,
    length,
    width,
    height,
    value,
    manufacturerId,
    fragile,
    thumbnail,
    images
  };
  if (!Array.isArray(images)) {
    delete addition[images];
  }
  for (let propName in addition) {
    if (
      typeof addition[propName] === "undefined" ||
      addition[propName] === null
    ) {
      delete addition[propName];
    }
  }
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message:
        "In the request body, a name property with a string value is required"
    });
  }
  if (images && (Array.isArray(images) === false)) {
    return res.status(400).json({
      message:
        "The images property sent to the server must be an array"
    });
  }
  db.addProduct(addition, userId, req.body.images)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.delete("/delete/:id", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const { id } = req.params;
  db.deleteProduct(id.toLowerCase(), userId)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({
          message:
            "Unable to find any Product entry matching the identifier given in the URL"
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
    name,
    productDescription,
    weight,
    length,
    width,
    height,
    value,
    manufacturerId,
    fragile,
    images
  } = req.body;
  const changes = {
    name,
    productDescription,
    weight,
    length,
    width,
    height,
    value,
    manufacturerId,
    fragile,
    images
  };
  for (let propName in changes) {
    if (
      typeof changes[propName] === "undefined" ||
      changes[propName] === null
    ) {
      delete changes[propName];
    }
  }
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message:
        "In the request body, a name property with a string value is required"
    });
  }
  if (images && (Array.isArray(images) === false)) {
    return res.status(400).json({
      message:
        "The images property sent to the server must be an array"
    });
  }
  db.editProduct(id.toLowerCase(), userId, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message:
            "Unable to find any Product entry matching the identifier given in the URL"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.get("/assets/:id", authenticate, (req, res) => {
  const { id } = req.params;
  db.getAssets(id.toLowerCase())
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({
          message:
            "Unable to find any Product entry matching the identifier given in the URL"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.post("/assets/add/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const { label, url } = req.body;
  const addition = {
    label,
    url
  };
  db.addAsset(id.toLowerCase(), addition)
    .then(added => {
      if (added) {
        res.status(200).json(added);
      } else {
        res.status(404).json({
          message:
            "Unable to find any Product entry matching the identifier given in the URL"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.get("/getdetail/:uuid", authenticate, (req, res) => {
  const { page } = req.query;
  const userId = req.decoded.subject;
  const { uuid } = req.params;
  db.getDetail(uuid.toLowerCase(), userId, page)
    .then(found => {
      if (found) {
        res.status(201).json(found);
      } else {
        res.status(404).json({
          message:
            "Unable to find any product matching the identifier given in the URL"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

module.exports = router;
