import React from 'react';
import './style.css';
import BottomNavigation from '../../Components/BottomNavigation';

const UserProfile = () => {
    return (
        <div className="user-profile">
            <div className="header">
                <h1>Preço Certo</h1>
                <div className="header-icon">
                    <img src="path-to-your-icon" alt="icon"/>
                </div>
            </div>
            <div className="user-info">
                <h2>Nome De Usuário</h2>
            </div>
            <div className="menu">
                <div className="menu-item">
                    <div className="menu-icon"><img src="path-to-your-icon" alt="Editar Perfil"/></div>
                    <span>Editar Perfil</span>
                </div>
                <div className="menu-item">
                    <div className="menu-icon"><img src="path-to-your-icon" alt="Segurança"/></div>
                    <span>Segurança</span>
                </div>
                <div className="menu-item">
                    <div className="menu-icon"><img src="path-to-your-icon" alt="Configurações"/></div>
                    <span>Configurações</span>
                </div>
                <div className="menu-item">
                    <div className="menu-icon"><img src="path-to-your-icon" alt="Ajuda"/></div>
                    <span>Ajuda</span>
                </div>
                <div className="menu-item">
                    <div className="menu-icon"><img src="path-to-your-icon" alt="Sair Da Conta"/></div>
                    <span>Sair Da Conta</span>
                </div>
            </div>
            <BottomNavigation />
        </div>
    );
};

export default UserProfile;
