import reducer from './posts'
import {
    POSTS_SEARCHED,
    POST_LOADED,
    POST_VOTED,
    POST_DELETED,
    UPDATE_SORT_ATTRIBUTE
} from '../utils/ActionTypes'

const timestampFake = 1514396283160

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
    list: [],
    sortAttribute: '-voteScore'
}

const posts1 = {
    id: 'abcd123456',
    timestamp: timestampFake,
    title: 'Teste React',
    body: 'Test body React',
    author: 'Facebook',
    category: 'react',
    voteScore: 0,
}

const posts2 = {
    id: 'abcd9999999',
    timestamp: timestampFake,
    title: 'Teste Redux',
    body: 'Test body Redux',
    author: 'Redux',
    category: 'redux',
    voteScore: 0,
}


describe('Posts reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
    })


    it('should handle POSTS_SEARCHED', () => {
        const posts = [posts1, posts2]
        expect(
            reducer({}, {
                type: POSTS_SEARCHED,
                posts
            })
        ).toEqual({list: posts})
    })

    it('should handle POST_LOADED', () => {
        expect(
            reducer({}, {
                type: POST_LOADED,
                post: posts1
            })
        ).toEqual({post: posts1})
    })

    it('should handle POST_VOTED', () => {
        const state = { ...INITIAL_STATE, list: [posts1] }
        const postVoted = {...posts1, voteScore: 1}
        const expectedState = { ...INITIAL_STATE, post: postVoted, list: [postVoted] }
        expect(
            reducer(state, {
                type: POST_VOTED,
                post: postVoted
            })
        ).toEqual(expectedState)
    })

    it('should handle POST_DELETED', () => {
        const state = { list: [posts1] }
        expect(
            reducer(state, {
                type: POST_DELETED,
                post: posts1
            })
        ).toEqual({list: []})
    })

    it('should handle UPDATE_SORT_ATTRIBUTE', () => {
        const sortAttribute = 'voteScore'
        const expectedState = { ...INITIAL_STATE, sortAttribute }
        expect(
            reducer(INITIAL_STATE, {
                type: UPDATE_SORT_ATTRIBUTE

                ,
                sortAttribute
            })
        ).toEqual(expectedState)
    })

})