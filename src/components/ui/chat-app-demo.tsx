import React, { useState } from 'react';
import { MobileBottomNavbar } from './mobile-bottom-navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Zap, Heart } from 'lucide-react';

interface ChatAppDemoProps {}

export function ChatAppDemo({}: ChatAppDemoProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [unreadChats, setUnreadChats] = useState(3);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                <MessageCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-primary">ChatFlow</h1>
              <p className="text-muted-foreground">Connect with friends instantly</p>
            </div>

            <div className="grid gap-4">
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Active Groups</h3>
                    <p className="text-sm text-muted-foreground">5 groups with new messages</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground">Start a new conversation</p>
                  </div>
                </div>
              </Card>
            </div>

            <Button 
              onClick={() => setUnreadChats(prev => prev + 1)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Simulate New Message (+{unreadChats + 1})
            </Button>
          </div>
        );

      case 'chats':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Messages</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">Chat {i}</h4>
                      <p className="text-sm text-muted-foreground">Last message preview...</p>
                    </div>
                    <div className="text-xs text-muted-foreground">2m</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'explore':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Explore</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4 text-center space-y-2 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground">Feature {i}</h4>
                  <p className="text-xs text-muted-foreground">Discover new content</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground text-2xl font-bold">
                JD
              </div>
              <h2 className="text-2xl font-bold text-primary">John Doe</h2>
              <p className="text-muted-foreground">@johndoe</p>
            </div>

            <div className="space-y-3">
              <Card className="p-4">
                <h4 className="font-medium text-foreground mb-2">Stats</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">42</div>
                    <div className="text-xs text-muted-foreground">Chats</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">128</div>
                    <div className="text-xs text-muted-foreground">Friends</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">5</div>
                    <div className="text-xs text-muted-foreground">Groups</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Main content with proper padding */}
      <div className="max-w-md mx-auto p-6">
        {renderContent()}
      </div>

      {/* Bottom navbar */}
      <MobileBottomNavbar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadChatsCount={unreadChats}
      />
    </div>
  );
}