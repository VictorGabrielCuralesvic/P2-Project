import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import LogoPC from '../../Assets/LogoPC.png'
import './LoginScreen.css'
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
        <div className='t1'>
            <div className='t1-header'>
                <img src={LogoPC} alt="Preço Certo"/>
                <h1 className='t1-name'>Preço Certo</h1>
            </div>
            <div className='t1-bottom'>
                <div className='t1-body'>
                    <h1 className='t1-title'>Bem-vindo!</h1>
                    <div className='t1-form'>
                        <label className='t1-label'>E-mail</label>
                        <input
                            type="email"
                            placeholder="exemplo@exemplo.com"
                            value={email}
                            className='t1-input'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className='t1-label'>Senha</label>
                        <input
                            type="password"
                            placeholder="●●●●●●●●"
                            value={password}
                            className='t1-input'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='t1-box-button'>
                        <div>
                            <button onClick={handleLogin} className='t1-button'>Entrar</button>
                        </div>
                        <div className='t1-box-a'>
                            <Link to="/ResetPassword" className='t1-link'>Esqueceu a senha?</Link>
                            <Link to="/Register" className='t1-link'>Novo usuário?</Link>                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
