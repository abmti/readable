import React from 'react'
import {shallow} from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import PostCard from './PostCard'


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

function setup() {

    const post = {
        id: 'abcd123456',
        timestamp: 1514396283160,
        title: 'Teste React',
        body: 'Test body React',
        author: 'Facebook',
        category: 'react',
        voteScore: 0
    }

    const store = mockStore({})
    const context = { store };

    const props = {
        post: post,
        showBtnReadMore: true
    }

    const enzymeWrapper = shallow(<PostCard {...props} />, { context })

    return {
        props,
        enzymeWrapper
    }

}


describe('PostCard', () => {

    it('should render self', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper)
    })

})

