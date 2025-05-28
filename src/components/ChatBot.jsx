import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/ChatBot.css';
import { FaUserCircle } from 'react-icons/fa';
import { GoogleGenAI } from '@google/genai';
import { model, systemInstruction } from '../scripts/constants';
import { RiRobot2Fill } from 'react-icons/ri';
import { IoSend } from 'react-icons/io5';

const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [chatSession, setChatSession] = useState(null);
    const [error, setError] = useState(null);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [shouldRefocusInput, setShouldRefocusInput] = useState(false);
    const hasScrolled = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    // For handling the scroll to bottom when chat history updates
    useEffect(() => {
        if (hasScrolled.current) {
            scrollToBottom();
        } else {
            hasScrolled.current = true;
        }
    }, [chatHistory]);

    // For refocusing the input field after sending a message
    useEffect(() => {
        if (shouldRefocusInput) {
            inputRef.current?.focus();
            setShouldRefocusInput(false);
        }
    }, [shouldRefocusInput]);

    // Initialize the chat session when the component mounts
    useEffect(() => {
        const initializeChat = async () => {
            setIsBotTyping(true);
            setError(null);
            try {
                if (!ai) throw new Error("Gemini AI client not initialized.");
                const newChat = ai.chats.create({
                    model: model,
                    config: { systemInstruction: systemInstruction },
                });
                setChatSession(newChat);
                const initialBotMessage = {
                    id: `bot-init-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                    sender: 'bot',
                    text: "Hello! I'm Sowad's portfolio assistant. How can I help you learn more about him today?",
                    timestamp: Date.now(),
                };
                hasScrolled.current = false;
                setChatHistory([initialBotMessage]);
            } catch (err) {
                console.error("Failed to initialize chat session:", err);
                setError("Could not start the chat session. Please ensure the API key is configured correctly and try refreshing.");
                setChatHistory([{
                    id: `error-init-${Date.now()}`,
                    sender: 'bot',
                    text: "Sorry, I'm having trouble connecting. Please check the setup and refresh.",
                    timestamp: Date.now(),
                }]);
            } finally {
                setIsBotTyping(false);
            }
        };
        initializeChat();
    }, []);

    // Handle sending messages
    const handleSendMessage = useCallback(async (e) => {
        if (e) e.preventDefault();
        const currentInput = userInput.trim();
        if (!currentInput || isBotTyping || !chatSession) return;

        const userMessage = {
            id: `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            sender: 'user',
            text: currentInput,
            timestamp: Date.now(),
        };
        setChatHistory(prev => [...prev, userMessage]);
        setUserInput('');
        setIsBotTyping(true);
        setError(null);

        const botMessageId = `bot-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        setChatHistory(prev => [...prev, { id: botMessageId, sender: 'bot', text: '', timestamp: Date.now() }]);

        try {
            const stream = await chatSession.sendMessageStream({ message: currentInput });
            let currentBotText = '';
            for await (const chunk of stream) {
                const chunkText = chunk.text;
                if (chunkText) {
                    currentBotText += chunkText;
                    setChatHistory(prev => prev.map(msg =>
                        msg.id === botMessageId ? { ...msg, text: currentBotText } : msg
                    ));
                }
            }
            if (currentBotText === '') {
                setChatHistory(prev => prev.map(msg =>
                    msg.id === botMessageId ? { ...msg, text: "I'm processing that, one moment..." } : msg
                ));
            }
        } catch (err) {
            console.error("Error sending message to Gemini:", err);
            const errorText = "Sorry, I encountered an issue trying to respond. Please try again.";
            setError(errorText);
            setChatHistory(prev => prev.map(msg =>
                msg.id === botMessageId ? { ...msg, text: errorText } : msg
            ));
        } finally {
            setIsBotTyping(false);
            setShouldRefocusInput(true);
        }
    }, [userInput, isBotTyping, chatSession]);

    return (
        <div className="chatbot" id="chatbot">
            <div className="chatbot-container">
                <header className="chatbot-header">
                    <h1>Chat with Sowad's AI Assistant</h1>
                </header>

                <main className="chatbot-main">
                    {chatHistory.map((msg) => (
                        <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                            {msg.sender === 'bot' && <div className="icon-wrapper"><RiRobot2Fill className="chat-icon bot-icon" /></div>}
                            <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                                <p className='chat-text'>
                                    {msg.sender === 'bot' && isBotTyping && chatHistory[chatHistory.length - 1]?.id === msg.id ?
                                        <>
                                            <span className='dot1'>.</span> <span className='dot2'>.</span> <span className='dot3'>.</span>
                                        </> : msg.text}
                                </p>
                            </div>
                            {msg.sender === 'user' && <div className="icon-wrapper"><FaUserCircle className="chat-icon user-icon" /></div>}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </main>

                {isBotTyping && chatHistory[chatHistory.length - 1]?.sender === 'user' && (
                    <div className="typing-indicator">
                        <RiRobot2Fill className="chat-icon bot-icon" />
                        Sowad's assistant is typing...
                    </div>
                )}

                <footer className="chatbot-footer">
                    <form onSubmit={handleSendMessage} className="chat-input-form">
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder={isBotTyping ? "Waiting for response..." : "Ask about Sowad..."}
                            className="chat-input"
                            disabled={isBotTyping || !chatSession}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button type="submit" disabled={isBotTyping || !userInput.trim() || !chatSession} className="chat-send-button">
                            <IoSend className="send-icon" />
                        </button>
                    </form>
                    {error && <p className="chat-error">{error}</p>}
                </footer>
            </div>
        </div>
    );
};

export default Chatbot;