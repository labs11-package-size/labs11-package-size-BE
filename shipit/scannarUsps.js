const { UspsClient } = require("shipit");
const { Builder, Parser } = require("xml2js");
const moment = require("moment");
const request = require("request");

class scannarUsps extends UspsClient {
  constructor({ userId }, options) {
    super({ userId }, options);
    this.builder = new Builder({renderOpts: {pretty: false}})
  }
// The below code with string.indexOf assumed userid is always 12 characters
  generateRequest(trk) {
      let trackingArray = []
      trk.forEach(tn => {
          trackingArray.push(`<TrackID ID="${tn}"/>`)
      })
      const unparsedObject = {
          'TrackFieldRequest': {
            '$': {'USERID': this.userId},
            'Revision': "1",
            'ClientIp': "127.0.0.1",
            'SourceId': "shipit",
          }
      }
      let baseXML = this.builder.buildObject(unparsedObject)
    console.log(`${baseXML.slice(0, 175)}${trackingArray.join('')}${baseXML.slice(175)}`)
  }

  presentResponse(response, requestData, cb) {
    this.validateResponse(response, (err, shipment) => {
      if (err || !shipment) {
        return err;
      }
      let { activities, status } = this.getActivitiesAndStatus(shipment);
      let eta = this.getEta(shipment);
      let adjustedEta = moment(eta)
        .utc()
        .format()
        .replace("T00:00:00", "T23:59:59");
      let presentedResponse = {
        activities,
        status
      };
      console.log("any activites", presentedResponse);
      if (requestData && requestData.raw) {
        presentedResponse.raw = response;
      } else {
        if (this.options && this.options.raw) {
          presentedResponse.raw = response;
        }
        presentedResponse.request = requestData;
      }
      return cb(null, presentedResponse);
    });
  }

  requestData(requestData, cb) {
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
      if (response.statusCode !== 200)
        return cb(`response status ${response.statusCode}`);
      return this.presentResponse(body, requestData, cb);
    });
  }
}

module.exports = { scannarUsps };

// generateRequest(tnArray) {
//     const trackingObjectArray = []
//     tnArray.forEach(tn => {

//     })
//                     const generatedRequest = {
//                         "TrackFieldRequest" :
//                     }
// }

// super.validateResponse(response)((err, shipment) => {

// })

// let presentedResponse = {
//     activities: "lolololol"
//   };
//   presentedResponse.raw = response
//   presentedResponse.request = requestData
//   return cb(null, presentedResponse)
