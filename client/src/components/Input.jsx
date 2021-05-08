import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './css/Input.css';

const Input = ({ setMessage, sendMessage, message }) => {
  return (
    <form className="conversation-compose">
      <button className="emoji" disabled>
        <InsertEmoticonIcon />
      </button>
      <input
        className="input-msg"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event =>
          event.key === 'Enter' ? sendMessage(event) : null
        }
      ></input>
      <div className="send">
        <button className="circle" onClick={e => sendMessage(e)}>
          <SendIcon />
        </button>
      </div>
    </form>
  );
};

export default Input;
