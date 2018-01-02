import React from 'react'
import {shallow} from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import CategoriaList from './CategoriaList'
import CommentForm from './CommentForm'
import CommentFormModal from './CommentFormModal'
import CommentList from './CommentList'
import PostCard from './PostCard'
import PostList from './PostList'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

function setup() {
    const store = mockStore({ category: {list: []} })
    const context = { store };
    const enzymeWrapper = shallow(<CategoriaList />, { context })
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

