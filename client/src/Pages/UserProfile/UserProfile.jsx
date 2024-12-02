import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import Header from '../../Components/Header/Header';
import IconProfile from '../../Assets/Icon Profile.png'
import IconSecurity from '../../Assets/Icon Security.png'
import IconSettings from '../../Assets/Icon Setting.png'
import IconHelp from '../../Assets/Icon help.png'
import IconLogout from '../../Assets/Icon Logout.png'
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                } else {
                    console.error('Erro ao buscar o usuário:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className='t5'>
            <Header showIcon={true} />
            <div className='t5-bottom'>
                <h1 className='t5-title'>Bem vindo(a) {name}</h1>
                <div className='t5-wide'>
                    <div>
                        <div className='t5-pages' onClick={() => navigate('/ProfileEdit')}>
                            <div><img src={IconProfile} alt="Editar Perfil"/></div>
                            <span>Editar Perfil</span>
                        </div>
                        {/* <div className='t5-pages'>
                            <div><img src={IconSecurity} alt="Segurança"/></div>
                            <span>Segurança</span>
                        </div>
                        <div className='t5-pages'>
                            <div><img src={IconSettings} alt="Configurações"/></div>
                            <span>Configurações</span>
                        </div> */}
                    </div>
                    <div>
                        {/* <div className='t5-pages'>
                            <div><img src={IconHelp} alt="Ajuda"/></div>
                            <span>Ajuda</span>
                        </div> */}
                        <div className='t5-pages' onClick={() => navigate('/')}>
                            <div><img src={IconLogout} alt="Sair Da Conta"/></div>
                            <span>Sair Da Conta</span>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigation />
        </div>
    );
};

export default UserProfile;
