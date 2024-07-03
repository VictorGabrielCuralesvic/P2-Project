import {useState} from "react";
import './style.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';

const Vendas = () =>{
    const [products, setProducts] = useState('');

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

    return (
        <div className="container">
            <div className="container-two">
               <h1 className="title">Preço Certo</h1>
            <div className="vendas">
                <h2 className="titletwo">Vendas</h2>
                {products.map((product, index) => (
                    <div key={index} className="sales-item">
                        <p>{product.name}</p>
                        <p>Quantidade: {product.quantity}</p>
                        <button onClick={() => handleDecrease(index)}>-</button>
                        <button onClick={() => handleIncrease(index)}>+</button>
                    </div>
                ))};
            </div>
            <BottomNavigation/>  
            </div>
        </div>
    );
};

export default Vendas;