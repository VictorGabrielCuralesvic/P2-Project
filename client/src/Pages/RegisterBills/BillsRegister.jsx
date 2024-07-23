import React, { useState } from "react";
import './BillsRegister.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import Header from "../../Components/Header/Header";
import { LuArrowDownRightSquare, LuArrowUpRightSquare } from "react-icons/lu";
import BillsRegisterGraphics from "../../Components/BillsRegisterGraphics/BillsRegisterGraphics";
import { useNavigate } from "react-router-dom";

const BillsRegister = () => {
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState("Lucro");
    const [value, setValue] = useState("");
    const [profit, setProfit] = useState(0);
    const [expense, setExpense] = useState(0);

    const navigate = useNavigate();

    const handleVendas = () => {
        navigate('/vendas');
    }

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setValue("");
    }

    const handleSave = () => {
        const numericValue = parseFloat(value);
        if (type === "Lucro") {
            setProfit(prevProfit => prevProfit + numericValue);
        } else {
            setExpense(prevExpense => prevExpense + numericValue);
        }
        handleCloseModal();
    }

    return (
        <div className="t12">
            <Header />
            <div className='t12-bottom'>
                <div className="t12-media-l">
                    <div className="t12-resume">
                        <div className="t12-resume-item">
                            <p><LuArrowUpRightSquare /> Lucro</p>
                            <p className="t12-resume-money-l">R${profit.toFixed(2)}</p>
                        </div>
                        <div className="t12-resume-item">
                            <p><LuArrowDownRightSquare /> Gasto</p>
                            <p className="t12-resume-money-r">-R${expense.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="t12-button-box">
                        <button className="t12-button" onClick={handleOpenModal}>Anotar Despesas</button>
                        <button className="t12-button" onClick={handleVendas}>Vendas</button>
                    </div>
                </div>
                <div>
                    <div className="t12-graphics">
                        <BillsRegisterGraphics />
                    </div>
                </div>
            </div>
            <BottomNavigation />

            {showModal && (
                <div className="t12-modal">
                    <div className="t12-modal-content">
                        <h2>Registrar {type}</h2>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="Lucro">Lucro</option>
                            <option value="Gasto">Gasto</option>
                        </select>
                        <input 
                            type="number" 
                            value={value} 
                            onChange={(e) => setValue(e.target.value)} 
                            placeholder={`Valor do ${type}`} 
                        />
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={handleCloseModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillsRegister;
