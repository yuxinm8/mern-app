import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles.js';
import memoriesLogo from "../../images/memoriesLogo.png";
import memoeriesText from "../../images/memoriesText.png";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate('/');
    };

    useEffect (() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
    <AppBar className = {classes.appBar} position = "static" color = "inherit">
        <div className = {classes.brandContainer}>
            <img src = {memoeriesText} alt = "icon" height = "45px" />
            <img className = {classes.image} src = {memoriesLogo} alt = "icon" height = "40" />
        </div>
        <Toolbar className = {classes.toolbar}>
            {user ? (
                <div className = {classes.profile}>
                    <Avatar className = {classes.purple} alt = {user.result.name} src = {user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className = {classes.userName} varient = "h6">{user.result.name}</Typography> 
                    <Button className = {classes.logout} variant = "contained" color = "secondary" onClick = {logout}>Logout</Button>
                </div>
            ) : (
                <Button component = {Link} to ='/auth' variant = "contained" color = "primary">Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
    );
};

export default NavBar;