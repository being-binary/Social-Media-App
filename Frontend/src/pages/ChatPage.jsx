import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/AxiosInstance';
import { useLocation } from 'react-router-dom';
import { socket, SocketSlice } from '../app/slices/SocketSlice';
import {useSelector} from 'react-redux'

export default function ChatPage() {
  const location = useLocation()
  const user = useSelector((state)=>state.user)
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    fetchMessage()
  }, []);
  useEffect(()=>{
    socket.on('reply',(ans)=>{
      fetchMessage()
    })
},[])

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const newMessage = {
      text: input,
      sender: user?.entities?._id,
      receiver: location?.state,
      name:user?.entities?.name?.firstName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const response = await axiosInstance.post(`/message/sendmessage/${location.state}`, {messages : newMessage.text})
    const data = response.data
    console.log(data)
    socket.emit('message', newMessage)
    fetchMessage()
    setInput('');
  };

  const fetchMessage = async ()=>{
    const response = await axiosInstance.get(`/message/getmessages/${location.state}`)
    const data = response.data
    if(data.success){
      if(data.data != null){
        setMessages(data.data.message)
        setMembers(data.data.members)
        console.log(data)
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-gray-200 rounded-lg shadow-md flex flex-col h-[100dvh] sm:h-[600px]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-white rounded-md shadow-inner">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${msg.sender._id === user?.entities?._id ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender._id._id !== user?.entities?._id && (
              <img src={msg.receiver[0]?.profilePic?.secure_url} alt="avatar" className="w-8 h-8 rounded-full self-start" />
            )}
            <div className="max-w-[80%]">
              <p className={`text-xs font-semibold mb-1 ${msg.sender._id._id === user?.entities?._id ? 'text-right' : 'text-left'}`}>{msg?.sender?.name?.firstName.concat(' ', msg?.sender?.name?.lastName)}</p>
              <div
                className={`rounded-xl px-4 py-2 text-white text-sm ${
                  msg.sender._id._id === user?.entities?._id ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                {msg.message}
              </div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {msg.time}
              </div>
            </div>
            {msg.sender._id._id === user?.entities?._id && (
              <img src={msg.sender?.profilePic?.secure_url} alt="avatar" className="w-8 h-8 rounded-full self-start" />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="mt-2 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}