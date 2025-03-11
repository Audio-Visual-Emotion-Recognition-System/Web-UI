import React, { useState, useEffect } from "react";
import { FaPaperclip, FaSmile, FaEllipsisV, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { BsChatDots, BsX } from "react-icons/bs";
import Picker from "emoji-picker-react";
import "./ChatBot.css"; // ✅ Import ChatBot UI styles

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const API_KEY = "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";
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";

    // ✅ Load all JavaScript chatbot scripts dynamically
    useEffect(() => {
    if (isOpen) {
        console.log("✅ Chatbot Opened: Loading JavaScript files...");

        const scriptFiles = [
            "/chatBotAnimate.js",
            "/chatBotConversation.js",
            "/chatBotCustom.js",
            "/chatBotLiveCustom.js",
            "/chatBotValidate.js",
            "/customSettingsDownload.js",
        ];

        scriptFiles.forEach((file) => {
            const script = document.createElement("script");
            script.src = file;
            script.async = true;
            script.onload = () => console.log(`✅ Loaded: ${file}`);
            script.onerror = () => console.error(`❌ Failed to load ${file}`);
            document.body.appendChild(script);
        });

        return () => {
            console.log("❌ Chatbot Closed: Removing JavaScript files...");
            scriptFiles.forEach((file) => {
                const scriptTag = document.querySelector(`script[src="${file}"]`);
                if (scriptTag) document.body.removeChild(scriptTag);
            });
        };
    }
}, [isOpen]);

    // ✅ Function to toggle chat visibility
    const toggleChatbot = () => {
        setIsOpen((prev) => {
            const newState = !prev;
            const chatBox = document.querySelector(".chat-box");
            if (chatBox) {
                if (newState) {
                    chatBox.classList.add("active");  // Show chatbox
                } else {
                    chatBox.classList.remove("active"); // Hide chatbox
                }
            }
            return newState;
        });
    };

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: "You", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "google/gemini-2.0-flash-lite-preview-02-05:free",
                    messages: [{ role: "user", content: input }],
                }),
            });

            const data = await response.json();
            const botMessage = { sender: "AI", text: data.choices?.[0]?.message?.content || "No response from AI." };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("API Error:", error);
            setMessages((prev) => [...prev, { sender: "AI", text: "Error processing request." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleEmojiClick = (emojiObject: any) => {
        setInput(input + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles([...files, ...Array.from(event.target.files)]);
        }
    };

    return (
        <div>
            <button className="chatbot-button" onClick={toggleChatbot}>
                <BsChatDots />
            </button>
            <div className="chat-box">
                {/* ✅ Chat Header */}
                <div className="chat-box-header">
                    <h3>Chat with AI</h3>
                    <div className="chat-options">
                        <FaThumbsUp className="icon" />
                        <FaThumbsDown className="icon" />
                        <FaEllipsisV className="icon" />
                    </div>
                    <button className="close-btn" onClick={toggleChatbot}>
                        <BsX />
                    </button>
                </div>

                {/* ✅ Chat Messages */}
                <div className="chat-box-body">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === "You" ? "chat-box-body-send" : "chat-box-body-receive"}>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    {isTyping && <div className="typing-indicator">AI is typing...</div>}
                </div>

                {/* ✅ File Upload Preview */}
                {files.length > 0 && (
                    <div className="file-preview">
                        {files.map((file, index) => (
                            <div key={index} className="file-item">{file.name}</div>
                        ))}
                    </div>
                )}

                {/* ✅ Chat Input */}
                <div className="chat-box-footer">
                    <FaSmile className="emoji-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}

                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: "none" }}
                        multiple
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload">
                        <FaPaperclip className="file-icon" />
                    </label>

                    <input
                        placeholder="Enter Your Message"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="send-btn" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
