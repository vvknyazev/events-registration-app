const {Schema, model} = require('mongoose');

const Event = new Schema({
    title: String,
    description: String,
    eventDate: String,
    organizer: String
})

module.exports = model('Event', Event);
