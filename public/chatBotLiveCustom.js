var requestJson = new XMLHttpRequest();
requestJson.open("GET", "./customUI.json", true);
requestJson.onreadystatechange = function () {
    if (requestJson.readyState === 4) {
        if (requestJson.status === 200) {
            try {
                var settingsImport = JSON.parse(requestJson.responseText);
                applyCustomSettings(settingsImport);
            } catch (error) {
                console.error("❌ Failed to parse JSON. Received:", requestJson.responseText);
            }
        } else {
            console.error("❌ Failed to load customUI.json. Status:", requestJson.status);
        }
    }
};
requestJson.send();
