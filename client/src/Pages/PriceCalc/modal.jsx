import { useState } from 'react';
import axios from 'axios';
import '../../Components/Style.css';
import { useNavigate } from 'react-router-dom';

const PricingModal = ({ onAddProduct, onclose}) => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');

    const handleSave = () => {
        const newProduct = { name: productName};
        onAddProduct(newProduct);
    };


    return (
        <div className='modal-overlay'>
            <div className="modal">
                <h2>Novo Produto</h2>
                <input type="text" placeholder="Nome do Produto" value={productName} onChange={(e) => setProductName(e.target.value)} />
                <button onClick={handleSave}>Salvar</button>
                <button>Cancelar</button>
            </div>
        </div>
    );
};

export default PricingModal;