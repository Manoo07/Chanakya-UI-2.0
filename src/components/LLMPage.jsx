import React from "react";
import ChatWindow from "./ChatWindow";


function LLMPage({ setUrl, messages, sendMessage, url }) {
  if (!url.includes(`http://192.168.34.15:8005/api/v1/query/1/`)) {
    setUrl("http://192.168.34.15:8005/api/v1/query/1/");
  }
  return (
    <div className="w-full">
      <ChatWindow messages={messages} sendMessage={sendMessage} />
    </div>
  );
}

export default LLMPage;
