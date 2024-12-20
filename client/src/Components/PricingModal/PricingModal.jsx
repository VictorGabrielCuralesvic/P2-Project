import React from 'react';
import './PricingModal.css';
import { useProduct } from '../../Hooks/useProduct';

const PricingModal = ({ onAddProduct, onClose }) => {
    const { productName, setProductName } = useProduct();

    const handleSave = (onAddProduct) => {
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
                <div className='t7-1-button-box'>
                    <button className='t7-1-cancel' onClick={onClose}>Cancelar</button>
                    <button className='t7-1-save' onClick={() => handleSave(onAddProduct)}>Salvar</button>
                </div>
                
                
            </div>
        </div>
    );
};

export default PricingModal;
