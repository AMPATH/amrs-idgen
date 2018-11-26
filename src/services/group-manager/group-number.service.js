var mflFacilityMappings = require('./mfl-facility-mappings.json');
var _ = require('lodash');
const dao = require('../../dao/dao');

function getMFLByLocationUuid(locationUuid) {
    console.log(mflFacilityMappings[locationUuid]);
    return mflFacilityMappings[locationUuid];
}

async function generateGroupNumber(prefix, mflCode, locationUuid, increaseBy = 0) {
    let groupNumber = '';
    return dao.groupIdentifierService.getMaxGroupIdByLocation(locationUuid).then((id) => {
        const lastFiveDigits = padNumber(id + increaseBy, 5);
        const hyphen = '-';
        groupNumber = `${prefix}${hyphen}${mflCode}${hyphen}${lastFiveDigits}`;
        return groupNumber;
    }).then((generatedGroupNumber) => {
        return dao.groupIdentifierService.groupNumberExists(generatedGroupNumber)
    }).then((exists) => {
        if(exists) {
            return generateGroupNumber(prefix, mflCode, locationUuid, increaseBy++);
        } else {
            return {
                groupNumber
            };
        }
    });
}

function padNumber(num, padlen, padchar) {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
}

const service = {
    getMFLByLocationUuid,
    generateGroupNumber
}

module.exports = service;