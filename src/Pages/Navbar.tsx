import React, { useState } from 'react';
import { Home, MessageCircle, User, Menu, Plus, Settings, LogOut, Bell, Search, TrendingUp } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
  hasNotification?: boolean;
  notificationCount?: number;
  description?: string;
}

interface MobileBottomNavbarProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  unreadChatsCount?: number;
}

export function Navbar({ 
  activeTab = 'home', 
  onTabChange = () => {},
  unreadChatsCount = 0 
}: MobileBottomNavbarProps) {
  const [showChatDropdown, setShowChatDropdown] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: 'home',
      icon: <Home className="w-5 h-5" />,
      activeIcon: <Home className="w-5 h-5 fill-current" />,
      label: 'Home',
      description: 'Dashboard & Overview'
    },
    {
      id: 'chats',
      icon: <MessageCircle className="w-5 h-5" />,
      activeIcon: <MessageCircle className="w-5 h-5 fill-current" />,
      label: 'Chats',
      description: 'Messages & Conversations',
      hasNotification: unreadChatsCount > 0,
      notificationCount: unreadChatsCount
    },
    {
      id: 'explore',
      icon: <TrendingUp className="w-5 h-5" />,
      activeIcon: <TrendingUp className="w-5 h-5 fill-current" />,
      label: 'Discover',
      description: 'Trending & New Features'
    },
    {
      id: 'profile',
      icon: <User className="w-5 h-5" />,
      activeIcon: <User className="w-5 h-5 fill-current" />,
      label: 'Profile',
      description: 'Your Account & Settings'
    }
  ];

  const mockChats = [
    { id: 1, name: 'Alice Johnson', lastMessage: 'Hey! How are you doing?', unread: true, time: '2m', avatar: '👩‍💼' },
    { id: 2, name: 'Team Chat', lastMessage: 'Meeting at 3 PM today', unread: true, time: '5m', avatar: '👥' },
    { id: 3, name: 'Bob Smith', lastMessage: 'Thanks for your help!', unread: false, time: '1h', avatar: '👨‍💻' },
    { id: 4, name: 'Sarah Wilson', lastMessage: 'See you tomorrow!', unread: true, time: '3h', avatar: '👩‍🎨' },
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === 'chats') {
      setShowChatDropdown(!showChatDropdown);
    } else {
      setShowChatDropdown(false);
      onTabChange(tabId);
    }
  };

  const handleChatSelect = (chatId: number) => {
    setShowChatDropdown(false);
    onTabChange('chats');
    // Handle chat selection logic here
  };

  return (
    <>
      {/* Chat dropdown overlay */}
      {showChatDropdown && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setShowChatDropdown(false)}
        />
      )}

      {/* <h1 className='text-primary'>prem</h1> */}

      {/* Enhanced Chat dropdown */}
      {showChatDropdown && (
        <div className="fixed bottom-24 left-4 right-4 z-50 animate-slide-in-from-bottom">
          <div className="bg-navbar-bg/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary/20 overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Messages</h3>
                  <p className="text-sm text-muted-foreground">{unreadChatsCount} unread conversations</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="rounded-full p-2">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-full p-2">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat list */}
            <div className="max-h-80 overflow-y-auto">
              {mockChats.map((chat, index) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatSelect(chat.id)}
                  className="w-full p-4 flex items-center space-x-4 hover:bg-primary/5 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-105 transition-transform">
                      {chat.avatar}
                    </div>
                    {chat.unread && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-unread-indicator rounded-full border-2 border-navbar-bg animate-pulse"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`font-medium truncate ${chat.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {chat.name}
                      </p>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">{chat.time}</span>
                    </div>
                    <p className={`text-sm truncate ${chat.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-t border-primary/10">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium"
                onClick={() => setShowChatDropdown(false)}
              >
                View All Messages
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Bottom navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        {/* Glassmorphism background */}
        <div className="bg-navbar-bg/80 backdrop-blur-2xl border-t border-primary/10 shadow-2xl">
          {/* Active tab indicator bar */}
          <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          
          <div className="flex items-center justify-around px-4 py-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isHovered = hoveredTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`relative flex flex-col items-center space-y-1 px-4 py-2 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-xl shadow-primary/30 scale-110 -translate-y-1'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:scale-105'
                  }`}
                >
                  {/* Glow effect for active tab */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow rounded-2xl opacity-20 animate-pulse"></div>
                  )}

                  {/* Icon container */}
                  <div className="relative z-10">
                    {isActive ? item.activeIcon : item.icon}
                    
                    {/* Notification badge */}
                    {item.hasNotification && item.notificationCount && (
                      <Badge 
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-unread-indicator text-white border-2 border-navbar-bg animate-bounce"
                        variant="destructive"
                      >
                        {item.notificationCount > 99 ? '99+' : item.notificationCount}
                      </Badge>
                    )}
                  </div>

                  {/* Label */}
                  <span className={`text-xs font-medium z-10 transition-all duration-200 ${
                    isActive ? 'font-semibold' : ''
                  }`}>
                    {item.label}
                  </span>

                  {/* Tooltip for description */}
                  {(isHovered && !isActive) && (
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-foreground text-background text-xs rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                      {item.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Enhanced Menu dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onMouseEnter={() => setHoveredTab('menu')}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`relative flex flex-col items-center space-y-1 px-4 py-2 rounded-2xl transition-all duration-300 group ${
                    activeTab === 'menu'
                      ? 'bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-xl shadow-primary/30 scale-110 -translate-y-1'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:scale-105'
                  }`}
                >
                  <div className="relative z-10">
                    <Menu className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium z-10">Menu</span>

                  {/* Tooltip */}
                  {(hoveredTab === 'menu' && activeTab !== 'menu') && (
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-foreground text-background text-xs rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                      Settings & More
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 mb-4 bg-navbar-bg/95 backdrop-blur-xl border-primary/20 shadow-2xl rounded-2xl"
                sideOffset={12}
              >
                <div className="p-2 space-y-1">
                  <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Settings className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Settings</span>
                      <p className="text-xs text-muted-foreground">Customize your experience</p>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Notifications</span>
                      <p className="text-xs text-muted-foreground">Manage alerts & sounds</p>
                    </div>
                  </DropdownMenuItem>
                  
                  <div className="h-px bg-border my-2"></div>
                  
                  <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-xl hover:bg-destructive/10 transition-colors cursor-pointer text-destructive">
                    <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <LogOut className="w-4 h-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Sign Out</span>
                      <p className="text-xs text-destructive/70">Exit your account</p>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}