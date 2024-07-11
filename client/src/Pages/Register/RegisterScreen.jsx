import { useState } from 'react';
import './RegisterScreen.css'
import LogoPC from '../../Assets/LogoPC.png'
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        // Lógica de registro
        if (password !== confirmPassword) {
            console.error('Senhas não coincidem');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                name: fullName,
                email,
                password,
                phone: phoneNumber,
                birthDate
            });

            //setSuccess('Registro efetuado com sucesso');
            console.log('Registro efetuado com:', response.data);
        } catch (error) {
            //setError('erro ao registrar. Tente novamente');
            console.error('erro ao registrar:', error);
        }
    };

    return (
        <div className='t2'>
            <div className='t2-header'>
                <img src={LogoPC} alt="Preço Certo"/>
                <h1 className='t2-name'>Preço Certo</h1>
            </div>
            <div className='t2-bottom'>
                <div className='t2-body'>
                    <h1 className='t2-title'>Cadastrar</h1>
                    <div className='t2-form'>
                        <label className='t2-label'>Nome Completo</label>
                        <input
                            type="text"
                            placeholder="Seu nome completo"
                            value={fullName}
                            className='t2-input'
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <label className='t2-label'>E-mail</label>
                        <input
                            type="email"
                            placeholder="exemplo@exemplo.com"
                            value={email}
                            className='t2-input'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className='t2-label'>Número de Telefone</label>
                        <input
                            type="tel"
                            placeholder="(00) 00000-0000"
                            value={phoneNumber}
                            className='t2-input'
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label className='t2-label'>Data de Nascimento</label>
                        <input
                            type="date"
                            value={birthDate}
                            className='t2-input'
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                        <label className='t2-label'>Senha</label>
                        <input
                            type="password"
                            placeholder="●●●●●●●●"
                            value={password}
                            className='t2-input'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className='t2-label'>Confirme a Senha</label>
                        <input
                            type="password"
                            placeholder="●●●●●●●●"
                            value={confirmPassword}
                            className='t2-input'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className='t2-box-button'>
                        <div className='t2-buttons'>
                            <button onClick={handleRegister} className='t2-button'>Cadastrar</button>
                            <Link to="/" className='t2-link'>já possui uma conta?</Link>
                        </div>
                        <div className='t2-box-a'>
                            <p>
                                Se cadastrando, você concorda com os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>.
                            </p>
                            
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;