import { useState, useEffect } from "react";
import '../../Components/Style.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import axios from "axios";

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
        <div className="container">
            <div className="container-two">
                <h1 className="title">Preço Certo</h1>
                <div className="vendas">
                    <h2 className="titletwo">Vendas</h2>
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="sales-item">
                                <p>{product.name}</p>
                                <p>Quantidade: {product.quantity}</p>
                                <button onClick={() => handleDecrease(index)}>-</button>
                                <button onClick={() => handleIncrease(index)}>+</button>
                                <button onClick={() => handleSale(index)}>Registrar Venda</button>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
                <BottomNavigation/>
            </div>
        </div>
    );
};

export default Vendas;