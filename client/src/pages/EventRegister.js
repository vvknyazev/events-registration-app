import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventRegister = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState(new Date());
    const [referralSource, setReferralSource] = useState('');

    const validateName = (name) => /^[A-Za-z\s]+$/.test(name); // Only letters and spaces
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email); // Basic email regex
    const validateDob = (dob) => {
        const age = new Date().getFullYear() - dob.getFullYear();
        return age >= 14; // Check if age is 14 or more
    };
    const isReferralSelected = () => referralSource !== '';

    const isFormValid = () => {
        return validateName(name) && validateEmail(email) && validateDob(dob) && isReferralSelected();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
                eventId,
                email,
                name,
                dob,
                referralSource,
            });
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Failed to register');
        }
    };

    return (
        <div style={{ backgroundColor: '#323234', height: '100vh' }}>
            <Container fluid className="bg-dark text-white justify-content-md-center">
                <Row className="align-items-center justify-content-center">
                    <Col xs={2} className="text-center">
                        <Button variant="primary" onClick={() => navigate('/')} className="me-5">
                            Home
                        </Button>
                    </Col>
                    <Col xs={8} className="text-center">
                        <Card className="bg-dark border-0 text-white">
                            <Card.Body>
                                <Card.Title className="display-4">Event registration</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={2}></Col>
                </Row>
            </Container>

            <Container className="bg-dark text-white mt-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#343a40', width: '500px', borderRadius: '12px' }}>
                <Form className="p-4" onSubmit={handleSubmit}>
                    <Form.Group controlId="formFullName">
                        <Form.Label className="text-light mt-2">Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your full name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label className="text-light mt-2">Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formDateOfBirth">
                        <Form.Label className="text-light mt-2">Date of Birth (>=14 y.o)</Form.Label>
                        <div className="custom-datepicker-container">
                            <DatePicker
                                selected={dob}
                                onChange={(date) => setDob(date)}
                                dateFormat="yyyy/MM/dd"
                                className="form-control custom-datepicker"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" className="col-form-label text-light">Where did you hear about the event?</Form.Label>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="Social Media"
                                name="eventSource"
                                id="socialMedia"
                                value="Social Media"
                                onChange={(e) => setReferralSource(e.target.value)}
                                checked={referralSource === "Social Media"}
                            />
                            <Form.Check
                                type="radio"
                                label="Friends"
                                name="eventSource"
                                id="friends"
                                value="Friends"
                                onChange={(e) => setReferralSource(e.target.value)}
                                checked={referralSource === "Friends"}
                            />
                            <Form.Check
                                type="radio"
                                label="Found Myself"
                                name="eventSource"
                                id="foundMyself"
                                value="Found Myself"
                                onChange={(e) => setReferralSource(e.target.value)}
                                checked={referralSource === "Found Myself"}
                            />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!isFormValid()}>
                        Register
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default EventRegister;
