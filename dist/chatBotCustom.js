// Selecting required HTML elements
var uiDomStyleClass = document.querySelector("html head style");
var uiChatBot = document.querySelector(".chatBot");
var uiChatOpenTrigger = document.querySelector(".chatBot .chatBotHeading #chatOpenTrigger");
var uiChatSeparater = document.querySelector(".chatBot .chatBotHeading+hr");
var uiChatBotTextArea = document.querySelector(".chatBot .chatForm #chatTextBox");
var uiChatBotSendButton = document.querySelector(".chatBot .chatForm #sendButton");

var uiAccentColorPreview = document.querySelector("form.stylingController #accentColorInput + .previewColor");
var uiBackgroundColorPreview = document.querySelector("form.stylingController #backgroundColorInput + .previewColor");

// Getting settings from customUI.json file
var requestJson = new XMLHttpRequest();
requestJson.open("GET", "./customUI.json", true);
requestJson.onreadystatechange = function () {
    if (requestJson.readyState === 4 && requestJson.status === 200) {
        try {
            var settingsImport = JSON.parse(requestJson.responseText);
            applyCustomSettings(settingsImport);
        } catch (error) {
            console.error("❌ Failed to parse JSON from customUI.json:", error);
        }
    }
};
requestJson.send();

function applyCustomSettings(settingsImport) {
    if (!settingsImport) return;

    var accentColor = settingsImport.accentColor || "#1a73e8";
    var backgroundColor = settingsImport.backgroundColor || "#333333";
    var chatBotCustomHeading = settingsImport.chatBotHeading || "Any Queries? Ask Me!";
    let chatDefaultText = settingsImport.defaultText || "Hi! I am ChatBot.";

    if (uiAccentColorPreview) uiAccentColorPreview.style.backgroundColor = accentColor;
    if (uiChatOpenTrigger) uiChatOpenTrigger.style.backgroundColor = accentColor;
    if (uiChatSeparater) uiChatSeparater.style.backgroundColor = accentColor;
    if (uiDomStyleClass) uiDomStyleClass.innerHTML = ".accentColor{ background:" + accentColor + "!important;}";
    if (uiChatBotTextArea) uiChatBotTextArea.style.border = "1px solid " + accentColor;
    if (uiChatBotSendButton) uiChatBotSendButton.style.backgroundColor = accentColor;
    if (uiBackgroundColorPreview) uiBackgroundColorPreview.style.backgroundColor = backgroundColor;
    if (uiChatBot) uiChatBot.style.backgroundColor = backgroundColor;
    if (uiChatOpenTrigger) uiChatOpenTrigger.innerHTML = chatBotCustomHeading;
}
