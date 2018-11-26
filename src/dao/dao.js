'use strict';

const identiferService = require('./identifier.service');
const groupIdentifierService = require('./group-identifier.service');

var dao = {
    identiferService,
    groupIdentifierService
};

module.exports = dao;
