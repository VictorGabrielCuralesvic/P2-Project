import { useState, useEffect } from "react";
import './vendas.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import axios from "axios";
import Header from "../../Components/Header/Header";

const Vendas = () =>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:5000/products', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                alert('Failed to fetch products.');
            }
        };
        fetchProducts();
    }, []);

    const handleIncrease = (index) => {
        const newProducts = [...products];
        newProducts[index].quantity += 1;
        setProducts(newProducts);
    };

    const handleDecrease = (index) => {
        const newProducts = [...products];
        if (newProducts[index].quantity > 0) {
            newProducts[index].quantity -= 1;
        }
        setProducts(newProducts);
    };

    const handleSale = async (index) => {
        const product = products[index];
        const saleData = {
            priceCalculationId: product.id,
            quantity: product.quantity,
            date: new Date().toISOString()
        };

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5000/register-sale', saleData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 201) {
                alert('Sale registered successfully');
            } else {
                alert('Failed to register sale');
            }
        } catch (error) {
            console.error('Error registering sale:', error);
            alert('Error registering sale.');
        }
    };

    return (
        <div className="t13">
            <Header/>
        <div className="t13-bottom">
        <h1 className="t13-title">Vendas</h1>
            <div className="t13-vendas">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className="t13-sales-item">
                            <p>{product.name}</p>
                            <p>Quantidade: {product.quantity}</p>
                            <button onClick={() => handleDecrease(index)}>-</button>
                            <button onClick={() => handleIncrease(index)}>+</button>
                            <button className="register-button" onClick={() => handleSale(index)}>Registrar Venda</button>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
            <BottomNavigation />
        </div>
    </div>
    );
};

export default Vendas;