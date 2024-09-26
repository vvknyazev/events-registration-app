const Router = require('express')
const router = new Router()
const eventsController = require('../controllers/eventsController')

// router.post('/add-events', eventsController.createEvents)

router.post('/register', eventsController.registerUser)

router.get('/events', eventsController.getEvents)
router.get('/:id', eventsController.getEventById)
router.get('/:id/registrations', eventsController.getEventInfo)

router.get('/events/:eventId/registrations-per-day', eventsController.getRegistrationsPerDay);

module.exports = router

