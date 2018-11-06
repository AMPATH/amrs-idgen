'use strict';
const Promise = require('bluebird');
const dao = require('../dao/dao');
var Encoder = require("code-128-encoder");
var encoder= new Encoder();
var _ = require('lodash');

const checkDigitServices = {
    getDigit: returnDigit,
    getMultiple: returnMultiple,
    saveIdentifier: saveIdentifier,
    getZuriIds: getZuriIds,
    encodeZuriIds: encodeZuriIds
};

module.exports = checkDigitServices;

var possible = '012346789';
    
function randomString(length) {
    var text = '';

    for( var i=0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function luhnCheckDigit(number) {
    var validChars = '0123456789';
    number = number;
    var sum = 0;
    for (var i = 0; i < number.length; i++) {
      var ch = number.charAt(number.length - i - 1);
      if (validChars.indexOf(ch) < 0) {
        console.log('Invalid character(s) found!');
        return false;
      }
      var digit = ch.charCodeAt(0) - 48;
      var weight;
      if (i % 2 == 0) {
        weight = (2 * digit) - parseInt(digit / 5) * 9;
      }
      else {
        weight = digit;
      }
      sum += weight;
    }
    sum = Math.abs(sum) + 10;
    var digit = (10 - (sum % 10)) % 10;
    return digit;
}

function returnDigit(user) {
    
    var randNumber = randomString(9);
    var luhnDigit;
    var digit;

    return dao.identiferService.checkNumber(randNumber).then((result) => {
        if (result) {
            return null;
        } else {

            luhnDigit = luhnCheckDigit(randNumber); 
            digit = randNumber + '-' + luhnDigit;
            
            return dao.identiferService.checkIdentifier(digit)
            .then((success) => {
                if (success) {
                    return '';
                } else {
                    saveIdentifier(digit, user, 1);
                    return digit;
                }
            });

        }
    });
 
}

function returnMultiple(user, number) {
    var x = 0;
    var arr = [];
    var response = new Promise((resolve) => {
        for (var i = 0; i < number; i ++) {
            var resName = new Promise((resolve, reject) => {
                returnDigit(user).then((data) => {
                    do {
                        resolve(data);
                        break;
                    } while (data !== null);
                });
            });
            arr.push(resName);
        }
        
        Promise.all(arr).then((values) => {
            resolve(values);
        });
    });
    return response;
}

function createZuri(user) {

    var randNumber = randomString(9);
    var luhnDigit;
    var digit;

    return dao.identiferService.checkNumber(randNumber).then((result) => {
        if (result) {
            return null;
        } else {

            luhnDigit = luhnCheckDigit(randNumber); 
            let generated = randNumber.match(/.{1,3}/g).join("-");
            digit = 'ZH-' + generated + '-' + luhnDigit;
            
            return dao.identiferService.checkIdentifier(digit)
            .then((success) => {
                if (success) {
                    return '';
                } else {
                    saveIdentifier(digit, user, 8);
                    return digit;
                }
            }, (err) => {
                throw err;
            });

        }
    });
    
}

function getZuriIds(user, number) {
    var arr = [];
    var response = new Promise((resolve) => {
        for (var i = 0; i < number; i ++) {
            var resName = new Promise((resolve, reject) => {
                createZuri(user).then((data) => {
                    do {
                        resolve(data);
                        break;
                    } while (data !== null || data );
                }).catch((err) => {
                    reject(err);
                });
            });
            arr.push(resName);
        }
        
        Promise.all(arr).then((values) => {
            resolve(values);
        });
    });
    return response;

}

function saveIdentifier(digit, user, source) {
    return dao.identiferService.updateLogEntry(digit, user, source).then((result) => {
        if (result) {
            return result;
        }
    });
}

function encodeZuriIds(identifiers) {

    let encoded = [];
    identifiers = _.remove(identifiers, (n) => {
        return n !== null;
    });

    identifiers.forEach((identifier, key) => {
        let arr = [];
        arr[0] = identifiers[key]
        arr[1] = encoder.encode(identifier)
        encoded.push(arr);
    });

    return encoded;

    
}
