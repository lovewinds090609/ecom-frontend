import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerPagination = ({numberOfPage, totalProducts}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const paramValue = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    const onChangeHandler = (event, value) => {
        params.set("page", value.toString());
        navigate(`${pathname}?${params}`);
    };

    return (
        <div>
            <Pagination 
            count={numberOfPage} 
            page={paramValue}
            defaultPage={1} 
            siblingCount={1} 
            boundaryCount={2} 
            shape="rounded" 
            onChange={onChangeHandler}
            />
            {console.log(numberOfPage, totalProducts)}
        </div>
    )
}

export default CustomerPagination;