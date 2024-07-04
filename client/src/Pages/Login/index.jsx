import { useState } from 'react';
import '../../Components/Style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {

        try {
            const re = await axios.post('http://localhost:5000/login', { email, password });

            const { token } = re.data;

            //local storage
            localStorage.setItem('token', token);
            
            //navigate to main page
            navigate('/Dashboard');
        } catch (error) {
            setError('E-mail ou senha inválida');
        }
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
                    <a href="/client/src/Pages/ResetPass/index.jsx" className="forgotPassword">Esqueceu a senha?</a>
                    <button onClick={handleLogin} className="button">Entrar</button>
                    <p className="noAccount">
                        <span className="noAccountText">Não tem uma conta? </span>
                        <a href="/client/src/Pages/Register/index.jsx" className="signUp">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
