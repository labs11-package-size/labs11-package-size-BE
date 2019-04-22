const { UspsClient } = require("shipit");
const { Builder, Parser } = require("xml2js");
const moment = require("moment");
const request = require("request");

class scannarUsps extends UspsClient {
  constructor({ userId }, options) {
    super({ userId }, options);
    this.parser = new Parser();
    this.builder = new Builder({ renderOpts: { pretty: false } });
  }
  // The below code with string.indexOf assumed userid is always 12 characters
  generateRequest(trk, clientIp) {
    let onlyUnique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    var uniquetrk = trk.filter(onlyUnique);
    console.log(uniquetrk);
    let trackingArray = [];
    uniquetrk.forEach(tn => {
      trackingArray.push(`<TrackID ID="${tn}"/>`);
    });
    const unparsedObject = {
      TrackFieldRequest: {
        $: { USERID: this.userId },
        Revision: "1",
        ClientIp: "127.0.0.1",
        SourceId: "shipit"
      }
    };
    let baseXML = this.builder.buildObject(unparsedObject);
    return `${baseXML.slice(0, 175)}${trackingArray.join("")}${baseXML.slice(
      175
    )}`;
  }

  responseFunc(response, infoIndex, cb) {
    var handleResponse = (xmlErr, trackResult) => {
      if (trackResult["TrackResponse"]["TrackInfo"][infoIndex]) {
        let trackInfo = trackResult["TrackResponse"]["TrackInfo"][infoIndex];
        if (xmlErr || !trackInfo) {
          return cb(xmlErr);
        }
        return cb(null, trackInfo);
      }
    };
    this.parser.reset();
    this.parser.parseString(response, handleResponse);
  }

  presentResponse(response, requestData, cb) {
    var responseObject = {};
    for (let i = 0; i <= requestData.trackingNumber.length; i++) {
      this.responseFunc(response, i, (err, shipment) => {
          console.log("looprunning")
        if (err || !shipment) {
          return cb(err);
        }
        let eta = this.getEta(shipment);
        let adjustedEta = moment(eta)
          .utc()
          .format()
          .replace("T00:00:00", "T23:59:59");
        let { activities, status } = this.getActivitiesAndStatus(shipment);
        let indexedTracking = {
          eta: adjustedEta,
          service: this.getService(shipment),
          destination: this.getDestination(shipment),
          status,
          activities,
        };
        responseObject[requestData.trackingNumber[i]] = indexedTracking;
      });
    }
    console.log("responseObject", responseObject)
    return cb(null, responseObject);
  }

  requestData(requestData, cb) {
    let onlyUnique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    requestData.trackingNumber = requestData.trackingNumber.filter(onlyUnique);
    let opts = this.requestOptions(requestData);
    if (requestData.timeout) {
      opts.timeout = requestData.timeout;
    }
    if (this.options && this.options.timeout) {
      opts.timeout = options.timeout;
    }
    request(opts, (err, response, body) => {
      if (!body || err) {
        return cb(err);
      }
      if (response.statusCode !== 200) {
        return cb(`response status ${response.statusCode}`);
      }
      return this.presentResponse(body, requestData, cb);
    });
  }
}

module.exports = { scannarUsps };