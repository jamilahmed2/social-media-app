import { CREATE, FETCH_ALL, FETCH_BY_SEARCH, UPDATE, DELETE } from "../constants/actionTypes"
import * as api from '../api/index'

// if action creators are async then we have to use redux thunk which means we have a function which returns async fuction with dispatch

// creating a post
export const createPost = (post) => async (dispatch) => {
    try {
        // getting data
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

// Fetching 
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error)
    }
}

// Deleting
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

// editng/updating uploaded post
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

// Liking
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

// Search Post
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error)
    }
}