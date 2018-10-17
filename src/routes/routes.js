'use strict';
const path = require('path');
const services = require('../services/services');
const fs = require('fs');

module.exports = function() {
    return [
        {
            method: 'GET',
            path: '/',
            handler: (request, reply) => {
                reply('You are here, AMRS ID Generator');
            }
        },
        {
            method: 'POST',
            path: '/generateidentifier',
            handler: (request, reply) => {
                
                var user = request.payload.user;
                
                services.checkDigitServices.getDigit(user).then((data) => {
                    var result = {
                        identifier: data
                    };
                    do {
                        reply(result);
                        break;
                    } while (data !== null);
                });
                
            }
        },
        {
            method: 'POST',
            path: '/generatemultiple',
            handler: (request, reply) => {

                var user = request.payload.user;
                var number = request.payload.number;
                var password = request.payload.password;
                
                services.checkDigitServices.getMultiple(user, number).then((data) => {

                    if (data.length === number) {
                        services.generatePDF.print(data).then((res) => {
				
                            if (res.success) {
                                var encrypted = services.encryptPDF.encrypt(res.fileName, password);
                                if (encrypted) {
                                    var fileNa = path.join(__dirname, '../services/files/out-' + res.fileName);
                                    reply.file(fileNa);
                                    setTimeout(() => {
                                        fs.unlinkSync(fileNa, (err) => {
                                            if (err) throw err;
                                        });
                                        fs.unlinkSync(path.join(__dirname, '../services/files/' + res.fileName), (err) => {
                                            if (err) throw err;
                                        });
                                    }, 20000);
                                    
                                }
                            }
                        });  
                    }
                });           
            }
        },
        {
            method: 'POST',
            path: '/generatezuri',
            handler: (request, reply) => {

                var user = request.payload.user;
                var number = request.payload.number;
                
                services.checkDigitServices.getZuriIds(user, number).then((data) => {

                    if (data.length === number) {
                        let ids = services.checkDigitServices.encodeZuriIds(data);
                        reply(ids); 
                    }
                });           
            }
        }

    ];
}();
