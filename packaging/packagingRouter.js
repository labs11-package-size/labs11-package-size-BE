const router = require("express").Router();
const db = require("../data/packagingModule.js");
const { authenticate } = require("../api/globalMW.js");
const productsdb = require("../data/productsModule");
const boxesdb = require("../data/boxesModule");
const axios = require("axios");

router.post("/preview", authenticate, (req, res) => {
  console.log("req.body", req.body);
  if (req.body.products && req.body.products.length) {
    uuidArray = req.body.products.map(uuid => {
      return uuid.toLowerCase();
    });
    productsdb
      .getDimensions(uuidArray)
      .then(productsdata => {
        const itemsarray = [];
        productsdata.forEach(productdata => {
          console.log("getdimensions forEach", productdata);
          itemsarray.push(
            `${productdata.identifier}:0:${productdata.weight}:${
              productdata.length
            }x${productdata.width}x${productdata.height}`
          );
        });
        boxesdb
          .getBoxes(req.body.boxType)
          .then(boxesdata => {
            const binsarray = [];
            for (i = 0; i < itemsarray.length; i++) {
              boxesdata.forEach(boxdata => {
                const loopedIdentifier = boxdata.identifier + i * 16;
                binsarray.push(`${loopedIdentifier}:100:${boxdata.dimensions}`);
              });
            }
            console.log("bins", binsarray);
            console.log("items", itemsarray);
            const apiURL = `http://www.packit4me.com/api/call/raw?bins=${binsarray.join()}&items=${itemsarray.join()}`;
            console.log(apiURL);
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

module.exports = router;
