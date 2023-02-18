import React from 'react'
import { Grid, TextField, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Input = ({ name, handleChange, label, autoFocus, type, half, handleShowPassword }) => {
  return (
    <Grid item xd={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        // If user want see the passowrd
        InputProps={name === "password" ? {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        } : null}
      />
    </Grid>

  )
}

export default Input