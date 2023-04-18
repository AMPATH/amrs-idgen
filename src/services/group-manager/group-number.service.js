var mflFacilityMappings = require("./mfl-facility-mappings.json");
var _ = require("lodash");
const dao = require("../../dao/dao");

function getMFLByLocationUuid(locationUuid) {
  console.log(mflFacilityMappings[locationUuid]);
  return mflFacilityMappings[locationUuid];
}

async function generateGroupNumber(
  prefix,
  mflCode,
  locationUuid,
  increaseBy = 0
) {
  let groupNumber = "";

  return dao.groupIdentifierService
    .getMaxGroupIdByLocation(locationUuid)
    .then((id) => {
      let max_id = parseInt(id) + 1;
      const lastFiveDigits = padNumber(max_id, 5);
      const hyphen = "-";
      groupNumber = `${prefix}${hyphen}${mflCode}${hyphen}${lastFiveDigits}`;
    })
    .then((generatedGroupNumber) => {
      return dao.groupIdentifierService.groupNumberExists(generatedGroupNumber);
    })
    .then((exists) => {
      if (exists) {
        return generateGroupNumber(prefix, mflCode, locationUuid, increaseBy++);
      } else {
        return {
          groupNumber,
        };
      }
    });
}

function padNumber(num, len) {
  let str = num.toString();
  while (str.length < len) {
    str = "0" + str;
  }
  return str;
}
const service = {
  getMFLByLocationUuid,
  generateGroupNumber,
};

module.exports = service;
