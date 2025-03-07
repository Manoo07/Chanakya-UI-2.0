import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import FileUploadPage from "./components/fileUploadPage";
import NavBar from "./components/NavBar";
import LLMPage from "./components/LLMPage";



const getMessageFromGenAI = async (user, url, setUrl) => {
  try {
    const response = await axios.post(url, {
      user,
    });
    const session_id = response.data.session_id;
    localStorage.setItem("session_id", session_id);
    if (!url.includes(session_id)) {
      const newUrl = `${url}${session_id}`;
      setUrl(newUrl);
    }

    return response.data.bot;
  } catch (error) {
    console.error("Error communicating with GenAI API:", error);
    return "An error occurred. Please try again.";
  }
};

const DatabaseChatWindow = ({ messages, sendMessage, setUrl }) => {
  useEffect(() => {
    let session_id = localStorage.session_id;
    console.log(session_id);
    setUrl(`http://192.168.34.30:8005/api/v1/sql-query/1/${session_id}`);
  }, []);

  return (
    <div className="container flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 md:mb-0 md:mt-8">
        Query on rev_rec_tabx table
      </h1>
      <ChatWindow messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("http://192.168.34.30:8005/api/v1/query/1/");
  const location = useLocation();
  const navigate = useNavigate();

  const sendMessage = async (userInput) => {
    // const response = await axios.get(`http://192.168.34.30:8005/api/v1/user/1/conversations`);

    // const prevMessages = response.data.previous_chat;

    setLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: userInput },
    ]);

    const GenAIResponse = await getMessageFromGenAI(userInput, url, setUrl);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", content: GenAIResponse },
    ]);

    setLoading(false);
  };

  useEffect(() => {
    if (
      location.pathname === "/query/pdf" ||
      location.pathname === "/query/database"
    ) {
      setMessages([]);
    }
  }, [location.pathname]);
  return (
    <>
    {loading && <Loader/>}
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        {/* <h1 className="text-4xl font-bold mb-4 flex justify-end">
          <button onClick={() => { navigate('/') }}>Generative AI</button>
        </h1> */}
        <div className="flex items-start w-full">
          <Routes>
            <Route
              path="/query/pdf"
              element={
                <FileUploadPage
                  setUrl={setUrl}
                  messages={messages}
                  sendMessage={sendMessage}
                />
              }
            />
            <Route
              path="/"
              element={
                <LLMPage
                  setUrl={setUrl}
                  url={url}
                  messages={messages}
                  sendMessage={sendMessage}
                />
              }
            />
            <Route
              path="/query/database"
              element={
                <DatabaseChatWindow
                  messages={messages}
                  sendMessage={sendMessage}
                  setUrl={setUrl}
                />
              }
            />
          </Routes>
        </div>
        {/* {location.pathname !== '/query/pdf' && <UploadButton />}
      {location.pathname !== '/query/database' && <QueryDbButton/>} */}
      </div>
      </div>
    </>
  );
};

export default App;
