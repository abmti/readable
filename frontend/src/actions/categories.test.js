import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import { api, headers} from '../utils/Api'
import { CATEGORIES_SEARCHED } from '../utils/ActionTypes'
import * as actions from './categories';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const categories = [
    {
        name: 'react',
        path: 'react'
    },
    {
        name: 'redux',
        path: 'redux'
    },
    {
        name: 'udacity',
        path: 'udacity'
    }
]


describe('Categories Actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates CATEGORIES_SEARCHED when fetching categories has been done', () => {

        fetchMock.once('end:/categories', {body: {categories: categories}, headers })

        const expectedActions = [{ type: CATEGORIES_SEARCHED, categories }]
        const store = mockStore({ categories: [] })

        return store.dispatch(actions.search()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})