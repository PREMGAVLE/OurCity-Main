import { Bell, Search, User, Menu } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left section: Title & Mobile menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} className="text-gray-600" />
          </button>

          <h2 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
            Dashboard
          </h2>
        </div>

        {/* Right section: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Input (desktop only) */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-48 lg:w-64 text-sm"
            />
          </div>

          {/* Mobile Search Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Notification Icon */}
          <button
            className="relative p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
