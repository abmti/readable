import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import category from './categories'
import post from './posts'
import comment from './comments'

export default combineReducers({
    router: routerReducer,
    form: formReducer,
    category,
    post,
    comment
})