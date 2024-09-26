const {Schema, model} = require('mongoose');

const RegistrationUsers = new Schema({
        eventId: {type: Schema.Types.ObjectId, ref: 'Event'},
        email: String,
        fullName: String,
        dateOfBirth: String,
        referralSource: String,
    },
    {
        timestamps: true
    });

module.exports = model('RegistrationUsers', RegistrationUsers);
