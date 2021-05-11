import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

import "./Messages.css";

const Messages = ({ messages, fromName, toName }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} fromName={fromName} toName={toName} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
