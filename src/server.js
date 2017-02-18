const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sanitize = require('sanitize-html');

const nameGenerator = require('./nameGenerator');

let connectedUsers = [];

io.on('connection', (socket) => {
    const name = nameGenerator();
    connectedUsers.push(name);
    socket.username = name;
    socket.broadcast.emit('new-user', { name });
    socket.emit('name', { name, userList: connectedUsers });
    console.log(`new user: ${name}`);

    socket.on('add-message', (message) => {
        console.log(`received message from ${message.author}: ${message.content}`);
        socket.broadcast.emit('message', message);
    });

    socket.on('rename', (newName) => {
        const sanitized = sanitize(newName);
        socket.broadcast.emit('renamed-user', { oldName: socket.username, name: sanitized });
        socket.username = sanitized;
    });

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(u => u !== socket.username);
        socket.broadcast.emit('disconnect-user', { name: socket.username });
    });
});

http.listen(3000, () => {
    console.log('Listening on port 3000');
});

module.exports = app;
