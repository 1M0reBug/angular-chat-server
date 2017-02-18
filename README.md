# socket.io server

This server uses the [socket.io](https://socket.io) library to create a websocket server.
Basically it sends messages with object to specific clients.

## Installation process

### Using yarn

```shell
$ yarn install
```

### Using npm

```shell
$ npm install
```

## Testing

A unique test is provided as example of possible workflow. Running `npm test` should launch the
test suite.

## Pros & Cons of the solution

### Pros

+ Easily/quickly installed and coded
+ Good official documentation with examples
+ Lots of example on the internet

### Cons

+ Quality of code and maintainability (callback hell)
+ Does not use Promises/A+ (possible woraround [socket.io-as-promised][npm-socket.io-promise])

[npm-socket.io-promise]: https://www.npmjs.com/package/socket.io-as-promised

## Scalability

Using redis it is possible to easily scale the application.
The `socket.io-redis` module is an adapter allowing to save every message into redis.
In order to do this, only two lines are required to be added

```javascript
...
const io = require('socket.io')(server);
const redis = require('socket.io-redis');

io.adapter(redis({ host: 'localhost', port: 6379 }));
...
```

Other projects exists like [socket.io-cluster][npm-socket.io-custer].

A complete scalable chat app using this workflow can be found on [github][gb-redispubsub]

[npm-socket.io-cluster]: https://www.npmjs.com/package/socket.io-cluster
[gb-redispubsub]: https://github.com/rajaraodv/redispubsub
