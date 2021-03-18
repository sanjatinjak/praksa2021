export const getItems = () => fetch(`https://e-commerce.conveyor.cloud/Item`, 
        { 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify({
                    CategoryID: 0,
                    GenderCategoryID: 0,
                    SubCategoryID: 0, 
                    BrandCategoryID: 0,
                    SortTypeID: 0,
                    BranchID: 0
            })
        })   
        .then((response) => response.json())
        .catch((error) => console.error(error));


