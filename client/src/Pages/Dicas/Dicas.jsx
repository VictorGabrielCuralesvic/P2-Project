import React, { useEffect, useState } from 'react';
import './Dicas.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import Header from '../../Components/Header/Header';
import nonews from '../../Assets/nonews.png';
import { fetchFinanceNews } from '../../Services/Api';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    const exampleArticles = [
        {
            title: '5 Dicas para Economizar no Supermercado',
            description:
                'Aprenda como economizar com estratégias simples e práticas no dia a dia. Compare preços, aproveite promoções e reduza seus gastos mensais!',
            publishedAt: '2024-11-24',
            url: 'https://example.com/economizar-supermercado',
        },
        {
            title: 'Planejamento Financeiro: Por onde começar?',
            description:
                'Descubra as melhores estratégias para organizar suas finanças pessoais e alcançar seus objetivos financeiros.',
            publishedAt: '2024-11-23',
            url: 'https://example.com/planejamento-financeiro',
        },
    ];

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await fetchFinanceNews(); 
                if (response.data && response.data.articles && response.data.articles.length > 0) {
                    setArticles(response.data.articles); 
                } else {
                    setArticles(exampleArticles); 
                }
            } catch (err) {
                setError('Erro ao carregar as notícias. Exibindo exemplos.');
                setArticles(exampleArticles); 
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    return (
        <div className='t4-container'>
            <Header showIcon={false} />
            <div className='t4-content'>
                <h1 className='t4-title'>Dicas</h1>
                {loading ? (
                    <p className='t4-loading'>Carregando...</p>
                ) : error ? (
                    <div className='t4-no-news'>
                        <img src={nonews} alt="Notícia não encontrada" />
                        <p>{error}</p>
                    </div>
                ) : articles.length > 0 ? (
                    <div className='t4-news-list'>
                        {articles.map((article, index) => (
                            <div key={index} className='t4-news-item'>
                                <p className='t4-news-date'>
                                    {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                    })}
                                </p>
                                <a
                                    href={article.url}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="t4-news-link"
                                >
                                    <h2 className='t4-news-title'>{article.title}</h2>
                                </a>
                                <p className='t4-news-description'>{article.description}</p>
                                <hr className='t4-divider' />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='t4-no-news'>
                        <img src={nonews} alt="Notícia não encontrada" />
                        <p>Nenhuma notícia encontrada.</p>
                    </div>
                )}
            </div>
            <BottomNavigation />
        </div>
    );
};

export default Dashboard;


/* import React, { useEffect, useState } from 'react';
import './Dicas.css';
import BottomNavigation from '../../Components/BottomNavigation/BottomNavigation';
import Header from '../../Components/Header/Header';
import nonews from '../../Assets/nonews.png'

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false); // Alterado para falso para exibir a notícia diretamente
    const [error, setError] = useState(null);

    // Adicionando uma notícia exemplo
    useEffect(() => {
        const exampleArticles = [
            {
                title: '5 Dicas para Economizar no Supermercado',
                description:
                    'Aprenda como economizar com estratégias simples e práticas no dia a dia. Compare preços, aproveite promoções e reduza seus gastos mensais!',
                publishedAt: '2024-11-24',
                url: 'https://example.com/economizar-supermercado', // Link para a matéria
            },
            {
              title: '5 Dicas para Economizar no Supermercado',
              description:
                  'Aprenda como economizar com estratégias simples e práticas no dia a dia. Compare preços, aproveite promoções e reduza seus gastos mensais!',
              publishedAt: '2024-11-24',
              url: 'https://example.com/economizar-supermercado', // Link para a matéria
          },
        ];
        setArticles(exampleArticles);
    }, []); 

    return (
        <div className='t4-container'>
            <Header showIcon={false} />
            <div className='t4-content'>
                <h1 className='t4-title'>Dicas</h1>
                {loading ? (
                    <p className='t4-loading'>Carregando...</p>
                ) : error ? (
                    <div className='t4-no-news'>
                        <img src={nonews} alt="Notícia não encontrada" />
                        <p>{error}</p>
                    </div>
                ) : articles.length > 0 ? (
                    <div className='t4-news-list'>
                        {articles.map((article, index) => (
                            <div key={index} className='t4-news-item'>
                                <p className='t4-news-date'>
                                    {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                    })}
                                </p>
                                <a
                                    href={article.url} 
                                    target="_blank" // Abre em nova guia
                                    rel="noopener noreferrer" 
                                    className="t4-news-link"
                                >
                                    <h2 className='t4-news-title'>{article.title}</h2>
                                </a>
                                <p className='t4-news-description'>{article.description}</p>
                                <hr className='t4-divider' />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='t4-no-news'>
                        <img src={nonews} alt="Notícia não encontrada" />
                        <p>Nenhuma notícia encontrada.</p>
                    </div>
                )}
            </div>
            <BottomNavigation />
        </div>
    );
};

export default Dashboard; */
