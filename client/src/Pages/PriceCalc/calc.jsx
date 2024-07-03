import { useState } from 'react';
import '../../Components/Style.css';
import ModalIng from './modaling';
import ModalCost from './ModalCost';
import ProfitMarginModal from './ModalMargin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PricingInfo = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [laborCosts, setLaborCosts] = useState(0);
    const [packagingCosts, setPackagingCosts] = useState(0);
    const [indirectCosts, setIndirectCosts] = useState(0);
    const [quantityProduced, setQuantityProduced] = useState(0);
    const [profitMargin, setProfitMargin] = useState(0);
    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [isModalCostOpen, setIsModalCostOpen] = useState(false);
    const [isProfitMarginModalOpen, setIsProfitMarginModalOpen] = useState(false);

    const handleAddIngredient = (ingredient) => {
        setIngredients([...ingredients, ingredient]);
        setIsIngredientModalOpen(false);
    };

    const handleSaveQuantityProduced = (quantity) => {
        setQuantityProduced(quantity);
        setIsModalCostOpen(false);
    };

    const handleSaveProfitMargin = (margin) => {
        setProfitMargin(margin);
        setIsProfitMarginModalOpen(false);
    };

    const handleCalculatePrice = async () => {
        const ingredientCosts = ingredients.reduce((sum, ingredient) => sum + (ingredient.price * ingredient.usedQuantity), 0);

        try {
            const response = await axios.post('/api/calculatePrice', {
                productName,
                ingredientCosts,
                laborCosts,
                packagingCosts,
                indirectCosts,
                margin: profitMargin,
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
                        <p>Quantidade Produzida: {quantityProduced}</p>
                        <button onClick={() => setIsModalCostOpen(true)}>Editar</button>
                    </div>
                    <div className="cost-item">
                        <p>Margem De Lucro: {profitMargin}</p>
                        <button onClick={() => setIsProfitMarginModalOpen(true)}>Editar</button>
                    </div>
                    <div className="cost-item">
                        <p>Custos de Mão de Obra: {laborCosts}</p>
                        <input type="number" value={laborCosts} onChange={(e) => setLaborCosts(e.target.value)} />
                    </div>
                    <div className="cost-item">
                        <p>Custos de Embalagem: {packagingCosts}</p>
                        <input type="number" value={packagingCosts} onChange={(e) => setPackagingCosts(e.target.value)} />
                    </div>
                    <div className="cost-item">
                        <p>Custos Indiretos: {indirectCosts}</p>
                        <input type="number" value={indirectCosts} onChange={(e) => setIndirectCosts(e.target.value)} />
                    </div>
                </div>
                <button onClick={handleCalculatePrice}>Calcular Preço</button>
            </div>
            {isIngredientModalOpen && <ModalIng onAddIngredient={handleAddIngredient} onClose={() => setIsIngredientModalOpen(false)} />}
            {isModalCostOpen && <ModalCost onSave={handleSaveQuantityProduced} onClose={() => setIsModalCostOpen(false)} />}
            {isProfitMarginModalOpen && <ProfitMarginModal onSave={handleSaveProfitMargin} onClose={() => setIsProfitMarginModalOpen(false)} />}
        </div>
    );
};

export default PricingInfo;
