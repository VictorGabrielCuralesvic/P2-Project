import { useState } from 'react';
import './style.css';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Lógica de autenticação
        console.log('Login efetuado com:', email, password);
    };

    return (
        <div className="container">
            <h1 className="title">Preço Certo</h1>
            <div className='containertwo'>
                <div className="form">
                    <h2 className="welcome">Bem-vindo!</h2>
                    <label className="label">E-mail</label>
                    <input
                        type="email"
                        className="input"
                        placeholder="exemplo@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="label">Senha</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="●●●●●●●●"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a href="#" className="forgotPassword">Esqueceu a senha?</a>
                    <button onClick={handleLogin} className="button">Entrar</button>
                    <p className="noAccount">
                        <span className="noAccountText">Não tem uma conta? </span>
                        <a href='/client/src/Pages/Register/index.jsx' className="signUp">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
