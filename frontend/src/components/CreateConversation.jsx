// src/components/CreateConversation.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateConversation = ({ token,setConversationId }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const data= await axios.post('http://localhost:4000/api/conversations', { participants:[username] }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data.data)
            setConversationId(data.data._id)
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter username " 
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateConversation;
