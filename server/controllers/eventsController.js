const Event = require('../models/event')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const RegistrationUsers = require('../models/registrationUsers')

class EventsController {

    // async createEvents(req, res) {
    //     try {
    //         await Event.insertMany(currentEvents);
    //         res.status(201).json({ message: 'Events created' });
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    async registerUser(req, res) {
        const {eventId, email, name, dob, referralSource} = req.body;

        const registration = await RegistrationUsers.create({
            eventId: eventId,
            email: email,
            fullName: name,
            dateOfBirth: dob,
            referralSource: referralSource
        });

        try {
            await registration.save();
            res.status(201).json({message: 'Registration successful'});
        } catch (error) {
            res.status(400).json({message: 'Error registering', error});
        }
    }

    async getEvents(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const skip = (page - 1) * limit;

            const events = await Event.find().skip(skip).limit(limit);

            const totalEvents = await Event.countDocuments();

            res.json({
                events,
                totalEvents,
                currentPage: page,
                totalPages: Math.ceil(totalEvents / limit)
            });
        } catch (error) {
            res.status(500).json({message: 'Error fetching events', error});
        }
    }


    async getEventById(req, res) {
        try {
            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({message: 'Event not found'});
            }
            res.json(event);
        } catch (error) {
            res.status(500).json({message: 'Error fetching event details', error});
        }
    }

    async getEventInfo(req, res) {
        try {
            const registrations = await RegistrationUsers.find({eventId: req.params.id});
            res.json(registrations);
        } catch (error) {
            res.status(500).json({message: 'Error fetching registrations', error});
        }
    }

    async getRegistrationsPerDay(req, res) {
        const { eventId } = req.params;
        console.log('Received eventId:', eventId);

        try {
            const registrations = await RegistrationUsers.aggregate([
                {
                    $match: { eventId: new ObjectId(eventId) }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id": 1 }
                }
            ]);

            res.json(registrations);
        } catch (error) {
            console.error('Error fetching registrations:', error);
            res.status(500).json({ message: 'Error fetching registrations', error });
        }
    }




}

module.exports = new EventsController()
