
import { initialize } from 'redux-form'

import { COMMENTS_SEARCHED, COMMENT_CREATED, COMMENT_UPDATED, COMMENT_DELETED, COMMENT_VOTED, OPEN_MODAL_COMMENT, CLOSE_MODAL_COMMENT } from '../utils/ActionTypes'
import * as CommentsApi from '../utils/CommentsAPI';

export const searchByPost = (postId) => {
    return (dispatch) => {
        return CommentsApi.searchByPost(postId)
            .then((comments) => dispatch({type: COMMENTS_SEARCHED, comments}))
    }
}

export const create = (values, postId) => {
    const uuidv1 = require('uuid/v1');
    const newValues = {...values, id: uuidv1(), timestamp: Date.now(), parentId: postId}
    return (dispatch) => {
        return CommentsApi.create(newValues)
            .then((comment) => dispatch(created(comment)))
    }
}

export const created = (comment) => {
    return {
        type: COMMENT_CREATED,
        comment
    }
}

export const update = (values) => {
    return (dispatch) => {
        return CommentsApi.update(values)
            .then((comment) => dispatch([updated(comment), closeModalComment()]))
    }
}

export const updated = (comment) => {
    return {
        type: COMMENT_UPDATED,
        comment
    }
}

export const remove = (id) => {
    return (dispatch) => {
        return CommentsApi.remove(id)
            .then((comment) => dispatch(removed(comment)))
    }
}

export const removed = (comment) => {
    return {
        type: COMMENT_DELETED,
        comment
    }
}

export const vote = (comment, vote) => {
    return (dispatch) => {
        return CommentsApi.vote(comment, vote)
            .then((comment) => dispatch({type: COMMENT_VOTED, comment}))
    }
}


export const openModalComment = (comment) => {
    return [
        initialize('commmentFormModal', comment),
        {
            type: OPEN_MODAL_COMMENT,
            comment
        }
    ]
}

export const closeModalComment = () => {
    return {
        type: CLOSE_MODAL_COMMENT
    }
}