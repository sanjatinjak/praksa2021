import { GET_CATEGORIES } from '../actions/category';

const initialState = {
    loadedCategories: [],
    loading: true
};

export default  (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state, loadedCategories: action.categories, loading: false
            }
        default: {
            return state;
        }
    }
}