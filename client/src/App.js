import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => { 
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
            <NavBar />
            <Routes>
                <Route path = "/" element = {<Navigate replace to = "/posts" />} />
                <Route path="/posts" element = {<Home />} />
                <Route path="/posts/search" element = {<Home />} />
                <Route path="/posts/:id" element = {<PostDetails />} />
                <Route path="/auth" element = {!user ? <Auth /> : <Navigate replace to = "/posts" />}/>
            </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;