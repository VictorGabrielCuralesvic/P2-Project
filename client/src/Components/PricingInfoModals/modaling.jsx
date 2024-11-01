import React from 'react';
import { useIngredient } from '../../Hooks/useIngredient';

const ModalIng = ({ onAddIngredient, onClose, ingredientToEdit }) => {
    const {
        name, setName, quantity, setQuantity, price, setPrice, usedQuantity, setUsedQuantity, handleSave
    } = useIngredient(ingredientToEdit);
    

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
                        <button onClick={() => handleSave(onAddIngredient)} className='t9-1-save'>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalIng;