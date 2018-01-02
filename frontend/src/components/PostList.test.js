import React from 'react'
import {shallow} from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import PostList from './PostList'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

function setup() {
    const store = mockStore({ post: {list: []} })
    const context = { store };
    const enzymeWrapper = shallow(<PostList />, { context })
    return {
        enzymeWrapper
    }
}


describe('PostList', () => {

    it('should render self', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper)
    })

})

