import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ContactsView } from './components/ContactsView';
import { ConversationsView } from './components/ConversationsView';
import { FlowsView } from './components/FlowsView';
import { CampaignsView } from './components/CampaignsView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'contacts':
        return <ContactsView />;
      case 'conversations':
        return <ConversationsView />;
      case 'flows':
        return <FlowsView />;
      case 'campaigns':
        return <CampaignsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}

export default App;