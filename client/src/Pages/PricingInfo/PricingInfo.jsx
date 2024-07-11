import { useState } from 'react';
import '../../Components/Style.css';
import ModalIng from './PricingInfoModals/modaling';
import ModalCost from './PricingInfoModals/ModalCost';
import ProfitMarginModal from './PricingInfoModals/ModalMargin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PricingInfo = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [laborCosts, setLaborCosts] = useState(0);
    const [packagingCosts, setPackagingCosts] = useState(0);
    const [indirectCosts, setIndirectCosts] = useState(0);
    const [profitMargin, setProfitMargin] = useState(0);
    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [isProfitMarginModalOpen, setIsProfitMarginModalOpen] = useState(false);

    const handleAddIngredient = (ingredient) => {
        setIngredients([...ingredients, {
            ...ingredient,
            quantity: parseFloat(ingredient.quantity),
            price: parseFloat(ingredient.price),
            usedQuantity: parseFloat(ingredient.usedQuantity)
        }]);
        setIsIngredientModalOpen(false);
    };

    const handleSaveProfitMargin = (margin) => {
        setProfitMargin(parseFloat(margin));
        setIsProfitMarginModalOpen(false);
    };

    const handleCalculatePrice = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5000/calculate-price', {
                productName,
                ingredients,
                laborCosts: parseFloat(laborCosts),
                packagingCosts: parseFloat(packagingCosts),
                indirectCosts: parseFloat(indirectCosts),
                margin: parseFloat(profitMargin),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(`Preço Sugerido: ${response.data.suggestedPrice}`);
        } catch (error) {
            console.error("Error calculating price:", error);
            alert("Erro ao calcular o preço.");
        }
    };

    return (
        <div className="container">
            <h1 className="title">Preço Certo</h1>
            <div className="product-info">
                <h2>Nome Do Produto</h2>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Nome do Produto" />
                <div className="ingredients-section">
                    <h3>Ingredientes</h3>
                    <button onClick={() => setIsIngredientModalOpen(true)}>Adicionar</button>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-item">
                            <p>{ingredient.name}</p>
                            <p>{ingredient.quantity}</p>
                            <p>{ingredient.price}</p>
                            <p>{ingredient.usedQuantity}</p>
                        </div>
                    ))}
                </div>
                <div className="costs-section">
                    <h3>Custos</h3>
                    <div className="cost-item">
                        <p>Margem De Lucro: {profitMargin}</p>
                        <button onClick={() => setIsProfitMarginModalOpen(true)}>Editar</button>
                    </div>
                    <div className="cost-item">
                        <p>Custos de Mão de Obra: {laborCosts}</p>
                        <input type="number" value={laborCosts} onChange={(e) => setLaborCosts(parseFloat(e.target.value))} />
                    </div>
                    <div className="cost-item">
                        <p>Custos de Embalagem: {packagingCosts}</p>
                        <input type="number" value={packagingCosts} onChange={(e) => setPackagingCosts(parseFloat(e.target.value))} />
                    </div>
                    <div className="cost-item">
                        <p>Custos Indiretos: {indirectCosts}</p>
                        <input type="number" value={indirectCosts} onChange={(e) => setIndirectCosts(parseFloat(e.target.value))} />
                    </div>
                </div>
                <button onClick={handleCalculatePrice}>Calcular Preço</button>
            </div>
            {isIngredientModalOpen && <ModalIng onAddIngredient={handleAddIngredient} onClose={() => setIsIngredientModalOpen(false)} />}
            {isProfitMarginModalOpen && <ProfitMarginModal onSave={handleSaveProfitMargin} onClose={() => setIsProfitMarginModalOpen(false)} />}
        </div>
    );
};

export default PricingInfo;