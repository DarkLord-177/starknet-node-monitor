// Lightweight asset monitor for Web3 integration
const axios = require('axios');

const STARKNET_TOKENS = {
    STRK: 'starknet',
    ETH: 'ethereum',
    USDC: 'usd-coin'
};

async function fetchMarketData() {
    console.log('[System] Initializing automated price check sequence...');
    const ids = Object.values(STARKNET_TOKENS).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        
        console.log('\n=== CURRENT WEB3 MARKET METRICS ===');
        console.log(`STRK: $${data.starknet.usd.toFixed(3)} (${data.starknet.usd_24h_change.toFixed(2)}%)`);
        console.log(`ETH:  $${data.ethereum.usd.toFixed(2)} (${data.ethereum.usd_24h_change.toFixed(2)}%)`);
        // ИСПРАВЛЕНО: из-за дефиса в названии используем квадратные скобки
        console.log(`USDC: $${data['usd-coin'].usd.toFixed(4)}`);
        console.log('===================================\n');
    } catch (error) {
        console.error('[Error] Execution halted. Critical failure fetching data from API:', error.message);
    }
}

// Run monitor index iteration every 60 seconds
setInterval(fetchMarketData, 60000);
fetchMarketData();