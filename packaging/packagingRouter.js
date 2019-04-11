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
    if (req.body.boxType === "mailer" && req.body.products.length > 62) {
      return res.status(400).json({
        message:
          "The length of items for the mailer search exceeds the limit of 62"
      });
    }
    if (req.body.boxType === "shipper" && req.body.products.length > 50) {
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
    const idParser = itemId => {
      if (itemId.length > 2) {
        if (itemId.lastIndexOf("0") === itemId.length - 2) {
          return itemId.slice(itemId.length - 1);
        } else {
          return itemId.slice(itemId.length - 2);
        }
      } else {
        return itemId;
      }
    };
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
        console.log("requested boxType", req.body.boxType);
        boxesdb
          .getBoxes(req.body.boxType)
          .then(boxesdata => {
            console.log("boxesdata", boxesdata);
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
                const previewBoxes = p4mdata.data.filter(boxobject => {
                  return boxobject.items.length;
                });
                const eachItem = [];
                previewBoxes.forEach(binObject => {
                  binObject.items.forEach(itemObject => {
                    if (!eachItem.includes(idParser(itemObject.id))) {
                      eachItem.push(idParser(itemObject.id));
                    }
                  });
                });
                productsdb
                  .getUUIDs(eachItem)
                  .then(itemUUIDs => {
                    console.log(itemUUIDs);
                    const idsToUUIDs = {};
                    itemUUIDs.forEach(uuidObject => {
                      idsToUUIDs[uuidObject.identifier] = uuidObject.uuid;
                    });
                    const parsedPreviewBoxes = previewBoxes.map(binObject => {
                      binObject.items.forEach(itemObject => {
                        itemObject.uuid = idsToUUIDs[idParser(itemObject.id)];
                        return itemObject;
                      });
                      return binObject;
                    });
                    res.status(200).json(parsedPreviewBoxes);
                  })
                  .catch(err => {
                    console.log(err);
                  });
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
      const itemStart = querystring.indexOf("items=") + 6;
      var cutString = querystring.slice(itemStart);
      const itemsArray = [];
      let commaCount = 0;
      for (let position = 0; position < cutString.length; position++) {
        if (cutString.charAt(position) == ",") {
          commaCount += 1;
        }
      }
      const firstColon = cutString.indexOf(":");
      itemsArray.push(cutString.slice(0, firstColon));
      for (let i = 0; i < commaCount; i++) {
        let nextComma = cutString.indexOf(",") + 1;
        var cutString = cutString.slice(nextComma);
        let nextColon = cutString.indexOf(":");
        itemsArray.push(cutString.slice(0, nextColon));
      }

      parsedItems = [];
      itemsArray.forEach(item => {
        if (item.length > 2) {
          if (item.lastIndexOf("0") === item.length - 2) {
            parsedItems.push(item.slice(item.length - 1));
          } else {
            parsedItems.push(item.slice(item.length - 2));
          }
        } else {
          parsedItems.push(item);
        }
      });
      productsdb
        .getProductNames(parsedItems)
        .then(namesObjectArray => {
          let namesToIds = {};
          let finalNamesArray = [];
          namesObjectArray.forEach(namesObject => {
            namesToIds[namesObject.identifier] = namesObject.name;
          });
          itemsArray.forEach(itemId => {
            let finalNamesObject = {};
            const idParser = () => {
              if (itemId.length > 2) {
                if (itemId.lastIndexOf("0") === itemId.length - 2) {
                  return itemId.slice(itemId.length - 1);
                } else {
                  return itemId.slice(itemId.length - 2);
                }
              } else {
                return itemId;
              }
            };
            if (namesToIds[idParser()]) {
              finalNamesObject.id = itemId;
              finalNamesObject.name = namesToIds[idParser()];
              finalNamesArray.push(finalNamesObject);
            }
          });
          console.log("finalNamesArray", finalNamesArray);
          const finalFunc = () => {
            const funcArray = [];
            for (let i = 0; i < finalNamesArray.length; i++) {
              funcArray.push(`if (idOnly == "${finalNamesArray[i].id}") {
                const itemName = "${finalNamesArray[i].name} -"
                return itemName+itemSize
              }`);
            }
            return funcArray.join("");
          };
          const finalResult = `function parseNames(key) {
            let idOnly = key.slice(0, key.indexOf(":") - 1)
            let itemSize = key.slice(key.indexOf(":") - 1)
            console.log(idOnly)
            ${finalFunc()}
            };`;
          console.log(finalResult);
          const crossPosition = post.data.indexOf("createLegend(container) {") + 25;
          const dataWithFunc = [
            post.data.slice(0, crossPosition),
            finalResult,
            post.data.slice(crossPosition)
          ].join("");
          const bodyPosition = dataWithFunc.indexOf("key_cell.innerHTML") + 21;
          const addition = `parseNames(key)`;
          const newHTML = [
            dataWithFunc.slice(0, bodyPosition),
            addition,
            dataWithFunc.slice(bodyPosition + 3)
          ].join("");

          res.send(newHTML);
        })
        .catch(({ code, message }) => {
          res.status(code).json({ message });
        });
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
