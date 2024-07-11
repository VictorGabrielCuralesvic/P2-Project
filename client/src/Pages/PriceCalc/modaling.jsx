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
        <div className="modal">
            <h2>Novo Ingrediente</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do Ingrediente" />
            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantidade Comprada" />
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" />
            <input type="text" value={usedQuantity} onChange={(e) => setUsedQuantity(e.target.value)} placeholder="Quantidade Utilizada Por Produto" />
            <button onClick={handleSave}>Salvar</button>
            <button onClick={onClose}>Cancelar</button>
        </div>
    );
};

export default ModalIng;