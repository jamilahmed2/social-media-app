import React, { useState } from 'react'
import useStyles from './style'
// import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import Icon from './icon'
import LockedOutLinedIcon from '@mui/icons-material/LockOutlined'
import { Paper, Container, Avatar, Typography, Grid, Button } from '@mui/material'
import Input from './Input'
import { useNavigate } from 'react-router-dom';
import { signup, signin } from '../../actions/auth'

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const googleSuccess = async (credentialResponse) => {
    console.log(credentialResponse)
    // console.log(credentialResponse.credential)

    var profileData = jwt_decode(credentialResponse.credential)
    // console.log(profileData)

    const result = profileData;
    const token = credentialResponse?.credential;

    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  const googleFailure = (error) => {
    console.log(error + "Google Sign In was unsuccessful, Try again later!")
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <Container component='main' maxWidth='xs' >
      <Paper className={classes.paper} elevation={3} >
        <Avatar sx={{ backgroundColor: "#9c27b0" }} className={classes.avatar} >
          <LockedOutLinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing="16px">
            {
              isSignup && (
                <>
                  <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                </>
              )}
            <Input name='email' label="Email Address" handleChange={handleChange} type="email" />
            <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
          </Grid>

          <Button sx={{ margin: "5px auto" }} type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin
            // clientId=''
            render={(renderProps) => (
              <Button sx={{ margin: "10px auto" }}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
              >
                <Icon />
                Sign in with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />


          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth