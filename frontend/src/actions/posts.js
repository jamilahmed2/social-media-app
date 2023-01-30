import * as api from '../api'

// Action Creators
export const getPosts = () => async (dispatch) => {

    try {
        // Fetching all data from api
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}