const useDataChart = (transaction) => {
    const labels = transaction.map(t => new Date(t.date).toLocaleDateString());
    const incomeData = transaction.filter(t => t.type === 'INCOME').map(t => t.amount);
    const expenseData = transaction.filter(t => t.type === 'EXPENSE').map(t => t.amount);

    return {
        data: {
            labels,
            datasets: [
                {
                    label: 'Lucro',
                    data: incomeData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                },
                {
                    label: 'Gastos',
                    data: expenseData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                }
            ],
        },
        options: { responsive: true, scales: { y: { beginAtZero: true}}}
    };

};

export default useDataChart;