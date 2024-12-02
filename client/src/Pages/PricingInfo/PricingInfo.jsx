import { useState } from 'react';
import './PricingInfo.css';
import ModalIng from '../../Components/PricingInfoModals/modaling';
import { useNavigate } from 'react-router-dom';
import { calculatePrice } from '../../Services/Api';
import Header from '../../Components/Header/Header';
import { FaEdit } from 'react-icons/fa';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';

const PricingInfo = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [laborCosts, setLaborCosts] = useState(0);
    const [packagingCosts, setPackagingCosts] = useState(0);
    const [indirectCosts, setIndirectCosts] = useState(0);
    const [profitMargin, setProfitMargin] = useState(0);
    const [suggestedPrice, setSuggestedPrice] = useState('');
    const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState(null);

    const handleAddIngredient = (ingredient) => {
        if (currentIngredient) {
            const updatedIngredients = ingredients.map((ing) =>
                ing.name === currentIngredient.name ? ingredient : ing
            );
            setIngredients(updatedIngredients);
        } else {
            setIngredients([...ingredients, {
                ...ingredient,
                quantity: parseFloat(ingredient.quantity),
                price: parseFloat(ingredient.price),
                usedQuantity: parseFloat(ingredient.usedQuantity),
            }]);
        }
        setIsIngredientModalOpen(false);
        setIsEditModalOpen(false);
        setCurrentIngredient(null);
    };

    const handleEditIngredient = (ingredient) => {
        setCurrentIngredient(ingredient);
        setIsEditModalOpen(true);
    };

    const handleCalculatePrice = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await calculatePrice(token, {
                productName,
                ingredients,
                laborCosts: parseFloat(laborCosts),
                packagingCosts: parseFloat(packagingCosts),
                indirectCosts: parseFloat(indirectCosts),
                margin: parseFloat(profitMargin),
            });
            setSuggestedPrice(response.data.suggestedPrice.toFixed(2));
        } catch (error) {
            console.error("Error calculating price:", error);
            alert("Erro ao calcular o preço.");
        }
    };

    return (
        <div className="t9">
            <Header />
            <div className="t9-bottom">
                <div className='t9-wide-view'>
                    <div>
                        <h2 className='t9-title'>Nome Do Produto</h2>
                    </div>
                    <div className='t9-wide-content'>
                        <div className="t9-ingredients-box">
                            <div className='t9-ingredients-title'>
                                <h2>Ingredientes</h2>
                                <button className='t9-button' onClick={() => setIsIngredientModalOpen(true)}>Adicionar</button>
                            </div>
                            <div className='t9-ingredient-box'>
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} className="t9-ingredient">
                                        <div className='t9-ingredient-text'>
                                            <p className='t9-item-title'>{ingredient.name}</p>
                                            <div className='t9-item-list'>
                                                <p>Quantidade: {ingredient.quantity}</p>
                                                <p>Preço: R${ingredient.price}</p>
                                                <p>Quant. Utilizada: {ingredient.usedQuantity}</p>
                                            </div>
                                        </div>
                                        <div className='t9-icon' onClick={() => handleEditIngredient(ingredient)}>
                                            <FaEdit />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='t9-wide-border'/>
                        <div className="t9-costs-section">
                            <h2>Custos</h2>
                            <div>
                                <p className='t9-label'>Margem De Lucro:</p>
                                <input type="number" value={profitMargin} onChange={(e) => setProfitMargin(parseFloat(e.target.value))} className='t9-input'/>
                            </div>
                            <div>
                                <p className='t9-label'>Custos de Mão de Obra:</p>
                                <input type="number" value={laborCosts} onChange={(e) => setLaborCosts(parseFloat(e.target.value))} className='t9-input'/>
                            </div>
                            <div>
                                <p className='t9-label'>Custos de Embalagem:</p>
                                <input type="number" value={packagingCosts} onChange={(e) => setPackagingCosts(parseFloat(e.target.value))} className='t9-input'/>
                            </div>
                            <div>
                                <p className='t9-label'>Custos Indiretos:</p>
                                <input type="number" value={indirectCosts} onChange={(e) => setIndirectCosts(parseFloat(e.target.value))} className='t9-input'/>
                            </div>
                            <div className='t9-box-button'>
                                <button onClick={handleCalculatePrice} className='t9-button'>Calcular Preço</button>
                                <div>
                                    <p className='t9-label'>Preço Sugerido:<br /> {suggestedPrice ? `R$${suggestedPrice}` : 'N/A'}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            {isIngredientModalOpen && <ModalIng onAddIngredient={handleAddIngredient} onClose={() => setIsIngredientModalOpen(false)} />}
            {isEditModalOpen && <ModalIng ingredientToEdit={currentIngredient} onAddIngredient={handleAddIngredient} onClose={() => setIsEditModalOpen(false)} />}
        </div>
    );
};

export default PricingInfo;
