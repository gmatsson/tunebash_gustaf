import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000, );

}
// function getName(cb) {
//     socket.on('names', name => cb(null, name));
//     socket.emit('getName', name);
// }


export { subscribeToTimer };