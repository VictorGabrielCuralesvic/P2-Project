import { useState } from 'react';
import './PricingInfo.css';
import ModalIng from './PricingInfoModals/modaling';
import ProfitMarginModal from './PricingInfoModals/ModalMargin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import { FaEdit } from 'react-icons/fa';

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
        <div className="t9">
            <Header/>
            <div className="t9-bottom">
                <h2 className='t9-title'>Nome Do Produto</h2>

                <div className="t9-ingredients-box">
                    <div className='t9-ingredients-title'>
                        <h3>Ingredientes</h3>
                        <button className='t9-button' onClick={() => setIsIngredientModalOpen(true)}>Adicionar</button>
                    </div>
                    <div className='t9-ingredient-box'>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="t9-ingredient">
                                <div className='t9-ingredient-text'>
                                    <p className='t9-item-title'>{ingredient.name}</p>
                                    <div className='t9-item-list'>
                                        <p>Quantidade: {ingredient.quantity}g.</p>
                                        <p>Preço: R${ingredient.price}.</p>
                                        <p>Quant. Utilizada: {ingredient.usedQuantity}g.</p>
                                    </div>
                                </div>
                                <div className='t9-icon'>
                                    <FaEdit />
                                </div>
                            </div>
                        ))}
                    </div>
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