// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:4000');

const Chat = ({ token, conversationId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!conversationId) return;

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/messages/${conversationId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };

        fetchMessages();

        socket.emit('join conversation', conversationId);

        socket.on('chat message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.emit('leave conversation', conversationId);
            socket.off('chat message');
        };
    }, [conversationId, token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        socket.emit('chat message', { conversationId, text: newMessage });
        setNewMessage('');
    };

    return (
        <div>
            <h2>Chat</h2>
            <ul>
                {messages.map((msg) => (
                    <li key={msg._id}>{msg.text}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
