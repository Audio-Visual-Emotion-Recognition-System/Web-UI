function validateMessage() {
    var chatTextBox = document.querySelector(".chatBot .chatForm #chatTextBox");
    if (!chatTextBox) {
        console.error("❌ chatTextBox not found in DOM!");
        return false;
    }

    var userMessage = chatTextBox.value.trim();
    return userMessage.length > 0;
}
