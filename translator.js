// Google 번역 API를 사용하기 위한 함수 (여기서는 예시로 URL을 사용)
async function translateText() {
    const sourceText = document.getElementById("source-text").value;
    const sourceLang = document.getElementById("source-language").value;
    const targetLang = document.getElementById("target-language").value;
    
    if (!sourceText) {
        alert("번역할 텍스트를 입력해주세요.");
        return;
    }

    const apiUrl = `https://translation.googleapis.com/language/translate/v2`;
    const apiKey = 'YOUR_GOOGLE_API_KEY';  // 실제 Google API Key를 입력해주세요.

    const data = {
        q: sourceText,
        source: sourceLang,
        target: targetLang,
        format: 'text',
        key: apiKey
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result && result.data) {
            const translatedText = result.data.translations[0].translatedText;
            document.getElementById("translated-text").value = translatedText;
        } else {
            alert("번역 실패, 다시 시도해주세요.");
        }
    } catch (error) {
        console.error("번역 오류:", error);
        alert("번역에 실패했습니다.");
    }
}

// 입력 필드 초기화
function clearFields() {
    document.getElementById("source-text").value = "";
    document.getElementById("translated-text").value = "";
}
