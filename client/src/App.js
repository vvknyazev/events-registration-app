import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import EventRegister from "./pages/EventRegister";
import EventInfo from "./pages/EventInfo";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register/:eventId' element={<EventRegister/>}/>
                <Route path='/event/:eventId' element={<EventInfo/>}/>
            </Routes>
        </div>
    );
};

export default App;
