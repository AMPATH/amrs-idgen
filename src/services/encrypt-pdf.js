const path = require('path');
const hummus = require('hummus');
const HummusRecipe = require('hummus-recipe');

var encryptPDF = {
    encrypt: encrypt
}
module.exports = encryptPDF;

function mp(relFontPath) {
        return path.resolve(__dirname, relFontPath)
}

function encrypt(fileName, password) {
    var filePath = path.join(__dirname, './files/' + fileName);
    var outputName = path.join(__dirname, './files/out-' + fileName);
    const pdfDoc = new HummusRecipe(filePath, outputName);
 
    pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: password,
        userProtectionFlag: 4
    }).endPDF();

    var pdfReader = hummus.createReader(outputName);
    if (pdfReader.isEncrypted()) {
    	return true;
    }
    
}
