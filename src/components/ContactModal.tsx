
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface Seller {
  id?: number;
  name: string;
  location: string;
  phone: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: Seller;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, seller }) => {
  const { theme } = useContext(ThemeContext);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  
  // When the modal closes, reset the message sent state
  useEffect(() => {
    if (!isOpen) {
      setMessageSent(false);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to an API
    console.log(`Message to ${seller.name}: ${message}`);
    setMessageSent(true);
    // In a real app, we'd wait for the API response
    // For now, we'll just simulate a successful message
    setMessage('');
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: theme === 'light' ? '#001f3f' : '#ffffff',
          }}
        >
          ✕
        </button>
        
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: theme === 'light' ? '#001f3f' : '#ffffff',
        }}>
          Contact {seller.name}
        </h2>
        
        {messageSent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              backgroundColor: '#4CAF50', 
              color: 'white',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
            }}>
              Message sent successfully!
            </div>
            <p style={{ marginBottom: '1.5rem' }}>
              {seller.name} will get back to you shortly.
            </p>
            <button 
              onClick={onClose}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>Name:</strong> {seller.name}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> {seller.location}</p>
              <p><strong>Phone:</strong> {seller.phone}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hello, I'm interested in your product..."
                  rows={5}
                  required
                  style={{
                    resize: 'vertical',
                    minHeight: '100px',
                  }}
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="btn btn-accent"
                style={{ width: '100%' }}
                disabled={!message.trim()}
              >
                Send Message
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
