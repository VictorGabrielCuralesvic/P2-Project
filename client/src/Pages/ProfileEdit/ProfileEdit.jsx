import React from 'react';
import Header from '../../Components/Header/Header';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import './ProfileEdit.css';

const ProfileEdit = () => {
  return (
    <div className='t6'>
      <Header showIcon={true} />
      <div className='t6-bottom'>
        <h1 className='t6-title'>Nome De Usuário</h1>
        <div>
          <h2>Editar Conta:</h2>
          <div className='t6-form'>
            <label className='t6-label'>Nome Completo</label>
            <input
              type="text"
              placeholder="Seu Nome Completo"
              value={'none'}
              className='t6-input'
            />
            <label className='t6-label'>Número</label>
            <input
              type="text"
              placeholder="(XX) XXXXX-XXXX"
              value={'none'}
              className='t6-input'
            />
            <label className='t6-label'>E-Mail</label>
            <input
              type="text"
              placeholder="seuemail@email.com"
              value={'none'}
              className='t6-input'
            />
            <div className='t6-button-box'>
              <button type="submit" className='t6-button'>Atualizar Conta</button>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ProfileEdit;