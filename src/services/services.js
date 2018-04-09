'use strict';

const checkDigitServices = require('./check-digit.service');
const encryptPDF = require('./encrypt-pdf');
const generatePDF = require('./generate-pdf');
const dao = require('../dao/dao');
const Promise = require('bluebird');

const services = {
    checkDigitServices: checkDigitServices,
    encryptPDF: encryptPDF,
    generatePDF: generatePDF
};

module.exports = services;
