import { useState, useEffect } from "react";
import './vendas.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import axios from "axios";
import Header from "../../Components/Header/Header";

const Vendas = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProductName, setNewProductName] = useState("");
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchProducts = async () => {
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

        const fetchTotalRevenueByDate = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/total-revenue-by-date`, {
                    params: { date: selectedDate },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setTotalRevenue(response.data.totalRevenue);
            } catch (error) {
                console.error('Error fetching total revenue:', error);
                alert('Failed to fetch total revenue.');
            }
        };

        fetchProducts();
        fetchTotalRevenueByDate();
    }, [selectedDate]);

    /* const handleIncrease = (index) => {
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
    }; */

    const handleQuantityChange = (index, newQuantity) => {
        const newProducts = [...products];
        newProducts[index].quantity = newQuantity >= 0 ? newQuantity : 0;
        setProducts(newProducts);
    };

    const handleSale = async (index) => {
        const product = products[index];
        const saleData = {
            priceCalculationId: product.id,
            quantity: product.quantity,
            date: new Date().toISOString()
        };

        console.log("Dados", saleData);

        try {
            const response = await axios.post('http://localhost:5000/register-sale', saleData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 201) {
                alert('Sale registered successfully');
                setTotalRevenue(prevTotal => prevTotal + (product.suggestedPrice * product.quantity));
                setProducts(products.map((p, i) => i === index ? { ...p, quantity: 0 } : p));
            } else {
                alert('Failed to register sale');
            }
        } catch (error) {
            console.error('Error registering sale:', error);
            alert('Error registering sale.');
        }
    };

    const handleNewSale = () => {
        setShowModal(true);
    };

    const handleAddNewProduct = () => {
        if (newProductName.trim() !== "") {
            const newProduct = { name: newProductName, quantity: 0, id: products.length + 1 };
            setProducts([...products, newProduct]);
            setShowModal(false);
            setNewProductName("");
        } else {
            alert("Please enter a product name");
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div className="t13">
            <Header />
            <div className="t13-bottom">
                <h1 className="t13-title">Vendas</h1>
                <div className="t13-total-revenue">
                    <h2>Total Arrecadado em {selectedDate}: R${totalRevenue.toFixed(2)}</h2>
                </div>
                <div className="t13-date-picker">
                    <label>Data:</label>
                    <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={handleDateChange} 
                    />
                </div>
                <div className="t13-vendas">
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="t13-sales-item">
                                <p>{product.productName}</p>
                                <p>Quantidade: {product.quantity}</p>
                                <div className="t13-quantity-control">
                                    {/* <button onClick={() => handleDecrease(index)}>-</button>
                                    <button onClick={() => handleIncrease(index)}>+</button> */}
                                    <input 
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                                        min="0"
                                        className="t13-input-quantity"
                                    />
                                    <button onClick={() => handleSale(index)} className="register-button">V</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhuma venda disponível.</p>
                    )}
                    <button className="t13-new-sale-button" onClick={handleNewSale}>Nova Venda</button>
                </div>
                <BottomNavigation />
            </div>

            {showModal && (
                <div className="t13-modal">
                    <div className="t13-modal-content">
                        <h2>Adicionar Novo Produto</h2>
                        <input 
                            type="text" 
                            value={newProductName} 
                            onChange={(e) => setNewProductName(e.target.value)} 
                            placeholder="Nome do Produto" 
                        />
                        <button onClick={handleAddNewProduct}>Adicionar</button>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Vendas;
