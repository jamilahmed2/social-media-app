import { AUTH } from "../constants/actionTypes"
import * as api from '../api/index'

// if action creators are async then we have to use redux thunk which means we have a fuction which returns async fuction with dispatch

// log in the user
export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

// signup the user
export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
