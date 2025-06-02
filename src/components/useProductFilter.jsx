import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions";
const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        const params = new URLSearchParams();
        const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
        params.set("pageNumber",currentPage-1);
        const sortOrder = searchParams.get("sortOrder") || "asc";
        const categoryParams = searchParams.get("category") || null;
        const keyword = searchParams.get("keyword") || null;
        params.set("sortBy","productSpecialPrice");
        params.set("sortOrder",sortOrder);
        if(categoryParams){
            params.set("category",categoryParams);
        }
        if(keyword){
            params.set("keyword",keyword);
        }
        const queryString = params.toString();
        console.log("queryString:",queryString);

        dispatch(fetchProducts(queryString));
    },[dispatch,searchParams])
};

export default useProductFilter;