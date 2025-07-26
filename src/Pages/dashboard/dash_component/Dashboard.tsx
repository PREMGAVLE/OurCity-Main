
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
 
 
 
import { Settings } from './Settings';
import Overview from './Overview';
import { LeadsManagement } from './LeadsManagement';
import  {BusinessListings} from './BusinessListings';
import { Messaging } from './Messaging';
 

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'leads':
        return <LeadsManagement />;
      case 'listings':
        return <BusinessListings />;
      case 'settings':
        return <Settings />;
      case 'messaging':
        return <Messaging />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
