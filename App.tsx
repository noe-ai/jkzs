import React, { useState } from 'react';
import { Clock, Bell, Pill, Calendar, CheckCircle, AlertCircle, ChevronRight, Plus, Home, List, Settings, User, Heart, Box, RefreshCcw, AlertTriangle, ChevronDown, MoreVertical, XCircle, MessageSquare, Send, Bot } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [showMedicineDetails, setShowMedicineDetails] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'assistant',
      content: '您好！我是您的AI医生助理。请描述您的症状或健康问题，我会尽力为您提供专业的建议。'
    }
  ]);

  const nextMedication = {
    name: "血压药",
    time: "09:00",
    dosage: "1片",
    status: "pending"
  };

  const medicines = [
    { name: "血压药", stock: 12, expiry: "2024-05-20", dosage: "1片/次 一日2次", notes: "饭后服用" },
    { name: "降糖药", stock: 24, expiry: "2024-06-15", dosage: "1片/次 一日3次", notes: "餐前30分钟" },
    { name: "心脏药", stock: 8, expiry: "2024-04-30", dosage: "1片/次 一日1次", notes: "早晨服用" },
  ];

  const settings = [
    { icon: <Bell className="w-6 h-6" />, title: "提醒设置", desc: "声音、震动、时间" },
    { icon: <User className="w-6 h-6" />, title: "个人信息", desc: "基本信息、病史" },
    { icon: <Heart className="w-6 h-6" />, title: "健康档案", desc: "体检报告、用药记录" },
    { icon: <AlertTriangle className="w-6 h-6" />, title: "紧急联系人", desc: "家人、主治医生" },
  ];

  const handleSkip = () => {
    alert('已跳过本次用药');
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // 添加用户消息
    setChatHistory(prev => [...prev, { type: 'user', content: message }]);

    // 模拟AI回复
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: '我理解您的情况。根据您描述的症状，我建议您：\n\n1. 保持规律作息\n2. 注意饮食均衡\n3. 适当运动\n\n如果症状持续，建议您及时就医。'
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 py-3 shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-lg mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">用药助手</h1>
            <p className="text-lg text-gray-600">现在时间: {currentTime}</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MoreVertical className="w-6 h-6 text-gray-600" />
            </button>
            {showMoreOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-20">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                  导出用药记录
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                  分享给家人
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                  联系客服
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-20 pb-24">
        {activeTab === 'home' && (
          <>
            {/* Next Medication Alert */}
            <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">下一次用药提醒</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{nextMedication.time}</p>
                    <p className="text-lg text-gray-600">{nextMedication.name} - {nextMedication.dosage}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleSkip}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-lg hover:bg-gray-300 active:bg-gray-400 transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-5 h-5" />
                    跳过
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-600 active:bg-green-700 transition-colors">
                    已服用
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="bg-white p-4 rounded-xl shadow-md flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <Plus className="w-6 h-6 text-purple-500" />
                <span className="text-lg font-medium">添加药品</span>
              </button>
              <button className="bg-white p-4 rounded-xl shadow-md flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <Bell className="w-6 h-6 text-orange-500" />
                <span className="text-lg font-medium">设置提醒</span>
              </button>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">今日用药计划</h2>
              <div className="space-y-3">
                {[
                  { time: '09:00', name: '血压药', status: 'completed' },
                  { time: '12:00', name: '降糖药', status: 'pending' },
                  { time: '18:00', name: '心脏药', status: 'pending' }
                ].map((med, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Pill className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-lg font-medium">{med.time}</p>
                        <p className="text-base text-gray-600">{med.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {med.status === 'pending' && (
                        <button 
                          onClick={handleSkip}
                          className="text-gray-500 hover:text-gray-700 p-2"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                      {med.status === 'pending' ? (
                        <AlertCircle className="w-6 h-6 text-orange-500" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'list' && (
          <div className="space-y-4">
            {medicines.map((medicine, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setShowMedicineDetails(!showMedicineDetails)}
                >
                  <div className="flex items-center gap-3">
                    <Box className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold">{medicine.name}</h3>
                      <p className="text-sm text-gray-600">库存: {medicine.stock}片</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreOptions(!showMoreOptions);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showMedicineDetails ? 'transform rotate-180' : ''}`} />
                  </div>
                </div>
                {showMedicineDetails && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500">用法用量：</span>
                        <span className="text-gray-700">{medicine.dosage}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">有效期至：</span>
                        <span className="text-gray-700">{medicine.expiry}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">服用说明：</span>
                        <span className="text-gray-700">{medicine.notes}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button className="fixed bottom-20 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      chat.type === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-white shadow-md rounded-bl-none'
                    }`}
                  >
                    {chat.type === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-blue-500">AI医生</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{chat.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-2xl shadow-md p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="请描述您的症状..."
                  className="flex-1 bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-colors"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            {settings.map((setting, index) => (
              <button key={index} className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-blue-500">
                    {setting.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">{setting.title}</h3>
                    <p className="text-sm text-gray-600">{setting.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white fixed bottom-0 left-0 right-0 shadow-lg border-t">
        <div className="max-w-lg mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 flex flex-col items-center py-3 ${
              activeTab === 'home' ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-sm mt-1">首页</span>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 flex flex-col items-center py-3 ${
              activeTab === 'list' ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            <List className="w-6 h-6" />
            <span className="text-sm mt-1">药品</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 flex flex-col items-center py-3 ${
              activeTab === 'ai' ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm mt-1">AI问诊</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 flex flex-col items-center py-3 ${
              activeTab === 'settings' ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-sm mt-1">设置</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;