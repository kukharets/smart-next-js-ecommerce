"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../state/products';
import type { RootState } from '../state/store';

const Page = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.items);
    const productStatus = useSelector((state: RootState) => state.products.status);
    console.warn('111')
    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    useEffect(() => {
        if (productStatus === 'succeeded') {
            console.log(products);  // Виводимо продукти в консоль
        }
    }, [productStatus, products]);

    return (
        <div>
            <h1>Product List</h1>
        </div>
    );
};



export default Page;
