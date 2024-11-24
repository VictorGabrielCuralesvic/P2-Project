import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Recupera o token armazenado
      const response = await fetch("http://localhost:3000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar perfil");
      }

      const data = await response.json();
      console.log("Perfil atualizado:", data.user);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao atualizar perfil");
    }
  };


  return (
    <div className='t6'>
      <Header />
      <div className='t6-bottom'>
        <h1 className='t6-title'>Nome De Usuário</h1>
        <div>
          <h2>Editar Conta:</h2>
          <div className='t6-form'>
            <label className='t6-label'>Nome Completo</label>
            <input
              type="text"
              placeholder="Seu Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='t6-input'
            />
            <label className='t6-label'>E-Mail</label>
            <input
              type="text"
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='t6-input'
            />
            <div className='t6-button-box'>
              <button type="submit" className='t6-button' onClick={handleSaveProfile}>Atualizar Conta</button>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ProfileEdit;