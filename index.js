'use strict';

const Hapi = require('hapi');
const mysql = require('mysql');
const config = require('./src/config/config');
const def = require('./src/connection/connection');
const tls = require('tls');
const fs = require('fs');
const Inert = require('inert');
const moment = require('moment');

var routes = require('./src/routes/routes');

const server = new Hapi.Server();

server.on('response', function (request) {
        if (request.response === undefined || request.response === null) {
          console.log("No response");
        } else {
          console.log(
            moment().local().format("YYYY-MM-DD HH:mm:ss") + ': ' + server.info.uri + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' \n ' + request.response.statusCode
          );
          
}});

var tls_config = false;

if (config.application.tls) {
    tls_config = tls.createServer({
        key: fs.readFileSync(config.application.key),
        cert: fs.readFileSync(config.application.cert)
    });
}

server.connection({
        port: config.application.port,
        host: config.application.host,
        tls: tls_config
});

for (var route in routes) {
        server.route(routes[route]);
}

/* server.start((err) => {

         if (err) {
                 throw err;
         }
         console.log(`Server running at: ${server.info.uri}`);
});*/
server.register(Inert, (error) => {
        if (error) {
                throw error;
        } else {
                server.start((error) => {
                        if (error) {
                                throw error;
                        }
                        else {
                                console.log(`Server running at: ${server.info.uri}`);
                        }
                });
        }
});
