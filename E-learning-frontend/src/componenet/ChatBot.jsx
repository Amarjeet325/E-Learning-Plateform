import React, { useState } from 'react';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi, I'm EduBot! Ask me anything about our courses ." }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = { from: 'user', text: input };
//     const botReply = {
//       from: 'bot',
//       text: "Thanks for your question! We'll get back to you soon. 😊"
//     };

//     setMessages([...messages, userMessage, botReply]);
//     setInput('');
//   };
const handleSend = async () => {
  const trimmedInput = input.trim();
  if (!trimmedInput) return;

  const userMessage = { from: 'user', text: trimmedInput };
  setMessages((prev) => [...prev, userMessage]);
  setInput('');

  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: trimmedInput }),
    });

    const data = await response.json();
    const replyText = data?.reply || "Sorry, I didn't understand that.";

    const botReply = { from: 'bot', text: replyText };
    setMessages((prev) => [...prev, botReply]);
  } catch (error) {
    console.error('Error contacting backend:', error);
    setMessages((prev) => [
      ...prev,
      { from: 'bot', text: 'Something went wrong with the backend call.' },
    ]);
  }
};


  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen && (
        <div style={{
          width: '300px',
          height: '400px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)'
        }}>
          <div style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', fontWeight: 'bold' }}>
            EduBot
          </div>
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', marginBottom: '8px' }}>
                <span style={{
                  backgroundColor: msg.from === 'user' ? '#dcf8c6' : '#f1f0f0',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  display: 'inline-block'
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask something..."
              style={{ flex: 1, border: 'none', padding: '10px' }}
            />
            <button onClick={handleSend} style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0 15px'
            }}>Send</button>
          </div>
        </div>
      )}
      <button onClick={toggleChat} style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px',
        borderRadius: '50%',
        border: 'none',
        fontSize: '20px'
      }}>
        💬
      </button>
    </div>
  );
}

export default ChatBot;
