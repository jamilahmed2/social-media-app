import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  paper: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px',
  },
  root: {
    '& .MuiTextField-root': {
      margin: '8px',
    },
  },
  avatar: {
    margin: '8px',
    backgroundColor: "#9c27b0",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '16px',
  },
  submit: {
    margin: '12px 8px',
  },
}));