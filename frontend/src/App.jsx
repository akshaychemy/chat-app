// src/App.jsx
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Conversations from './components/Conversations';
import CreateConversation from './components/CreateConversation';
import Chat from './components/Chat';

const App = () => {
    const [token, setToken] = useState('');
    const [conversationId, setConversationId] = useState('');

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
                    <Conversations token={token} setConversationId={setConversationId} />
                    {conversationId && <Chat token={token} conversationId={conversationId} />}
                </>
            )}
        </div>
    );
};

export default App;
