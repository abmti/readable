
import { push } from 'react-router-redux'
import { initialize } from 'redux-form'

import { POSTS_SEARCHED, POST_LOADED, POST_CREATED, POST_UPDATED, POST_DELETED, POST_VOTED } from '../utils/ActionTypes'
import * as PostsApi from '../utils/PostsAPI';

export const search = () => {
    return (dispatch) => {
        return PostsApi.getAll()
            .then((posts) => dispatch({type: POSTS_SEARCHED, posts}))
    }
}

export const searchPostsByCategory = (category) => {
    return (dispatch) => {
        return PostsApi.searchPostsByCategory(category)
            .then((posts) => dispatch({type: POSTS_SEARCHED, posts}))
    }
}

export const load = (id) => {
    return (dispatch) => {
        return PostsApi.get(id).then((post) => dispatch({type: POST_LOADED, post}))
    }
}

export const create = (values) => {
    const uuidv1 = require('uuid/v1');
    return (dispatch) => {
        return PostsApi.create({...values, id: uuidv1(), timestamp: Date.now()})
            .then((post) => dispatch(created(post)))
    }
}

export const created = (post) => {
    return {
        type: POST_CREATED,
        post
    }
}

export const edit = (id) => {
    return (dispatch) => {
        return PostsApi.get(id)
            .then((post) => dispatch([initialize('postForm', post), {type: POST_LOADED, payload: post}]))
    }
}


export const update = (values) => {
    return (dispatch) => {
        return PostsApi.update(values)
            .then((post) => dispatch([updated(post), push(`/posts/${post.id}`)]))
    }
}

export const updated = (post) => {
    return {
        type: POST_UPDATED,
        post
    }
}

export const remove = (id, redirect) => {
    return (dispatch) => {
        return PostsApi.remove(id)
            .then((post) => {
                let arr = [removed(post)]
                if(redirect) {
                    arr.push(push(`/`))
                }
                dispatch(arr)
            })
    }
}

export const removed = (post) => {
    return {
        type: POST_DELETED,
        post
    }
}

export const vote = (post, vote) => {
    return (dispatch) => {
        return PostsApi.vote(post, vote)
            .then((post) => dispatch({type: POST_VOTED, post}))
    }
}