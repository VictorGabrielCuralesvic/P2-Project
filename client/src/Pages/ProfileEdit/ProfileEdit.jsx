import React from 'react';
import { FaArrowLeft} from 'react-icons/fa';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import LogoPC from '../../Assets/LogoPC.png'; // Certifique-se de que o caminho para a logo está correto
import './ProfileEdit.css';

const ProfileEdit = () => {
  return (
    <div className="profile-edit-container">
      <header className="header">
        <FaArrowLeft className="icon" />
        <div className="title-container">
          <h1 className="title">Preço Certo</h1>
        </div>
        <img src={LogoPC} alt="Logo" className="logo" />
      </header>
      <main className="main-content">
        <h2 className="username">Nome De Usuário</h2>
        <h3 className="edit-title">Editar Conta:</h3>
        <form className="edit-form">
          <label>
            Nome Completo
            <input type="text" placeholder="João Silva" />
          </label>
          <label>
            Número
            <input type="text" placeholder="(81) 9XXXX-XXXX" />
          </label>
          <label>
            E-Mail
            <input type="email" placeholder="exemplo@exemplo.com" />
          </label>
          <button type="submit" className="update-button">Atualizar Conta</button>
        </form>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default ProfileEdit;
