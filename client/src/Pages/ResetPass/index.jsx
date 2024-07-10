import { useState } from 'react';
import "../../Components/Style.css"
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
        <div className="container">
            <h1 className="title">Preço Certo</h1>
            <div className='containertwo'>
                <div className="form">
                    <h2 className="welcome">Redefinir Senha</h2>
                    <label className="label">E-mail</label>
                    <input
                        type="email"
                        className="input"
                        placeholder="exemplo@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleRequestReset} className="button">Solicitar Redefinição</button>
                    
                    <label className="label">Token</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Token recebido por e-mail"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <label className="label">Nova Senha</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="●●●●●●●●"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label className="label">Confirmar Senha</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="●●●●●●●●"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={handleResetPassword} className="button">Redefinir Senha</button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordScreen;
