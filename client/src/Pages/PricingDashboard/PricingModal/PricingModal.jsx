import { useState } from 'react';
import './PricingModal.css';
import axios from 'axios';

const PricingModal = ({ onAddProduct, onClose }) => {
    const [productName, setProductName] = useState('');

    const handleSave = async () => {
        const newProduct = { productName, suggestedPrice: null };
        onAddProduct(newProduct);
    };

    return (
        <div className='t7-1-back'>
            <div className="t7-1-modal">
                <h3>Novo Produto</h3>
                <input
                    type="text"
                    className='t7-1-input'
                    placeholder="Nome do Produto"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <button className='t7-1-save' onClick={handleSave}>Salvar</button>
                <button className='t7-1-cancel' onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default PricingModal;
