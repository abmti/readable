import reducer from './comments'
import {
    COMMENTS_SEARCHED,
    COMMENT_CREATED,
    COMMENT_UPDATED,
    COMMENT_DELETED,
    COMMENT_VOTED,
    OPEN_MODAL_COMMENT,
    CLOSE_MODAL_COMMENT
} from '../utils/ActionTypes'

const timestampFake = Date.now()

const INITIAL_STATE = {
    comment: {},
    modalCommentOpen: false,
    list: []
}

const comment1 = {
    id: 'abcd123456',
    timestamp: timestampFake,
    body: 'Test commment body React',
    author: 'Adriano',
    voteScore: 0,
}

describe('Comments reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
    })


    it('should handle COMMENTS_SEARCHED', () => {
        const comments = [comment1]
        expect(
            reducer({}, {
                type: COMMENTS_SEARCHED,
                comments
            })
        ).toEqual({list: comments})
    })

    it('should handle COMMENT_CREATED', () => {
        const state = { list: [] }
        expect(
            reducer(state, {
                type: COMMENT_CREATED,
                comment: comment1
            })
        ).toEqual({list: [comment1]})
    })

    it('should handle COMMENT_UPDATED', () => {
        const state = { ...INITIAL_STATE, list: [comment1] }
        const commentUpdated = {...comment1, body: "UPDATED"}
        const expectedState = { ...INITIAL_STATE, list: [commentUpdated]}
        expect(
            reducer(state, {
                type: COMMENT_UPDATED,
                comment: commentUpdated
            })
        ).toEqual(expectedState)
    })

    it('should handle COMMENT_VOTED', () => {
        const state = { list: [comment1] }
        const commentVoted = {...comment1, voteScore: 1}
        expect(
            reducer(state, {
                type: COMMENT_VOTED,
                comment: commentVoted
            })
        ).toEqual({list: [commentVoted]})
    })

    it('should handle COMMENT_DELETED', () => {
        const state = { list: [comment1] }
        expect(
            reducer(state, {
                type: COMMENT_DELETED,
                comment: comment1
            })
        ).toEqual({list: []})
    })

    it('should handle COMMENT_DELETED', () => {
        const state = { list: [comment1] }
        expect(
            reducer(state, {
                type: COMMENT_DELETED,
                comment: comment1
            })
        ).toEqual({list: []})
    })

    it('should handle OPEN_MODAL_COMMENT', () => {
        const expectedState = { ...INITIAL_STATE, comment: comment1, modalCommentOpen: true}
        expect(
            reducer(INITIAL_STATE, {
                type: OPEN_MODAL_COMMENT,
                comment: comment1
            })
        ).toEqual(expectedState)
    })

    it('should handle CLOSE_MODAL_COMMENT', () => {
        const expectedState = { ...INITIAL_STATE, modalCommentOpen: false}
        expect(
            reducer(INITIAL_STATE, {
                type: CLOSE_MODAL_COMMENT
            })
        ).toEqual(expectedState)
    })


})