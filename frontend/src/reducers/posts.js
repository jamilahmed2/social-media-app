import { CREATE, FETCH_ALL, FETCH_BY_SEARCH, UPDATE, DELETE } from "../constants/actionTypes"

export default (posts = [], action) => {
    switch (action.type) {
        case CREATE:
            return [...posts, action.payload];
        case FETCH_ALL:
            return action.payload;
        case FETCH_BY_SEARCH:
            return action.payload;
        case UPDATE:
            return posts.map((post) => post.id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts
    }
};