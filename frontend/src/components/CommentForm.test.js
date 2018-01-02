import React from 'react'
import {shallow} from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import CommentForm from './CommentForm'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

function setup() {
    const store = mockStore({
        comment: {},
        modalCommentOpen: false,
        list: []
    })
    const context = { store };
    const enzymeWrapper = shallow(<CommentForm />, { context })
    return {
        enzymeWrapper
    }
}


describe('CategoriaList', () => {

    it('should render self', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper)
    })

})

