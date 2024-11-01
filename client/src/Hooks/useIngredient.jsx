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

    const handleSave = (onAddIngredient) => {
        onAddIngredient({
            name,
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            usedQuantity: parseFloat(usedQuantity)
        });
    };

    return { name, setName, quantity, setQuantity, price, setPrice, usedQuantity, setUsedQuantity, handleSave };
}