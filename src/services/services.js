'use strict';

const checkDigitServices = require('./check-digit.service');
const encryptPDF = require('./encrypt-pdf');
const generatePDF = require('./generate-pdf');

const services = {
    checkDigitServices: checkDigitServices,
    encryptPDF: encryptPDF,
    generatePDF: generatePDF
};

module.exports = services;
