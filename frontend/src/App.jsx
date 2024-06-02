// src/App.jsx
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Conversations from './components/Conversations';
import CreateConversation from './components/CreateConversation';
import Chat from './components/Chat';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [conversationId, setConversationId] = useState('');
    const currentUserId =localStorage.getItem('userId')

    return (
        <div>
            {!token ? (
                <>
                    <Register />
                    <Login setToken={setToken} />
                </>
            ) : (
                <>
                    <CreateConversation token={token} setConversationId={setConversationId} />
                    <Conversations token={token} setConversationId={setConversationId} currentUserId={currentUserId} />
                    {conversationId && <Chat token={token} conversationId={conversationId} currentUserId={currentUserId} />}
                </>
            )}
        </div>
    );
};

export default App;
