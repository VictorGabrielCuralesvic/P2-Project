import { useEffect, useState } from 'react';
import './PricingDashboard.css';
import PricingModal from './PricingModal/PricingModal.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header.jsx';
import { FaPlus } from 'react-icons/fa';

const PricingDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddProduct = (product) => {
        setProducts([...products, product]);
        setIsModalOpen(false);
    };

    const handleProduct = () => {
        navigate('/pricingInfo');
    }

    return (
        <div className="t7">
            <Header/>
            <div className='t7-bottom'>
                <h1 className='t7-title'>Produtos</h1>
                <div>
                    <button className='t7-button' onClick={() => setIsModalOpen(true)}>
                        <FaPlus /><h3 className='t7-title-2'>Novo Produto</h3>
                    </button>
                    <div className='t7-produit-box'>
                        {products.map((product, index) => (
                            <div className='t7-produit' key={index} onClick={handleProduct}>
                                <h3 className='t7-title-3'>{product.productName}</h3>
                                {product.suggestedPrice && <p>{product.suggestedPrice}</p>}
                            </div>
                        ))}
                    </div>
                </div>
                {isModalOpen && <PricingModal onAddProduct={handleAddProduct} onClose={() => setIsModalOpen(false)} />}
            </div>
        </div>
    );
};

export default PricingDashboard;
