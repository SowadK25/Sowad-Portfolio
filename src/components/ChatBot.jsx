import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/ChatBot.css';
import { FaUserCircle } from 'react-icons/fa';
import { RiRobot2Fill } from 'react-icons/ri';
import { IoSend } from 'react-icons/io5';
import { useIsMobile } from '../hooks/useIsMobile';

const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [error, setError] = useState(null);
    const isMobile = useIsMobile();

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [shouldRefocusInput, setShouldRefocusInput] = useState(false);
    const hasScrolled = useRef(false);

    const initialGreeting = "Hello! I'm Sowad's portfolio assistant. How can I help you learn more about him today?"

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // For handling the scroll to bottom when chat history updates
    useEffect(() => {
        if (isMobile) return;

        if (hasScrolled.current) {
            scrollToBottom();
        } else {
            hasScrolled.current = true;
        }
    }, [chatHistory, isMobile]);

    // For refocusing the input field after sending a message
    useEffect(() => {
        if (shouldRefocusInput && !isMobile) {
            inputRef.current?.focus();
            setShouldRefocusInput(false);
        }
    }, [shouldRefocusInput, isMobile]);

    // Initialize the chat session when the component mounts
    useEffect(() => {
        const initialBotMessage = {
            id: `bot-init-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            sender: 'bot',
            text: initialGreeting,
            timestamp: Date.now(),
        };
        hasScrolled.current = false;
        setChatHistory([initialBotMessage]);
    }, []);

    // Handle sending messages
    const handleSendMessage = useCallback(async (e) => {
        if (e) e.preventDefault();
        const currentInput = userInput.trim();
        if (!currentInput || isBotTyping) return;

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
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: currentInput,
                    history: chatHistory
                        .map(msg => ({
                            role: msg.sender === 'user' ? 'user' : 'model',
                            parts: [{ text: msg.text }],
                        })),
                }),
            });
            const data = await response.json();
            if (data.text) {
                setChatHistory(prev => prev.map(msg =>
                    msg.id === botMessageId ? { ...msg, text: data.text } : msg
                ));
            } else {
                throw new Error(data.error || 'No reply');
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
            setShouldRefocusInput(!isMobile);
        }
    }, [userInput, isBotTyping]);

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
                            disabled={isBotTyping}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button type="submit" disabled={isBotTyping || !userInput.trim()} className="chat-send-button">
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