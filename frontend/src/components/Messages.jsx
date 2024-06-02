// src/components/Messages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = ({ token, conversationId, currentUserId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/conversations/${conversationId}/messages`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [token, conversationId]);

    return (
        <div style={styles.messagesContainer}>
            {messages.map(message => (
                <div
                    key={message._id}
                    style={{
                        ...styles.message,
                        alignSelf: message.sender === currentUserId ? 'flex-end' : 'flex-start',
                        backgroundColor: message.sender === currentUserId ? '#dcf8c6' : '#fff',
                    }}
                >
                    {message.text}
                </div>
            ))}
        </div>
    );
};

const styles = {
    messagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        overflowY: 'auto',
        height: 'calc(100% - 50px)', // Adjust based on your header/footer
    },
    message: {
        maxWidth: '60%',
        margin: '5px 0',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #ccc',
    },
};

export default Messages;
