import { CATEGORIES_SEARCHED } from '../utils/ActionTypes'

const INITIAL_STATE = {
    list: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CATEGORIES_SEARCHED:
            //console.debug('REDUCER')
            //console.debug(action.categories)
            return { ...state, list: action.categories }
        default:
            return state
    }
}