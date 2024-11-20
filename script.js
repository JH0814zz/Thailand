// 환율 API 설정
const exchangeRateUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

// 환율 변수
let thbRate, krwRate;

// 환율 정보 가져오기
async function fetchExchangeRates() {
    try {
        const response = await fetch(exchangeRateUrl);
        const data = await response.json();

        if (data && data.rates) {
            thbRate = data.rates.THB; // 1 USD = THB
            krwRate = data.rates.KRW; // 1 USD = KRW

            // 화면에 환율 표시
            document.getElementById('usd-rate-value').innerText = `1 USD = ${krwRate.toFixed(2)} KRW`;
            document.getElementById('thb-rate-value').innerText = `1 THB = ${(krwRate/thbRate).toFixed(2)} KRW`;
        } else {
            throw new Error('환율 정보를 불러오는 데 실패했습니다.');
        }
    } catch (error) {
        console.error('환율 정보를 가져오는 데 오류가 발생했습니다:', error);
    }
}

// 달러 입력을 바탕으로 환산 (USD -> THB / KRW)
function convertFromUSD() {
    const usdAmount = parseFloat(document.getElementById('usd-input').value);

    if (!isNaN(usdAmount)) {
        const thbResult = usdAmount * thbRate;
        const krwResult = usdAmount * krwRate;

        document.getElementById('usd-to-thb').innerText = `바트: ${thbResult.toFixed(2)} THB`;
        document.getElementById('usd-to-krw').innerText = `원화: ${krwResult.toFixed(2)} KRW`;
    } else {
        document.getElementById('usd-to-thb').innerText = '유효한 금액을 입력하세요.';
        document.getElementById('usd-to-krw').innerText = '유효한 금액을 입력하세요.';
    }
}

// 바트 입력을 바탕으로 환산 (THB -> KRW)
function convertToKRW() {
    const thbAmount = parseFloat(document.getElementById('thb-input').value);

    if (!isNaN(thbAmount)) {
        // THB -> KRW 직접 환산
        const krwResult = thbAmount * (krwRate / thbRate);
        // THB -> USD 환산
        const usdResult = thbAmount / thbRate;

        document.getElementById('thb-to-krw').innerText = `원화: ${krwResult.toFixed(2)} KRW`;
        document.getElementById('thb-to-usd').innerText = `달러: ${usdResult.toFixed(2)} USD`;
    } else {
        document.getElementById('thb-to-krw').innerText = '유효한 금액을 입력하세요.';
        document.getElementById('thb-to-usd').innerText = '유효한 금액을 입력하세요.';
    }
}

// 페이지 로딩 시 환율 정보 불러오기
fetchExchangeRates();