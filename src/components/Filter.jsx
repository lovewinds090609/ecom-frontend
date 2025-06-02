import { InputLabel, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { FaArrowUp, FaSearch, FaArrowDown } from "react-icons/fa";
import { FormControl, Select, MenuItem ,Button} from "@mui/material";
import { FiRefreshCw } from "react-icons/fi";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

const Filter = () => {
    const catregories =[
        {categoryId: 1, categoryName: "Electronics"}, 
        {categoryId: 2, categoryName: "Books"}, 
        {categoryId: 3, categoryName: "Clothing"}, 
        {categoryId: 4, categoryName: "Home & Garden"}, 
        {categoryId: 5, categoryName: "Sports & Outdoors"}, 
        {categoryId: 6, categoryName: "Toys & Games"}, 
        {categoryId: 7, categoryName: "Health & Beauty"}, 
        {categoryId: 8, categoryName: "Automotive"}, 
        {categoryId: 9, categoryName: "Other"}
    ];

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortOrder") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    },[searchParams])

    useEffect(() => {
        const handler = setTimeout(()=>{
            if(searchTerm){
                searchParams.set("keyword",searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`);
        },700);
        return ()=> {clearTimeout(handler);};
    },[searchParams,searchTerm,navigate,pathname])

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if(selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder)=>{
            const newOrder = (prevOrder === "asc") ? "desc" : "asc";
            console.log(newOrder);
            params.set("sortOrder", newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        })
    };
    
    const handleClearFilters = () => {
        navigate({pathname : window.location.pathname});
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input 
                type="text" 
                placeholder="Search Product" 
                className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                ></input>
                <FaSearch className="absolute left-3 text-slate-800 text-lg"></FaSearch>
            </div>

            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl className="text-slate-800 border-slate-700" variant="outlined" size="small">
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select 
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className="min-w-[120px] text-slate-800 border-slate-700"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {catregories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Tooltip title="Sorted by price: ascending">
                    <Button onClick={toggleSortOrder} variant="contained" color="primary"  className="flex items-center gap-2 h-10">
                        Sort By
                        {sortOrder === "asc" ? <FaArrowUp></FaArrowUp> : <FaArrowDown></FaArrowDown>}
                    </Button>
                </Tooltip>

                <button onClick={handleClearFilters} className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer">
                    <FiRefreshCw className="font-semibold" size={16}/>
                    <span className="font-semibold">Clear Filters</span>
                </button>

            </div>
        </div>
    )
}

export default Filter;