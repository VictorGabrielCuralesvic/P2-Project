import { useState } from 'react';
import axios from 'axios';
import '../../Components/Style.css';

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
        <div className="container">
            <h1 className="title">Preço Certo</h1>
            <div className='containertwo'>
                <div className="form">
                    <h2 className="register">Cadastrar</h2>
                    <label className="label">Nome Completo</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Seu nome completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <label className="label">E-mail</label>
                    <input
                        type="email"
                        className="input"
                        placeholder="exemplo@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="label">Número de Telefone</label>
                    <input
                        type="tel"
                        className="input"
                        placeholder="(00) 00000-0000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label className="label">Data de Nascimento</label>
                    <input
                        type="date"
                        className="input"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    <label className="label">Senha</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="●●●●●●●●"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="label">Confirme a Senha</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="●●●●●●●●"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={handleRegister} className="button">Cadastrar</button>
                    <p className="terms">
                        Se cadastrando, você concorda com os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;