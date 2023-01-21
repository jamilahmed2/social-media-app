import React from 'react'
import {Container,AppBar,Typography,Grow,Grid} from '@mui/material';
import timeline from './Images/timeline.jpeg'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
const App = () => {
  return (
    <Container maxwidth='lg'>
      <AppBar position='static' color='inherit'>
        <Typography varient="h2" aling="center">Timeline</Typography>
        <img src={timeline} alt='timeline' height="100"/>
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
