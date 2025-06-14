import api from "../../api/api"

export const fetchProducts = (queryString) => async(dispatch) => {
    try{
        dispatch({type: "IS_FETCHING"});
        const {data} = await api.get(`/public/products?${queryString}`)
        console.log(data);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            lastPage: data.lastPage,
        });
        dispatch({type: "IS_SUCCESS"});
    } catch(error){
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
        });
    }
}

export const fetchCategories = () => async(dispatch) => {
    try{
        dispatch({type: "CATEGORY_LOADER"});
        const {data} = await api.get(`/public/categories`)
        console.log(data);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            lastPage: data.lastPage,
        });
        dispatch({type: "IS_ERROR"});
    } catch(error){
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
        });
    }
}