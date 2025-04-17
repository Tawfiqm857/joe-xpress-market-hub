
import React from 'react';
import EmptyState from './EmptyState';

const MessagesContent = () => {
  return (
    <EmptyState 
      type="messages"
      message="When buyers contact you about your products, their messages will appear here."
    />
  );
};

export default MessagesContent;
