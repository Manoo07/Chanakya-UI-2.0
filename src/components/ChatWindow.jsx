import React from "react";
import MessageList from "./MessageList";
import UserInput from "./UserInput";


const ChatWindow = ({ messages, sendMessage, setUrl, loading }) => {
  let session_id = localStorage.session_id;
  // setUrl(`http://127.0.0.1:8005/api/v1/query/1/${session_id}`)
  return (
    <div className="flex flex-col h-full w-full">
      {/* {setUrl(`http://127.0.0.1:8005/api/v1/query/1/${session_id}`)} */}
      <MessageList messages={messages} loading={loading} />
      
      {/* {loading && <Loader className="self-center mt-4" />}  */}
      <UserInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
