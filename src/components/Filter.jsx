import { InputLabel, Tooltip } from "@mui/material";
import { useState } from "react";
import { FaArrowUp, FaSearch } from "react-icons/fa";
import { FormControl, Select, MenuItem ,Button} from "@mui/material";
import { FiRefreshCw } from "react-icons/fi";

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

    const [category, setCategory] = useState("all");

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input type="text" placeholder="Search Product" className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"></input>
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
                    <Button variant="contained" color="primary"  className="flex items-center gap-2 h-10">
                        Sort By
                        <FaArrowUp></FaArrowUp>
                    </Button>
                </Tooltip>

                <button className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer">
                    <FiRefreshCw className="font-semibold" size={16}/>
                    <span className="font-semibold">Clear Filters</span>
                </button>

            </div>
        </div>
    )
}

export default Filter;