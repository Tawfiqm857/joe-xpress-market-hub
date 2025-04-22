import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Assuming ThemeContext exists at this path
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react"; // Assuming lucide-react is installed
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cva } from "class-variance-authority"; // Assuming class-variance-authority is installed
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

// Assuming cn and buttonVariants are defined elsewhere, e.g., in "@/lib/utils" and "@/components/ui/button"
// Since the implementation is not provided, we'll define placeholder functions.
// In a real scenario, these should be replaced with the actual implementations.
const cn = (...inputs) => {
  // Placeholder implementation for cn
  return inputs.filter(Boolean).join(' ');
};

const buttonVariants = (options) => {
  // Placeholder implementation for buttonVariants
  // This would typically return class names based on variants
  let classes = 'button-base-class'; // Base class
  if (options?.variant === 'outline') {
    classes += ' button-outline-variant';
  }
  // Add more variant logic as needed
  return classes;
};


// --- ContactModal.js ---

// TypeScript interfaces Seller and ContactModalProps are removed as they are not used in JavaScript.
// Type annotations like React.FC<ContactModalProps> and e: React.FormEvent are removed.

const ContactModal = ({ isOpen, onClose, seller }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the message to an API
    console.log(`Message to ${seller.name}: ${message}`);
    setMessageSent(true);
    // In a real app, we'd wait for the API response
    // For now, we'll just simulate a successful message
    setMessage('');
  };

  return (
    React.createElement('div', {
      style: {
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
      }
    },
      React.createElement('div', {
        style: {
          backgroundColor: theme === 'light' ? 'white' : '#1e1e1e',
          borderRadius: '8px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }
      },
        React.createElement('button', {
          onClick: onClose,
          style: {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: theme === 'light' ? '#001f3f' : '#ffffff',
          }
        },
          '✕'
        ),

        React.createElement('h2', {
          style: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: theme === 'light' ? '#001f3f' : '#ffffff',
          }
        },
          `Contact ${seller.name}`
        ),

        messageSent ? (
          React.createElement('div', { style: { textAlign: 'center' } },
            React.createElement('div', {
              style: {
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
              }
            },
              'Message sent successfully!'
            ),
            React.createElement('p', { style: { marginBottom: '1.5rem' } },
              `${seller.name} will get back to you shortly.`
            ),
            React.createElement('button', {
              onClick: onClose,
              className: "btn btn-primary", // Assuming these CSS classes exist
              style: { width: '100%' }
            },
              'Close'
            )
          )
        ) : (
          React.createElement(React.Fragment, null,
            React.createElement('div', { style: { marginBottom: '1.5rem' } },
              React.createElement('p', { style: { marginBottom: '0.5rem' } }, React.createElement('strong', null, 'Name:'), ` ${seller.name}`),
              React.createElement('p', { style: { marginBottom: '0.5rem' } }, React.createElement('strong', null, 'Location:'), ` ${seller.location}`),
              React.createElement('p', null, React.createElement('strong', null, 'Phone:'), ` ${seller.phone}`)
            ),

            React.createElement('form', { onSubmit: handleSubmit },
              React.createElement('div', { className: "form-group" }, // Assuming these CSS classes exist
                React.createElement('label', { htmlFor: "message", className: "form-label" }, 'Message'), // Assuming these CSS classes exist
                React.createElement('textarea', {
                  id: "message",
                  className: "form-control", // Assuming these CSS classes exist
                  value: message,
                  onChange: (e) => setMessage(e.target.value),
                  placeholder: "Hello, I'm interested in your product...",
                  rows: 5,
                  required: true,
                  style: {
                    resize: 'vertical',
                    minHeight: '100px',
                  }
                })
              ),

              React.createElement('button', {
                type: "submit",
                className: "btn btn-accent", // Assuming these CSS classes exist
                style: { width: '100%' },
                disabled: !message.trim()
              },
                'Send Message'
              )
            )
          )
        )
      )
    )
  );
};

// Exporting ContactModal - adjust export based on project structure if needed
// export default ContactModal; // Use this if it's the main export of the file
// Or use named export:
export { ContactModal };

