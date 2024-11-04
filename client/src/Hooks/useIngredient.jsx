import { useState, useEffect } from 'react';

export const useIngredient = (ingredientToEdit) => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [usedQuantity, setUsedQuantity] = useState('');

    useEffect(() => {
        if (ingredientToEdit) {
            setName(ingredientToEdit.name);
            setQuantity(ingredientToEdit.quantity);
            setPrice(ingredientToEdit.price);
            setUsedQuantity(ingredientToEdit.usedQuantity);
        }
    }, [ingredientToEdit]);

    return { name, setName, quantity, setQuantity, price, setPrice, usedQuantity, setUsedQuantity };
}