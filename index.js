'use strict';

const Hapi = require('hapi');
const mysql = require('mysql');
const config = require('./src/config/config');
const def = require('./src/connection/connection');
const tls = require('tls');
const fs = require('fs');
const Inert = require('inert');
const rp = require('request-promise');

const validate = async (request, username, password) => {
        var uri = '';
        if(request.query.test) {
            uri = config.amrs.test_url;
        } else {
            uri = config.amrs.prod_url;
        }
        var options = {
                uri: uri,
                headers: {
                    'Authorization':  'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
                },
                json: true // Automatically parses the JSON string in the response
            };
             

        // TODO: set up auth
        // let req = await rp(options).catch((err) => console.log(err));
        let req = {authenticated: true, user: {uuid: 1, username: 'user'}}
        let isValid = req['authenticated'];
        let credentials = {id: req['user']['uuid'], name: req['user']['username']};
        return { isValid, credentials};
        
    };

var routes = require('./src/routes/routes');

var tls_config = false;

const server = new Hapi.server({
        port: config.application.port,
        tls: tls_config
});

if (config.application.tls) {
    tls_config = tls.createServer({
        key: fs.readFileSync(config.application.key),
        cert: fs.readFileSync(config.application.cert)
    });
};

const start = async () => {
        
        await server.register(Inert);
        await server.register(require('hapi-auth-basic'));
        server.auth.strategy('simple', 'basic', {validate});
        server.auth.default('simple');

        for (var route in routes) {
                server.route(routes[route]);
        }
        await server.start();
        console.log('server running at: ' + server.info.uri);
}

start();
