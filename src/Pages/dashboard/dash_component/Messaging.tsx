import { useState } from 'react';
import { Search, Send, Paperclip, Smile, Phone, Video, MoreVertical } from 'lucide-react';

export const Messaging = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);

  const chats = [
    { id: 1, name: 'Alice Johnson', avatar: 'AJ', lastMessage: 'Thanks for the quick response!', time: '2m', unread: 2, online: true },
    { id: 2, name: 'Bob Smith', avatar: 'BS', lastMessage: 'When can we schedule the meeting?', time: '15m', unread: 0, online: false },
    { id: 3, name: 'Carol Davis', avatar: 'CD', lastMessage: 'Perfect! I\'ll send the documents.', time: '1h', unread: 1, online: true },
    { id: 4, name: 'David Wilson', avatar: 'DW', lastMessage: 'Looking forward to working together.', time: '2h', unread: 0, online: false }
  ];

  const messages = [
    { id: 1, sender: 'Alice Johnson', message: 'Hi! I\'m interested in your services.', time: '10:30 AM', isOwn: false },
    { id: 2, sender: 'You', message: 'Hello Alice! Thanks for reaching out. I\'d be happy to help you with your project.', time: '10:32 AM', isOwn: true },
    { id: 3, sender: 'Alice Johnson', message: 'Great! Can you provide more details about your pricing packages?', time: '10:35 AM', isOwn: false },
    { id: 4, sender: 'You', message: 'Absolutely! I have several packages available. Let me send you the details.', time: '10:37 AM', isOwn: true },
    { id: 5, sender: 'Alice Johnson', message: 'Thanks for the quick response!', time: '10:45 AM', isOwn: false }
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary">Messages</h2>
        <p className="text-gray-600">Communicate with your leads and clients</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '70vh' }}>
        <div className="flex h-full flex-col md:flex-row">

          {/* Chat List */}
          <div className={`w-full md:w-1/3 border-r border-gray-200 flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat.id);
                    setShowMobileChat(true);
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id ? 'bg-primary/10 border-r-2 border-r-primary' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 ml-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <span className="bg-primary text-white text-xs rounded-full px-2 py-1 ml-2">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Content */}
          <div className={`w-full md:flex-1 flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
            {/* Mobile Back Button */}
            <div className="md:hidden p-4 border-b border-gray-200">
              <button
                onClick={() => setShowMobileChat(false)}
                className="text-primary hover:underline"
              >
                ← Back to chats
              </button>
            </div>

            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedChatData?.avatar}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{selectedChatData?.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedChatData?.online ? 'Online' : 'Last seen 2h ago'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {[Phone, Video, MoreVertical].map((Icon, idx) => (
                  <button
                    key={idx}
                    className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isOwn
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  <Paperclip size={18} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-primary">
                    <Smile size={18} />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
