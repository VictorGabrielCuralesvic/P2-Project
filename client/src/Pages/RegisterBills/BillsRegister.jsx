import React from "react";
import './BillsRegister.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import Header from "../../Components/Header/Header";
import { LuArrowDownRightSquare, LuArrowUpRightSquare } from "react-icons/lu";
import BillsRegisterGraphics from "../../Components/BillsRegisterGraphics/BillsRegisterGraphics";

const BillsRegister = () =>{
    return (
        <div className="t12">
            <Header showIcon={true} />
            <div className='t12-bottom'>
                <div className="t12-media-l">
                    <div className="t12-resume">
                        <div className="t12-resume-item">
                            <p><LuArrowUpRightSquare /> Lucro</p>
                            <p className="t12-resume-money-l">R$7.783,00</p>
                        </div>
                        <div className="t12-resume-item">
                            <p><LuArrowDownRightSquare /> Gasto</p>
                            <p className="t12-resume-money-r">-R$1.187,40</p>
                        </div>
                    </div>
                    <div className="t12-button-box">
                        <button className="t12-button">Anotar Despesas</button>
                        <button className="t12-button">Produtos Vendidos</button>
                        <button className="t12-button">Vendas</button>
                    </div>
                </div>
                <div>
                    <div className="t12-graphics">
                        <BillsRegisterGraphics/>
                    </div>
                </div>
            </div>
            <BottomNavigation/>  
        </div>
    );
};

export default BillsRegister;