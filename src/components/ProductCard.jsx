import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModel from "./ProductViewModel";

const ProductCard = ({productId, productName, image, description, quantity, price, discount, specialPrice}) =>{
    const [openProductViewModel, setOpenProductViewModel] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const handleProductView = (product) => {
        setOpenProductViewModel(true);
        setSelectedViewProduct(product);
    };
    return(
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView({id: productId, productName, image, description, quantity, price, discount, specialPrice});
            }} className="w-full overflow-hidden aspect-[3/2]">
                <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                src={image} alt={productName}></img>
            </div>
            <div className="p-4">
                <h2 onClick={() => {
                handleProductView({id: productId, productName, image, description, quantity, price, discount, specialPrice});
            }} className="text-lg font-semibold mb-2 cursor-pointer">
                    {productName}
                </h2>
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm text-left">{description}</p>
                </div>
                <div className="flex items-center justify-between text-left">
                {specialPrice ? (<div className="flex flex-col text-left">
                    <span className="text-gray-700 line-through">
                        ${Number(price)}
                    </span>
                    <span className="text-xl font-bold text-red-500">
                        ${Number(specialPrice)}
                    </span>
                </div>) : (
                    <div className="text-left">
                        <span className="block h-4"></span>
                        <span className="text-xl font-bold text-slate-700">
                            {""}
                            ${Number(price)}
                        </span>
                    </div>
                )}
                <button disabled={!isAvailable || btnLoader}
                onClick={() => {}}
                className={`bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"} text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}>
                    <FaShoppingCart className="mr-2" />
                    {isAvailable ? "放入購物車" : "已售完"}
                </button>
                </div>
            </div>
            <ProductViewModel 
            open={openProductViewModel}
            setOpen={setOpenProductViewModel}
            product={selectedViewProduct}
            isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard;