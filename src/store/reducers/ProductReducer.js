const initialState = {
    products: null,
    productPagination: {},
    categories: null,
    categoryPagination: {},
};

export const ProductReducer = (state = initialState, action) => {
    switch(action.type){
        case "FETCH_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                productPagination: {
                    ...state.productPagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalPages: action.totalPages,
                    totalElements: action.totalElements,
                    lastPage: action.lastPage,
                },
            };
        case "FETCH_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                categoryPagination: {
                    ...state.categoryPagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalPages: action.totalPages,
                    totalElements: action.totalElements,
                    lastPage: action.lastPage,
                },
            };


        default:
            return state;
    }
};
