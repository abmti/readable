import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import fetchMock from 'fetch-mock'

import { api, headers} from '../utils/Api'
import {
    COMMENTS_SEARCHED, COMMENT_CREATED, COMMENT_UPDATED, COMMENT_DELETED, COMMENT_VOTED,
    CLOSE_MODAL_COMMENT
} from '../utils/ActionTypes'
import * as actions from './comments'

const middlewares = [multi, thunk]
const mockStore = configureStore(middlewares)

const comments1 = {
    id: 'abcd654321',
    timestamp: 1514396283160,
    body: 'Test comment new body React',
    author: 'Adriano',
    voteScore: 0,
    parentId: 'abcd123456'
}

const comments2 = {
    id: 'abcd7777777',
    timestamp: 1514396283160,
    body: 'Test comment body react',
    author: 'Adriano',
    voteScore: 0,
    parentId: 'abcd123456'
}

const comments = [comments1, comments2]


describe('Comments Actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates COMMENTS_SEARCHED when fetching comments has been done', () => {

        fetchMock.once('end:/posts/abcd123456/comments', {body: comments, headers })

        const expectedActions = [{ type: COMMENTS_SEARCHED, comments }]
        const store = mockStore({ comments: [] })

        return store.dispatch(actions.searchByPost('abcd123456')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    it('creates COMMENT_CREATED when fetching comment has been done', () => {

        fetchMock.once('end:/comments', {body: comments1, headers })

        const expectedActions = [{ type: COMMENT_CREATED, comment: comments1 }]
        const store = mockStore({ comments: [] })

        return store.dispatch(actions.create(comments1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates COMMENT_UPDATED when fetching comment has been done', () => {

        const commentUpdated = { ...comments1, body: "UPDATED"}
        const expectedActions = [{ type: COMMENT_UPDATED, comment: commentUpdated }, { type: CLOSE_MODAL_COMMENT }]
        const store = mockStore({ comments: [] })

        fetchMock.once('end:/comments/abcd654321', {body: commentUpdated, headers })

        return store.dispatch(actions.update(commentUpdated)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates COMMENT_DELETED when fetching comment has been done', () => {

        fetchMock.once('end:/comments/abcd654321', {body: comments1, headers })

        const expectedActions = [{ type: COMMENT_DELETED, comment: comments1 }]
        const store = mockStore({ comments: [] })

        return store.dispatch(actions.remove(comments1.id, false)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    it('creates COMMENT_VOTED when fetching comment has been done', () => {

        const commentVoted = { ...comments1, voteScore: 1}
        const expectedActions = [{ type: COMMENT_VOTED, comment: commentVoted }]
        const store = mockStore({ comments: [] })

        fetchMock.once('end:/comments/abcd654321', {body: commentVoted, headers })

        return store.dispatch(actions.vote(comments1, 'upVote')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


})