import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RegistrationCard from "../components/RegistrationCard";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {Bar, Line} from "react-chartjs-2";

// Register the scales and components needed for your charts
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const EventInfo = () => {
    const { eventId } = useParams();
    const [registrations, setRegistrations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [registrationsPerDay, setRegistrationsPerDay] = useState([]);
    const [chartType, setChartType] = useState('bar'); // Toggle between 'line' and 'bar'

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/${eventId}/registrations`)
            .then((response) => {
                setRegistrations(response.data);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
        axios.get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}/registrations-per-day`)
            .then((response) => {setRegistrationsPerDay(response.data);
            })
            .catch((error) => {
                console.error('Error fetching registrations per day:', error);
            });
    }, [eventId]);

    const filteredRegistrations = registrations.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const data = {
        labels: registrationsPerDay.map(r => r._id), // Dates
        datasets: [
            {
                label: 'Registrations per day',
                data: registrationsPerDay.map(r => r.count),
                backgroundColor: chartType === 'bar' ? 'rgba(75,192,192,0.92)' : 'rgba(75,192,192,0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,


            },
        ],
    };

    return (
        <div style={{ backgroundColor: '#323234', height: '100vh', position: 'relative' }}>
            <Container fluid className="bg-dark text-white justify-content-md-center">
                <Row className="align-items-center justify-content-center">
                    <Col xs={2} className="text-center">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/')}
                            className="me-5"
                        >
                            Home
                        </Button>
                    </Col>
                    <Col xs={8} className="text-center">
                        <Card className="bg-dark border-0 text-white">
                            <Card.Body>
                                <Card.Title className="display-4">Event participants</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={2}></Col>
                </Row>
            </Container>

            <Container className="mt-5">
                <Form className="d-flex justify-content-center">
                    <Form.Group controlId="searchQuery" className="w-50"> {/* Adjust the width as needed */}
                        <Form.Control
                            type="text"
                            placeholder="Search by name or email"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Container>

            <Container >
                <Row className="justify-content-md-center mt-4 flex-wrap">
                    {filteredRegistrations.map((user) => (
                        <Col className="mt-3 d-flex justify-content-center" style={{ maxWidth: '25rem' }} key={user.id}>
                            <RegistrationCard user={user} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Container className="text-white mb-5 mb-5">
                <Row className={'justify-content-md-center mt-5 ' }>
                    <Col md={8}> {/* Adjust the number based on your desired width */}
                        <h4 className="text-white mb-4 text-center">Registrations per Day Chart</h4>
                        <Button variant="secondary" onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}>
                            Toggle Chart Type
                        </Button>
                        {chartType === 'line' ? (
                            <Line data={data} key={chartType} />
                        ) : (
                            <Bar data={data} key={chartType} />
                        )}
                    </Col>
                </Row>
            </Container>
            <Container className='mt-4'>

            </Container>
        </div>
    );
};

export default EventInfo;
