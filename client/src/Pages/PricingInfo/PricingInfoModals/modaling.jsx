import { useState } from 'react';

const ModalIng = ({ onAddIngredient, onClose}) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [usedQuantity, setUsedQuantity] = useState('');

    const handleSave = () => {
        onAddIngredient({ name, quantity, price, usedQuantity });
    };
    return (
        <div className="t9-1-back">
            <div className='t9-1-modal'>
                <h2>Novo Ingrediente</h2>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) =>
                    setName(e.target.value)}
                    placeholder="Nome do Ingrediente"
                    className='t9-1-input'
                />
                <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantidade Comprada"
                    className='t9-1-input'
                />
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Preço"
                    className='t9-1-input'
                />
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
    );
};

export default ModalIng;