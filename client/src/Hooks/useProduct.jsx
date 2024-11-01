import { useState } from 'react';

export const useProduct = () => {
    const [productName, setProductName] = useState('');

    const handleSave = (onAddProduct) => {
        const newProduct = { productName, suggestedPrice: null };
        onAddProduct(newProduct);
    };

    return { productName, setProductName, handleSave}
};