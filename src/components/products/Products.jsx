import ProductCard from '../shared/ProductCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/actions';
import { useEffect } from 'react';
import Filter from './Filter';
import useProductFilter from '../hooks/useProductFilter';
import Loader from '../shared/Loader';
import CustomerPagination from '../shared/Pagination';

const Products = () =>{
    const {isLoading, errorMessage} = useSelector((state) => state.errors);
    const {products,categories,productPagination,categoryPagination} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useProductFilter();
    useEffect(() => {dispatch(fetchCategories())},[dispatch]);
    return(
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:ms-auto">
            <Filter categories={categories ? categories : []}/>
            {isLoading ? (
                <Loader />
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-[200px]">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                    <span className="text-slate-800 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
            ) : (
                <div className="min-h-[700px]">
                    <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                        {products && 
                        products.map((item, i) => <ProductCard key={i} {...item} />
                        )}
                    </div>
                    <div className="flex justify-center items-center pt-10">
                        <CustomerPagination 
                            numberOfPage={productPagination?.totalPages}
                            totalProducts={productPagination?.totalElements}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products;