import { CREATE, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, UPDATE, LIKE, DELETE, COMMENT } from "../constants/actionTypes"
import * as api from '../api/index'

// if action creators are async then we have to use redux thunk which means we have a function which returns async fuction with dispatch


// Fetching 
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: { post: data } });
    } catch (error) {
        console.log(error);
    }
};

// Fetching 
export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
}

// Search Post
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};


// creating a post
export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // getting data
        const { data } = await api.createPost(post)
        navigate(`/posts/${data._id}`)
        // console.log(data);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
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
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error)
    }
}
// Comment
export const commentPost = (value, id) => async (dispatch) => {
    try {
        // api call
        const { data } = await api.comment(value, id)

        dispatch({ type: COMMENT, payload: data })
        return data.comments
    } catch (error) {
        console.log(error)
    }
}

