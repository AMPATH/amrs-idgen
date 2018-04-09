'use strict';

const path = require('path');
const pdfMaker = require('pdfmake');

const fs = require('fs');
const Promise = require('bluebird');

var generatePDF = {
    print: print
};

module.exports = generatePDF;

function mp(relFontPath) {
	return path.resolve(__dirname, relFontPath)
}

var fonts = {
	Roboto: {
		normal: mp('./fonts/Roboto-Regular.ttf'),
		bold: mp('./fonts/Roboto-Medium.ttf'),
		italics: mp('./fonts/Roboto-Italic.ttf'),
		bolditalics: mp('./fonts/Roboto-MediumItalic.ttf')
	}
};

/** const fontDescriptors = {
    Roboto: {
        normal: './fonts/Roboto-Regular.ttf',
        bold: './fonts/Roboto-Medium.ttf',
        italics: './fonts/Roboto-Italic.ttf',
        bolditalics: './fonts/Roboto-Italic.ttf'
    }	
}  */ 

function print(csvData) {
    const pages = [];
    for (let i = 0; i < csvData.length; i += 10) {
        if (i + 10 <= csvData.length) {
            const sliced = csvData.slice(i, i + 10);
            const pdfDoc = require('./pdfdata').getPageData(sliced);
            pages.push(pdfDoc.content);
        }
    }

    const finalDoc = {
        pageMargins: [20, 20, 20, 20],
        content: [
            {
                stack: pages
            }
        ]
    };

    const pdfMakePrinter = new pdfMaker(fonts);
    const docFile = pdfMakePrinter.createPdfKitDocument(finalDoc);
    const fileName = makeid() + '.pdf';
    const filePath = mp('./files/' + fileName);
    const doc = docFile.pipe(fs.createWriteStream(filePath));
    var response = new Promise((resolve) => {
        doc.on('finish', () => {
            var res = {
                fileName: fileName,
                success: true
            };
            resolve(res);
        });
        docFile.end();
    });
    return response;
}

function makeid() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return text;
}
