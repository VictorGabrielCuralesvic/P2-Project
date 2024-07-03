import React from "react";
import '../../Components/Style.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';

const BillsRegister = () =>{
    return (
        <div className="container">
            <div className="container-two">
               <h1 className="title">Preço Certo</h1>
            <div className="money">
                <div className="money-item">
                    <span>Lucro</span>
                    <span className="profit"></span>
                </div>
                <div className="money-item">
                    <span>Gasto</span>
                    <span className="expense"></span>
                </div>

                <div className="buttons">
                    <button className="note-expenses">Anotar Despesas</button>
                    <button className="ps">Produtos Vendidos</button>
                    <button className="sells">Vendas</button>
                </div>
                <div className="chart-container">
                    <h2 className="chart-title">Última Semana</h2>
                    <div className="chart">
                        {/*Colocar lógica de gráfico aqui*/}
                    </div>
                </div>
            </div>
            <BottomNavigation/>  
            </div>
        </div>
    );
};

export default BillsRegister;