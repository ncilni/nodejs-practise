const EventEmitter = require('events');
const url = ' https://www.logger.io/log';

class Logger extends EventEmitter{
 log(message) {
    // Send a HTTP reqeust
    console.log(message);
    this.emit('messageLogged', {id: 1, url:'https://'})
};
}
module.exports = Logger;