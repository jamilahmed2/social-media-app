import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography, } from '@mui/material';
import useStyles from './style'
import timeline from '../../Images/timeline.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'

const Navbar = () => {
  const classes = useStyles();
  const location= useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profileData')));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    };

    setUser(JSON.parse(localStorage.getItem('profileData')));
  }, [location])

  const handleLogout = () => {
    dispatch({ type: "LOGOUT", });
    navigate('/');
    setUser(null);
  }

  const theme = createTheme({
    palette: {
      purple: {
        main: deepPurple[500],
        contrastText: "#fff",
      },
      red: {
        main: "#de0a26",
        contrastText: "#fff"
      }
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar className={classes.appBar} sx={{ flexDirection: 'row' }} position='static' color='inherit'>
          <div className={classes.brandContainer}>
            <img className={classes.image} src={timeline} alt='timeline' height="50" />
            <Typography component={Link} to="/" className={classes.heading} varient="h2" align="center">Timeline</Typography>
          </div>
          <Toolbar className={classes.toolbar}>
            <Button variant="outlined" component={Link} to="/form" color="primary" style={{ marginRight: "5px" }}>Upload Post</Button>
            {user ? (
              <div className={classes.profile}>
                <Avatar color="purple" alt={user.result.name} src={user.result.picture}>{user.result.name}</Avatar>
                <Typography className={classes.userName} varient="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="red" onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <Button variant="contained" component={Link} to="/auth" color="primary" >Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  )
}

export default Navbar