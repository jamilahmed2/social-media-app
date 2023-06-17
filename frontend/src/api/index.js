import axios from 'axios'

const API = axios.create({ baseURL: 'https://plum-weak-bluefish.cyclic.app' });
// const API = axios.create({ baseURL: 'http://localhost:5000' || 'https://timeline-pro.herokuapp.com' });

// without interceptors middleware will not work
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profileData")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profileData')).token}`;
    }
    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);