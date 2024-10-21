import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
    baseURL: 'http://localhost:5000',  // URL base para todas as requisições
});

// Função para registrar um usuário
export const registerUser = async (userData) => {
    return await api.post('/register', userData);
};

// Função de login
export const login = async (email, password) => {
    return await api.post('/login', { email, password });
};

// Função para obter os produtos
export const getProducts = async (token) => {
    return await api.get('/products', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Função para calcular o preço
export const calculatePrice = async (token, productData) => {
    return await api.post('/calculate-price', productData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Função para registrar uma transação
export const registerTransaction = async (transactionData, token) => {
    return await api.post("/transactions", transactionData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Função para buscar o saldo
export const fetchBalance = async (startDate, endDate, token) => {
    return await api.get("/balance", {
        params: { startDate, endDate },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// Função para solicitar redefinição de senha
export const requestPasswordReset = async (email) => {
    return await api.post("/request-password-reset", { email });
};

// Função para redefinir a senha
export const resetPassword = async (token, newPassword) => {
    return await api.post("/reset-password", { token, newPassword });
};

// Função para obter produtos
export const fetchProducts = async (token) => {
    return await api.get('/products', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Função para obter a receita total por data
export const fetchTotalRevenueByDate = async (date, token) => {
    return await api.get('/total-revenue-by-date', {
        params: { date },
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Função para registrar venda
export const registerSale = async (saleData, token) => {
    return await api.post('/register-sale', saleData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
};