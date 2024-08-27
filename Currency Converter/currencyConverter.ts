import axios from 'axios';
import * as readline from 'readline';
interface ExchangeRate {
    [currency: string]: number;
}
async function getExchangeRates(baseCurrency: string, apiKey: string): Promise<ExchangeRate | null> {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`);
        return response.data.conversion_rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}
async function convertCurrency(amount: number, fromCurrency: string, toCurrency: string, apiKey: string): Promise<number | null> {
    const exchangeRates = await getExchangeRates(fromCurrency, apiKey);
    if (!exchangeRates) return null;
    const rate = exchangeRates[toCurrency];
    if (rate === undefined) {
        console.error('Conversion rate not available for the target currency');
        return null;
    }
    return amount * rate;
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Enter amount to convert: ', async (amountInput) => {
    const amountToConvert = parseFloat(amountInput);
    rl.question('Enter source currency (e.g., USD): ', async (sourceCurrency) => {
        sourceCurrency = sourceCurrency.toUpperCase();
        rl.question('Enter target currency (e.g., INR): ', async (targetCurrency) => {
            targetCurrency = targetCurrency.toUpperCase();
            const apiKey = '17e0b01fc8ce665281a92937';
            const result = await convertCurrency(amountToConvert, sourceCurrency, targetCurrency, apiKey);
            if (result !== null) {
                console.log(`${amountToConvert} ${sourceCurrency} equals ${result.toFixed(2)} ${targetCurrency}`);
            } else {
                console.log('Conversion failed.');
            }
            rl.close();
        });
    });
});