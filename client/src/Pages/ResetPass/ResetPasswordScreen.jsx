import { useState } from 'react';
import './ResetPasswordScreen.css'
import LogoPC from '../../Assets/LogoPC.png'
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');

    const handleRequestReset = async () => {
        // Lógica para solicitar redefinição de senha
        try {
            const response = await axios.post("http://localhost:5000/request-password-reset", { email });
            console.log('Solicitação de redefinição de senha para:', email);
        } catch (error) {
            console.error('error requesting password reset', error);
        }

    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            console.error('As senhas não correspondem');
            return;
        }
        // Lógica para redefinir a senha
        try {
            const response = await axios.post("http://localhost:5000/reset-password", { token, newPassword });
            console.log('Redefinição de senha com:', token, newPassword);
        } catch (error) {
            console.error('error resetting password:', error);
        }
    };
    
    return (
        <div className='t1-1'>
            <div className='t1-1-header'>
                <img src={LogoPC} alt="Preço Certo"/>
                <h1 className='t1-1-name'>Preço Certo</h1>
            </div>
            
            <div className='t1-1-bottom'>
                <div className='t1-1-body'>
                    <h1 className='t1-1-title'>Redefinir Senha</h1>
                    <div className='t1-1-form'>
                        <label className='t1-1-label'>E-mail</label>
                        <div className='t1-1-teste'>
                        <input
                            type="email"
                            className='t1-1-input'
                            placeholder="exemplo@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={handleRequestReset} className='t1-1-button'>Solicitar Redefinição</button>
                        </div>
                        <label className='t1-1-label'>Token</label>
                        <input
                            type="text"
                            className='t1-1-input'
                            placeholder="Token recebido por e-mail"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                        <label className='t1-1-label'>Nova Senha</label>
                        <input
                            type="password"
                            className='t1-1-input'
                            placeholder="●●●●●●●●"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label className='t1-1-label'>Confirmar Senha</label>
                        <input
                            type="password"
                            className='t1-1-input'
                            placeholder="●●●●●●●●"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleResetPassword} className='t1-1-button'>Redefinir Senha</button>
                    <Link to="/" className='t1-1-link'>Voltar para o login?</Link>                          
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordScreen;
