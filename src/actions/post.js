import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

const url = process.env.REACT_APP_BACKEND_URL;

//GET Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/api/posts`);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`${url}/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`${url}/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Delete Post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`${url}/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Add Post
export const addPost = formData => async dispatch => {
  try {
    const res = await axios.post(`${url}/api/posts`, formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//GET Post (Discussion)
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`${url}/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Add Comment
export const addComment = (postId, formData) => async dispatch => {
  try {
    const res = await axios.post(
      `${url}/api/posts/comment/${postId}`,
      formData
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Remove Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`${url}/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
