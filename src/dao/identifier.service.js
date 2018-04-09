'use strict';

const connection = require('../connection/connection');
const Promise = require('bluebird');

var identiferService = {
    checkNumber: checkNumber,
    checkIdentifier: checkIdentifier,
    updateLogEntry: updateLogEntry
};

module.exports = identiferService;

function checkNumber(randNumber) {

    var query = 'SELECT * FROM idcards_generated_identifier where id='+ randNumber;
    
    return connection.executeQuery(query)
    .then((results) => {
        if (results[0]) {
            return true;
        } else {
            return false;
        }
    }).catch((err) => {
        throw err;
    });

}

function checkIdentifier(identifier) {

    var query = 'SELECT * FROM idgen_log_entry where identifier='+ identifier;
    return connection.executeQuery(query)
    .then((results) => {
        if (results[0]) {
            return true;
        } else {
            return false;
        }
    }).catch((err) => {
        throw err;
    });

}

function updateLogEntry(identifier, user) {
    var user = user;
    var identifier = identifier;
    var source = 1;
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    var query = 'INSERT INTO idgen_log_entry (source, identifier, date_generated, generated_by) ' +
    'values ("' + source + '","' + identifier + '" , "' + date + '" , "' + user + '")';
    
    return connection.executeQuery(query)
    .then((results) => {
        if (results) {
            return true;
        } else {
            return false;
        }
    }).catch((err) => {
        throw err;
    }); 
}