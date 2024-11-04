import { useState } from 'react';

export const useProduct = () => {
    const [productName, setProductName] = useState('');

    return { productName, setProductName}
};