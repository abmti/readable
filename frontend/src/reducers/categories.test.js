import reducer from './categories'
import * as types from '../utils/ActionTypes'


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

describe('Categories reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({list: []})
    })

    it('should handle CATEGORIES_SEARCHED', () => {
        expect(
            reducer([], {
                type: types.CATEGORIES_SEARCHED,
                categories
            })
        ).toEqual({list: categories})
    })

})