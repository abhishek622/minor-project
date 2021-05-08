import React from 'react';

import './css/Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer2">
      <div className="messageBox backgroundLight">
        {ReactEmoji.emojify(text)}
      </div>
    </div>
  ) : (
    <div className="messageContainer">
      <div className="messageBox backgroundGreen">
        <div className="sentText">{user}</div>
        {ReactEmoji.emojify(text)}
      </div>
    </div>
  );
};

export default Message;
