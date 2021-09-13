import {
  GET_PRODUCTS,
  GET_PRODUCTS_FILTERS,
  GET_PRODUCT_BY_ID,
  GET_FILTERS,
  SEARCH,
  RESET_STATE,
  HANDLE_SEARCH
} from '../actions/products';

const initialState = {
  products: [],
  productsByFilters: [],
  productById: {},
  filters: [],
  searchResult: [],
  loadingProducts: true,
  loadingProductFilters: true,
  loadingProductById: true,
  loadingSearch: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        loadingProducts: false,
      };
    case GET_PRODUCTS_FILTERS:
      return {
        ...state,
        productsByFilters: action.productsByFilters,
        loadingProductFilters: false,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productById: action.productById,
        loadingProductById: false,
      };
    case GET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    case HANDLE_SEARCH:
      return {...state, loadingSearch:true}
    case SEARCH:
      return {...state, searchResult: action.searchItems, loadingSearch: false};
    case RESET_STATE:
      return {...state, searchResult: action.reset, loadingSearch: false};
    default: {
      return state;
    }
  }
};
