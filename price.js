document.addEventListener('DOMContentLoaded', function() {
    const priceContainer = document.getElementById('price-container');
    const crypto = document.title.split(' ')[0].toLowerCase(); // Get the cryptocurrency name from the title

    let apiUrl;
    switch (crypto) {
        case 'bitcoin':
            apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
            break;
        case 'ethereum':
            apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
            break;
        case 'solana':
            apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';
            break;
        case 'tether':
            apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd';
            break;
        default:
            apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    }

    // Show loading indicator
    priceContainer.innerHTML = '<p>Loading...</p>';

    // Fetch real-time price from the API and display it
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const price = data[crypto].usd;
            priceContainer.innerHTML = `
                <h2>$${price}</h2>
            `;
        })
        .catch(error => {
            console.error('Error fetching price:', error);
            priceContainer.innerHTML = `
                <p>Error fetching price</p>
            `;
        });
});
