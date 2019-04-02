const axios = require("axios");
const productsdb = require("../data/productsModule");
const boxesdb = require("../data/boxesModule");

module.exports = {
  packit4me
};

function packit4me(req, res, next) {
  if (req.products && req.products.length) {
    const binsarray = [];
    const itemsarray = [];
    productsdb
      .findDimensions(req.products)
      .then(productdata => {
        itemsarray.push(`${productdata.identifier}:0:
      ${productdata.length}
      x${productdata.width}
      x${productdata.height}`);
      })
      .catch(({ code, message }) => {
        res.status(code).json({ message });
      });
    boxesdb
      .getBoxes()
      .then(boxdata => {
        binsarray.push(`${box.identifier}:100:${box.dimensions}`);
      })
      .catch(({ code, message }) => {
        res.status(code).json({ message });
      });
    const apiurl = `www.packit4me.com/api/call/raw?bins=${binsarray.join()}&items=${itemsarray.join()}`;
    console.log(apiurl);
    next();
  } else {
    return res.status(400).json({
      message: "Please provide an array of productIds within req.body.products"
    });
  }
}
