import React from 'react'
import {shallow} from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import CommentList from './CommentList'


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

function setup() {
    const postId = 'abcd123456'
    const store = mockStore({
        comment: {},
        modalCommentOpen: false,
        list: []
    })
    const context = { store };
    const enzymeWrapper = shallow(<CommentList postId={postId} />, { context })
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

