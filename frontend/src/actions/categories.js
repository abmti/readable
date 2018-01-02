
import { CATEGORIES_SEARCHED } from '../utils/ActionTypes'
import * as CategoriesApi from '../utils/CategoriesAPI';

export const search = () => {
    return (dispatch) => {
        return CategoriesApi.getAll()
            .then((categories) => dispatch({type: CATEGORIES_SEARCHED, categories}))
    }
}