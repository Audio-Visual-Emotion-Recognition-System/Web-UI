// Selecting elements
var chatBotSession = document.querySelector(".chatBot .chatBody .chatSession");
var chatBotSendButton = document.querySelector(".chatBot .chatForm #sendButton");
var chatBotTextArea = document.querySelector(".chatBot .chatForm #chatTextBox");

if (!chatBotSession || !chatBotSendButton || !chatBotTextArea) {
    console.error("❌ Chatbot elements are missing. Check your HTML structure.");
}

// Default messages
var chatBotInitiateMessage = "Hello! I am ChatBot.";
var chatBotBlankMessageReply = "Type something!";
var chatBotReply = "This is a bot reply.";

var inputMessage = "";
var typeOfContainer = "";

if (chatBotSendButton) {
    chatBotSendButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (validateMessage()) {
            inputMessage = chatBotTextArea.value;
            typeOfContainer = "message";
            createContainer(typeOfContainer);
            setTimeout(function () {
                typeOfContainer = "reply";
                createContainer(typeOfContainer);
            }, 750);
        } else {
            typeOfContainer = "error";
            createContainer(typeOfContainer);
        }
        chatBotTextArea.value = "";
        chatBotTextArea.focus();
    });
}

function createContainer(typeOfContainer) {
    if (!chatBotSession) return;

    var containerID = "";
    var textClass = "";

    switch (typeOfContainer) {
        case "message":
            containerID = "messageContainer";
            textClass = "message";
            break;
        case "reply":
        case "initialize":
        case "error":
            containerID = "replyContainer";
            textClass = "reply";
            break;
        default:
            console.error("Error! Please reload the website.");
            return;
    }

    var newContainer = document.createElement("div");
    newContainer.setAttribute("class", "container");
    if (containerID === "messageContainer") newContainer.setAttribute("id", "messageContainer");
    if (containerID === "replyContainer") newContainer.setAttribute("id", "replyContainer");
    chatBotSession.appendChild(newContainer);

    var newMessage = document.createElement("p");
    newMessage.setAttribute("class", textClass + " animateChat");
    newMessage.innerHTML = typeOfContainer === "message" ? inputMessage : chatBotReply;

    newContainer.appendChild(newMessage);
    newContainer.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

function initiateConversation() {
    if (chatBotSession) {
        chatBotSession.innerHTML = "";
        createContainer("initialize");
    }
}
