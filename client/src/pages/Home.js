import { Card, Col, Container, Row } from "react-bootstrap";
import EventCard from "../components/EventCard";
import {useEffect, useRef, useState} from "react";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [sortBy, setSortBy] = useState('title');

    const effectRan = useRef(false);

    const fetchEvents = (page) => {

        setLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/api/events`, { params: { page, limit: 10 } })
            .then((response) => {
                const { events, totalPages } = response.data;
                if (events.length === 0 || page >= totalPages) {
                    setHasMore(false);
                } else {
                    setEvents(prevEvents => {
                        const newEvents = [...prevEvents, ...events];
                        return newEvents;
                    });
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (effectRan.current || process.env.NODE_ENV !== "development") {
            fetchEvents(page);
        }
        return () => effectRan.current = true;

    }, [page]);

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !loading && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    const sortEvents = (events, sortBy) => {
        return [...events].sort((a, b) => {
            if (sortBy === 'eventDate') {
                return new Date(a.eventDate) - new Date(b.eventDate);
            } else if (sortBy === 'organizer') {
                return a.organizer.localeCompare(b.organizer);
            } else {
                return a.title.localeCompare(b.title);
            }
        });
    };

    const sortedEvents = sortEvents(events, sortBy);

    return (
        <div style={{ backgroundColor: '#323234' }}>
            <Container fluid className="bg-dark text-white justify-content-md-center">
                <Row className='justify-content-md-center'>
                    <Col className="text-center">
                        <Card className="bg-dark border-0 text-white">
                            <Card.Body>
                                <Card.Title className="display-4">Events</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className="justify-content-md-center mt-4 me-5">
                    <Col className="text-end">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Sort By: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setSortBy('title')}>Title</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortBy('eventDate')}>Event Date</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortBy('organizer')}>Organizer</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-4 flex-wrap">
                    {sortedEvents.map((event) => (
                        <Col className="mt-3 d-flex justify-content-center" style={{ maxWidth: '25rem' }} key={event.id}>
                            <EventCard event={event} />
                        </Col>
                    ))}
                </Row>
                {/*{loading && <p>Loading more events...</p>}*/}
            </Container>
        </div>
    );
}

export default App;
