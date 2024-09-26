import React from 'react';
import {Button, Card} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const RegistrationCard = ({user}) => {
    return (
        <Card style={{ width: '25vw' }} className="bg-dark text-white">
            <Card.Header as="h5">{user.fullName}</Card.Header>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                    <Card.Subtitle>
                        {user.email}
                    </Card.Subtitle>
                </div>
            </Card.Body>
        </Card>
    );
};

export default RegistrationCard;
