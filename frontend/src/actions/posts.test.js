import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import fetchMock from 'fetch-mock'

import { api, headers} from '../utils/Api'
import {POSTS_SEARCHED, POST_CREATED, POST_LOADED, POST_UPDATED, POST_DELETED, POST_VOTED} from '../utils/ActionTypes'
import * as actions from './posts'

const middlewares = [multi, thunk]
const mockStore = configureStore(middlewares)

const posts1 = {
    id: 'abcd123456',
    timestamp: 1514396283160,
    title: 'Teste React',
    body: 'Test body React',
    author: 'Facebook',
    category: 'react',
    voteScore: 0,
}

const posts2 = {
    id: 'abcd9999999',
    timestamp: 1514396283160,
    title: 'Teste Redux',
    body: 'Test body Redux',
    author: 'Redux',
    category: 'redux',
    voteScore: 0,
}

const posts = [posts1, posts2]


describe('Post Actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates POSTS_SEARCHED when fetching posts has been done', () => {

        fetchMock.once('end:/posts', {body: posts, headers })

        const expectedActions = [{ type: POSTS_SEARCHED, posts }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.search()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates POSTS_SEARCHED when fetching posts by category has been done', () => {

        fetchMock.once('end:/posts', {body: [posts1], headers })

        const expectedActions = [{ type: POSTS_SEARCHED, posts: [posts1] }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.searchPostsByCategory('react')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates POST_LOAD when fetching post has been done', () => {

        fetchMock.once('end:/posts/abcd123456', {body: posts1, headers })

        const expectedActions = [{ type: POST_LOADED, post: posts1 }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.load('abcd123456')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    it('creates POST_CREATED when fetching post has been done', () => {

        fetchMock.once('end:/posts', {body: posts1, headers })

        const expectedActions = [{ type: POST_CREATED, post: posts1 }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.create(posts1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates POST_UPDATED when fetching post has been done', () => {

        const postUpdated = { ...posts1, body: "UPDATED"}
        const expectedActions = [{ type: POST_UPDATED, post: postUpdated }, {"payload": {"args": ["/posts/abcd123456"], "method": "push"}, "type": "@@router/CALL_HISTORY_METHOD"}]
        const store = mockStore({ posts: [] })

        fetchMock.once('end:/posts/abcd123456', {body: postUpdated, headers })

        return store.dispatch(actions.update(postUpdated)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates POST_DELETED when fetching post has been done', () => {

        fetchMock.once('end:/posts/abcd123456', {body: posts1, headers })

        const expectedActions = [{ type: POST_DELETED, post: posts1 }]
        const store = mockStore({ posts: [] })

        return store.dispatch(actions.remove(posts1.id, false)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    it('creates POST_VOTED when fetching post has been done', () => {

        const postVoted = { ...posts1, voteScore: 1}
        const expectedActions = [{ type: POST_VOTED, post: postVoted }]
        const store = mockStore({ posts: [] })

        fetchMock.once('end:/posts/abcd123456', {body: postVoted, headers })

        return store.dispatch(actions.vote(posts1, 'upVote')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


})