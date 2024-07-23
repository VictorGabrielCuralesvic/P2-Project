import React, { useState, useEffect } from "react";
import './BillsRegister.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import Header from "../../Components/Header/Header";
import { LuArrowDownRightSquare, LuArrowUpRightSquare } from "react-icons/lu";
import BillsRegisterGraphics from "../../Components/BillsRegisterGraphics/BillsRegisterGraphics";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BillsRegister = () => {
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState("Lucro");
    const [value, setValue] = useState("");
    const [profit, setProfit] = useState(0);
    const [expense, setExpense] = useState(0);
    const [transaction, setTransactions] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transactionDate, setTransactionDate] = useState('');

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
        setTransactionDate('');
    }

    const handleSave = async () => {
        const token = localStorage.getItem('token')
        const numericValue = parseFloat(value);
        console.log({type, numericValue, transactionDate});
        try {
            const response = await axios.post("http://localhost:5000/transactions", {
                type: type === "Lucro" ? "INCOME" : "EXPENSE",
                amount: numericValue,
                date: transactionDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log({type});
            if (response.status === 201) {
                fetchBalance();
                handleCloseModal();
            }
        } catch (error) {
            console.error("Error creating transaction", error);
        }
    }

    const fetchBalance = async () => {
        const token = localStorage.getItem('token');
        console.log('Fetching transactions with dates:', { startDate, endDate });
        try {
            const response = await axios.get("http://localhost:5000/balance", {
                params: {
                    startDate,
                    endDate
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { totalIncome, totalExpense } = response.data;
            setProfit(totalIncome);
            setExpense(totalExpense);
        } catch (error) {
            console.error("Error fetching balance", error);
        }
    }

    useEffect(() => {
        fetchBalance();
    }, [startDate, endDate]);

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
                    <div className="t12-date-filter">
                        <label>
                            Data Inicial:
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </label>
                        <label>
                            Data Final:
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </label>
                        <button className="t12-button" onClick={fetchBalance}>Filtrar</button>
                    </div>
                </div>
                <div>
                    <div className="t12-graphics">
                        <BillsRegisterGraphics transactions={transaction} />
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
                        <label>
                            Data da Transação
                            <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} />
                        </label>
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={handleCloseModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillsRegister;
