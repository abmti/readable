import {
    COMMENTS_SEARCHED,
    COMMENT_CREATED,
    COMMENT_UPDATED,
    COMMENT_DELETED,
    COMMENT_VOTED,
    OPEN_MODAL_COMMENT,
    CLOSE_MODAL_COMMENT
} from '../utils/ActionTypes'

const INITIAL_STATE = {
    comment: {},
    modalCommentOpen: false,
    list: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case COMMENTS_SEARCHED:
            return { ...state, list: action.comments }
        case COMMENT_CREATED:
            return { ...state, list: state.list.concat([action.comment]) }
        case COMMENT_UPDATED:
        case COMMENT_VOTED:
            const newList = state.list.map((c) => {
                if (c.id === action.comment.id) {
                    return action.comment;
                }
                return c
            })
            return { ...state, list: newList }
        case COMMENT_DELETED:
            return { ...state, list: state.list.filter((c) => c.id !== action.comment.id) }
        case OPEN_MODAL_COMMENT:
            return { ...state, comment: action.comment, modalCommentOpen: true }
        case CLOSE_MODAL_COMMENT:
            return { ...state, comment: {}, modalCommentOpen: false }
        default:
            return state
    }
}