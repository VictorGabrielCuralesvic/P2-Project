import { useState } from 'react';

const ProfitMarginModal = ({ onSave, onClose }) => {
    const [margin, setMargin] = useState('');

    const handleSave = () => {
        onSave(margin);
    };

    return (
        <div className="modal">
            <h2>Margem De Lucro</h2>
            <input type="text" value={margin} onChange={(e) => setMargin(e.target.value)} placeholder="Margem De Lucro" />
            <button onClick={handleSave}>Salvar</button>
            <button onClick={onClose}>Cancelar</button>
        </div>
    );
};

export default ProfitMarginModal;
