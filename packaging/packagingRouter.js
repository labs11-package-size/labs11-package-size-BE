const router = require("express").Router();
const db = require("../data/packagingModule.js");
const { authenticate } = require("../api/globalMW.js");
const productsdb = require("../data/productsModule");
const boxesdb = require("../data/boxesModule");
const axios = require("axios");

router.get("/", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  db.getPackages(userId)
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.post("/preview", authenticate, (req, res) => {
  console.log("req.body for /packaging/preview", req.body);
  if (req.body.products && req.body.products.length) {
    if ((req.body.boxType === "mailer" && req.body.products.length > 62)) {
      return res.status(400).json({
        message:
          "The length of items for the mailer search exceeds the limit of 62"
      });
    }
    if ((req.body.boxType === "shipper" && req.body.products.length > 50)) {
      return res.status(400).json({
        message:
          "The length of items for the shipper search exceeds the limit of 50"
      });
    }
    if (!req.body.boxType && req.body.products.length > 29) {
      return res.status(400).json({
        message:
          "The length of items for the mailer search exceeds the limit of 29"
      });
    }
    uuidArray = req.body.products.map(uuid => {
      return uuid.toLowerCase();
    });
    const uuidCount = {};
    uuidArray.forEach(item => {
      if (!uuidCount[item]) {
        uuidCount[item] = 0;
      }
      uuidCount[item]++;
    });
    productsdb
      .getDimensions(uuidArray)
      .then(productsdata => {
        const itemsarray = [];
        productsdata.forEach(productdata => {
          const duplicates = uuidCount[productdata.uuid];
          for (i = 0; i < duplicates; i++) {
            const loopedIdentifier = productdata.identifier + 100 * i;
            itemsarray.push(
              `${loopedIdentifier}:0:${productdata.weight}:${
                productdata.length
              }x${productdata.width}x${productdata.height}`
            );
          }
        });
        console.log("requested boxType", req.body.boxType)
        boxesdb
          .getBoxes(req.body.boxType)
          .then(boxesdata => {
            console.log("boxesdata", boxesdata)
            const binsarray = [];
            for (i = 0; i < itemsarray.length; i++) {
              boxesdata.forEach(boxdata => {
                const loopedIdentifier = boxdata.identifier + i * 16;
                binsarray.push(`${loopedIdentifier}:100:${boxdata.dimensions}`);
              });
            }
            const apiURL = `http://www.packit4me.com/api/call/raw?bins=${binsarray.join()}&items=${itemsarray.join()}`;
            axios
              .post(`${apiURL}`)
              .then(p4mdata => {
                const previewboxes = p4mdata.data.filter(boxobject => {
                  return boxobject.items.length;
                });
                res.status(200).json(previewboxes);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(({ code, message }) => {
            res.status(code).json({ message });
          });
      })
      .catch(({ code, message }) => {
        res.status(code).json({ message });
      });
  } else {
    return res.status(400).json({
      message: "Please provide an array of productIds within req.body.products"
    });
  }
});

router.get("/getModel/:querystring", (req, res) => {
  const { querystring } = req.params;
  const modelURL = `http://www.packit4me.com/api/call/preview?${querystring}`;
  axios
    .post(modelURL)
    .then(post => {
      res.send(post.data);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.delete("/delete/:uuid", authenticate, (req, res) => {
  const { uuid } = req.params;
  const userId = req.decoded.subject;
  db.deletePackage(uuid.toLowerCase(), userId)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({
          message: "No package was found matching the UUID given in the URL"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.post("/add", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  console.log("req.body for /packaging/add", req.body);
  db.addPackages(req.body, userId)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});



module.exports = router;
