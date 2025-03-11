document.addEventListener("DOMContentLoaded", function () {
    // ✅ Selecting elements that are supposed to be animated
    const animateChatBot = document.querySelector(".chatBot");
    const animateChatSeparater = document.querySelector(".chatBot .chatBotHeading + hr");
    const animateChatBody = document.querySelector(".chatBot .chatBody");
    const animateChatForm = document.querySelector(".chatBot .chatForm");

    // ✅ Selecting trigger elements of animation
    const chatOpenTrigger = document.querySelector(".chatBot .chatBotHeading #chatOpenTrigger");
    const chatCloseTrigger = document.querySelector(".chatBot .chatForm #chatCloseTrigger");

    // ✅ Selecting chat session to clear after conversation ends
    const chatSession = document.querySelector(".chatBot .chatBody .chatSession");

    // ✅ Prevent errors if elements don't exist
    if (!animateChatBot || !chatOpenTrigger || !chatCloseTrigger) {
        console.error("Chatbot elements are missing. Check your HTML structure.");
        return;
    }

    // ✅ Setting up trigger for click event
    chatOpenTrigger.addEventListener("click", openChatBot);
    chatCloseTrigger.addEventListener("click", closeChatBot);

    // ✅ ChatBot iteration count
    let chatBotIteration = 0;

    // ✅ Function to open ChatBot
    function openChatBot() {
        setTimeout(() => animateChatBot.classList.add("active"), 0);
        setTimeout(() => chatOpenTrigger.classList.add("active"), 250);
        if (animateChatSeparater) setTimeout(() => animateChatSeparater.classList.add("active"), 500);
        if (animateChatBody) setTimeout(() => animateChatBody.classList.add("active"), 750);
        if (animateChatForm) setTimeout(() => animateChatForm.classList.add("active"), 1000);

        if (chatBotIteration === 0) {
            setTimeout(initiateConversation, 2000);
        }
        chatBotIteration++;
    }

    // ✅ Function to close ChatBot
    function closeChatBot() {
        if (animateChatForm) setTimeout(() => animateChatForm.classList.remove("active"), 0);
        if (animateChatBody) setTimeout(() => animateChatBody.classList.remove("active"), 250);
        if (animateChatSeparater) setTimeout(() => animateChatSeparater.classList.remove("active"), 500);
        setTimeout(() => chatOpenTrigger.classList.remove("active"), 750);
        setTimeout(() => {
            animateChatBot.classList.remove("active");
            if (chatSession) chatSession.innerHTML = ""; // Clear chat if needed
        }, 1000);
    }

    // ✅ Chatbox toggling (fixes visibility issue)
    const chatButton = document.querySelector(".chatbot-button");
    const chatBox = document.querySelector(".chat-box");
    const closeButton = document.querySelector(".close-btn");

    if (chatButton && chatBox) {
        chatButton.addEventListener("click", function () {
            chatBox.style.visibility = "visible";
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            chatBox.style.visibility = "hidden";
        });
    }
});
