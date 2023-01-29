import React from 'react'
import {Container,AppBar,Typography,Grow,Grid} from '@mui/material';
import timeline from './Images/timeline.png'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './style'

const App = () => {
  const classes = useStyles();
  return (
    <Container maxwidth='lg'>
      <AppBar className={classes.appBar} sx={{ flexDirection: 'row-reverse' }} position='static' color='inherit'>
        <Typography className={classes.heading} varient="h2" align="center">Timeline</Typography>
        <img className={classes.image} src={timeline} alt='timeline' height="50"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App
