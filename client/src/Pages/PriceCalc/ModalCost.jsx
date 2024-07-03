import { useState } from 'react';

const ModalCost = ({ onSave, onClose }) => {
    const [quantity, setQuantity] = useState('');

    const handleSave = () => {
        onSave(quantity);
    };

    return (
        <div className="modal">
            <h2>Quantidade Produzida</h2>
            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantidade Produzida" />
            <button onClick={handleSave}>Salvar</button>
            <button onClick={onClose}>Cancelar</button>
        </div>
    );
};

export default ModalCost;
