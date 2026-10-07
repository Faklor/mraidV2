// data-cache.js
window.PortfolioDataCache = (function() {
    let dataPromise = null;
    let cachedData = null;

    return {
        getData: function() {
            // Если данные уже загружены, возвращаем их мгновенно
            if (cachedData) return Promise.resolve(cachedData);
            
            // Если запрос уже идет, все компоненты дождутся этого же промиса
            if (!dataPromise) {
                dataPromise = fetch('https://dashboard.mraid.io/portfolio.json')
                    .then(res => {
                        if (!res.ok) throw new Error('Network error: ' + res.status);
                        return res.json();
                    })
                    .then(data => {
                        cachedData = data;
                        return data;
                    })
                    .catch(err => {
                        console.error('PortfolioDataCache fetch failed:', err);
                        dataPromise = null; // Сбрасываем при ошибке, чтобы следующая попытка могла сработать
                        throw err;
                    });
            }
            return dataPromise;
        }
    };
})();