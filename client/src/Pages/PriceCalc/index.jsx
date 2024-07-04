import { useState } from 'react';
import '../../Components/Style.css';
import PricingModal from './modal.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PricingDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddProduct = (product) => {
        setProducts([...products, product]);
        setIsModalOpen(false);
    };

    const handleProduct = () => {
        navigate('/pricingInfo');
    }

    return (
        <div className="container">
            <h1 className="title">Preço Certo</h1>
            <div className="product-list">
                {products.map((product, index) => (
                    <div key={index} className="product-item" onClick={handleProduct}>
                        <p>{product.name}</p>
                    </div>
                ))}
                <button className="add-product-button" onClick={() => setIsModalOpen(true)}>
                    + Novo Produto
                </button>
            </div>
            {isModalOpen && <PricingModal onAddProduct={handleAddProduct} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default PricingDashboard;
