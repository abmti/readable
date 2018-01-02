import {
    POSTS_SEARCHED,
    POST_LOADED,
    POST_VOTED,
    POST_DELETED
} from '../utils/ActionTypes'

const INITIAL_STATE = {
    post:
        {
            id: '',
            timestamp: undefined,
            title: '',
            body: '',
            author: '',
            category: 'react',
            voteScore: 0,
        },
    list: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case POSTS_SEARCHED:
            return { ...state, list: action.posts }
        case POST_LOADED:
            return { ...state, post: action.post }
        case POST_VOTED:
            const newList = state.list.map((p) => {
                if (p.id === action.post.id) {
                    return action.post;
                }
                return p
            })
            return { ...state, post: action.post, list: newList }
        case POST_DELETED:
            return { ...state, list: state.list.filter((p) => p.id !== action.post.id) }
        default:
            return state
    }
}