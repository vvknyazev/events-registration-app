import React from 'react';
import {Button, Card} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const EventCard = ({event}) => {
    return (
        <Card style={{ width: '25vw' }} className="bg-dark text-white">
            <Card.Header as="h5" className='text-center'>{event.title}</Card.Header>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                    <Card.Text>
                        {event.description}
                    </Card.Text>
                    <Card.Text>
                        <div>{event.eventDate}</div>
                        <div>{event.organizer}</div>
                    </Card.Text>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '15px'}}>
                    <NavLink to={`/register/${event._id}`}><Button variant="primary">Register</Button></NavLink>
                    <NavLink to={`/event/${event._id}`}><Button variant="primary">View</Button></NavLink>
                </div>
            </Card.Body>
        </Card>
    );
};

export default EventCard;
