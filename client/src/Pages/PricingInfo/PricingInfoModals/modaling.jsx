import { useState, useEffect } from 'react';

const ModalIng = ({ onAddIngredient, onClose, ingredientToEdit }) => {
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

    const handleSave = () => {
        onAddIngredient({
            name,
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            usedQuantity: parseFloat(usedQuantity)
        });
    };

    return (
        <div className="t9-1-back">
            <div className='t9-1-modal'>
                <h2>{ingredientToEdit ? 'Editar Ingrediente' : 'Novo Ingrediente'}</h2>
                <div className='t9-1-form'>
                <p className='t9-label'>Nome do Ingrediente:</p>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome do Ingrediente"
                        className='t9-1-input'
                    />
                    <p className='t9-label'>Quantidade Comprada:</p>
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantidade Comprada"
                        className='t9-1-input'
                    />
                    <p className='t9-label'>Preço:</p>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Preço"
                        className='t9-1-input'
                    />
                    <p className='t9-label'>Quantidade Utilizada Por Produto:</p>
                    <input
                        type="text"
                        value={usedQuantity}
                        onChange={(e) => setUsedQuantity(e.target.value)}
                        placeholder="Quantidade Utilizada Por Produto"
                        className='t9-1-input'
                    />
                    <div className='t9-1-button-box'>
                        <button onClick={onClose} className='t9-1-cancel'>Cancelar</button>
                        <button onClick={handleSave} className='t9-1-save'>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalIng;