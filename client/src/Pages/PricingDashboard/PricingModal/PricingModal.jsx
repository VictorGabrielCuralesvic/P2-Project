import { useState } from 'react';
import axios from 'axios';
import './PricingModal.css';
import { useNavigate } from 'react-router-dom';

const PricingModal = ({ onAddProduct, onclose}) => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');

    const handleSave = () => {
        const newProduct = { name: productName};
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
                <button className='t7-1-cancel'>Cancelar</button>
            </div>
        </div>
    );
};

export default PricingModal;