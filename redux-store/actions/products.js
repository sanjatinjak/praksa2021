import Product from '../../models/product';
import Category from '../../models/category';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_FILTERS = 'GET_PRODUCTS_FILTERS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const GET_FILTERS = 'GET_FILTERS';
export const SEARCH = 'SEARCH';
export const RESET_STATE = 'RESET_STATE';
export const HANDLE_SEARCH = 'HANDLE_SEARCH';

export function fetchProducts() {
  let data = {
    CategoryID: 0,
    GenderCategoryID: 0,
    SubCategoryID: 4,
    BrandCategoryID: 0,
    SortTypeID: 0,
    BranchID: 0,
  };
  return async dispatch => {
    data.GenderCategoryID = 1;
    let response = await fetch('https://www.api.customer.app.fit.ba/Item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let key;
    let responseData = await response.json();
    const loadedProductsWomen = [];
    const loadedProductsMen = [];

    for (key in responseData.items) {
      loadedProductsWomen.push(
        new Product(
          responseData.items[key].id,
          responseData.items[key].serialNumber,
          responseData.items[key].name,
          responseData.items[key].description,
          responseData.items[key].price,
          responseData.items[key].brandCategory,
          responseData.items[key].genderCategory,
          responseData.items[key].subCategory,
          responseData.items[key].image,
        ),
      );
    }

    data.GenderCategoryID = 2;
    response = await fetch('https://www.api.customer.app.fit.ba/Item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    responseData = await response.json();
    for (key in responseData.items) {
      loadedProductsMen.push(
        new Product(
          responseData.items[key].id,
          responseData.items[key].serialNumber,
          responseData.items[key].name,
          responseData.items[key].description,
          responseData.items[key].price,
          responseData.items[key].brandCategory,
          responseData.items[key].genderCategory,
          responseData.items[key].subCategory,
          responseData.items[key].image,
        ),
      );
    }

    dispatch({
      type: GET_PRODUCTS,
      products: [loadedProductsWomen, loadedProductsMen],
    });
  };
}

export function fetchProductsByFilters(genderId, subCategoryId, brandId) {
  const data = {
    CategoryID: 0,
    GenderCategoryID: genderId,
    SubCategoryID: subCategoryId,
    BrandCategoryID: brandId,
    SortTypeID: 0,
    BranchID: 0,
  };
  return async dispatch => {
    const response = await fetch('https://www.api.customer.app.fit.ba/Item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    const loadedProductsByCategory = [];

    for (const key in responseData.items) {
      loadedProductsByCategory.push(
        new Product(
          responseData.items[key].id,
          responseData.items[key].serialNumber,
          responseData.items[key].name,
          responseData.items[key].description,
          responseData.items[key].price,
          responseData.items[key].brandCategory,
          responseData.items[key].genderCategory,
          responseData.items[key].subCategory,
          responseData.items[key].image,
        ),
      );
    }

    dispatch({
      type: GET_PRODUCTS_FILTERS,
      productsByFilters: loadedProductsByCategory,
    });
  };
}

export function fetchProductById(productId) {
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/item?id=${productId}&branchid=1`,
    );
    if (!response.ok) {
      throw new Error('Response is not ok.');
    }
    const product = await response.json();

    dispatch({type: GET_PRODUCT_BY_ID, productById: product});
  };
}

export function fetchFilters() {
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/BrandCategory`,
    );
    if (!response.ok) {
      throw new Error('Response brand category is not ok.');
    }
    const responseData = await response.json();
    const brandCategory = [];

    for (const key in responseData) {
      brandCategory.push(
        new Category(responseData[key].id, responseData[key].name),
      );
    }

    dispatch({type: GET_FILTERS, filters: brandCategory});
  };
}

export function search(query) {
  return async dispatch => {
    const response = await fetch(
      `https://www.api.customer.app.fit.ba/Item/GetBySearch?search=${query}`,
    );

    if (!response.ok) {
      console.warn(`Error with search query`);
    }

    const responseData = await response.json();
    const {items} = responseData;
    const searchItems = [];

    for (const key in items) {
      searchItems.push(
        new Product(
          items[key].id,
          items[key].serialNumber,
          items[key].name,
          items[key].description,
          items[key].price,
          items[key].brandCategory,
          items[key].genderCategory,
          items[key].subCategory,
          items[key].image,
        ),
      );
    }

    dispatch({type: SEARCH, searchItems: searchItems});
  };
}

export const resetState = () => {
  return {type: RESET_STATE, reset: []};
};

export const handleSearch = () => {
  return {type: HANDLE_SEARCH};
};
