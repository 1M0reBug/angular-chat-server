/* eslint-env node, mocha */
const expect = require('chai').expect;
const app = require('../src/server'); // eslint-disable-line

const io = require('socket.io-client');

describe('IdT Messaging Web Socket Server', () => {
    const options = {
        transport: ['websocket'],
        'force new connection': true,
    };
    const url = 'http://localhost:3000';

    let client;

    before(() => {
        client = io.connect(url, options);
    });

    describe('connection', () => {
        it('should return a { name } on connect', (done) => {
            client.on('name', (name) => {
                expect(name).to.have.property('name');
                client.disconnect();
                done();
            });
        });
    });
});
