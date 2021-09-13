import Category from '../../models/category';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export function fetchCategories() {
  return async dispatch => {
    let response = await fetch(
      `https://www.api.customer.app.fit.ba/SubCategory/1`,
    );
    let responseData = await response.json();
    let key;
    const womenCategories = [];
    const menCategories = [];

    // 1 -id for women ; 2-id for men
    for (key in responseData) {
      womenCategories.push(
        new Category(responseData[key].id, responseData[key].name),
      );
    }
    response = await fetch(`https://www.api.customer.app.fit.ba/SubCategory/2`);
    responseData = await response.json();

    for (key in responseData) {
      menCategories.push(
        new Category(responseData[key].id, responseData[key].name),
      );
    }

    dispatch({
      type: GET_CATEGORIES,
      categories: [womenCategories, menCategories],
    });
  };
}
