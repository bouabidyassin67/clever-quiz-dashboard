
import React from 'react';
import { useUserStore, useSidebarStore } from '@/lib/store';
import { Menu, Search, Bell, MessageSquare, Sun } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user } = useUserStore();
  const { toggle } = useSidebarStore();

  return (
    <header className="h-16 border-b border-lms-card bg-lms-dark flex items-center justify-between px-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggle} 
          className="mr-2 text-gray-400"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search..." 
            className="pl-10 bg-gray-900/50 border-gray-700 text-gray-300 h-9 rounded-lg" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-gray-400">
          <Sun className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-400">
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-400 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-lms-purple rounded-full"></span>
        </Button>
        
        <Avatar className="h-9 w-9 bg-gray-800 border border-gray-700">
          <AvatarFallback className="bg-lms-purple text-white font-medium">
            {user?.avatar || 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
