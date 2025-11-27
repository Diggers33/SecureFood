import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './components/ui/button';
import logo from 'figma:asset/0b1421920cd05c30167bc2f1b4561847aa348ba5.png';
import Screen0 from './components/Screen0';
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';
import Screen4 from './components/Screen4';
import Screen5 from './components/Screen5';
import Screen6 from './components/Screen6';
import Screen7 from './components/Screen7';
import Screen8 from './components/Screen8';
import Screen15 from './components/Screen15';
import Screen16 from './components/Screen16';
import Screen18 from './components/Screen18';
import Screen19 from './components/Screen19';
import SimulationsPage from './components/SimulationsPage';
import ReportsPage from './components/ReportsPage';
import MonitoringPage from './components/MonitoringPage';
import GrainCaseStudy from './components/GrainCaseStudy';
import FishCaseStudy from './components/FishCaseStudy';
import FruitVegetablesCaseStudy from './components/FruitVegetablesCaseStudy';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [selectedUseCase, setSelectedUseCase] = useState<number | null>(null);

  const menuItems = ['Dashboard', 'Monitoring', 'Simulations', 'Reports'];

  // Map use case IDs to sector names
  const useCaseToSector = (useCaseId: number): 'grain' | 'fruits' | 'fish' => {
    switch (useCaseId) {
      case 1:
        return 'grain';
      case 2:
        return 'fruits';
      case 3:
        return 'fish';
      default:
        return 'grain';
    }
  };

  const handleUseCaseClick = (useCaseId: number) => {
    setSelectedUseCase(useCaseId);
    setActiveMenu('Dashboard'); // Reset to Dashboard when selecting a use case
  };

  const handleBackToUseCases = () => {
    setSelectedUseCase(null);
    setActiveMenu('Dashboard');
  };

  const handleLogoClick = () => {
    setSelectedUseCase(null);
    setCurrentScreen(0);
    setActiveMenu('Dashboard');
  };

  const screens = [
    <Screen0 onUseCaseClick={handleUseCaseClick} />,
    <Screen8 />,
    <Screen3 />,
    <Screen4 />,
    <Screen5 />,
    <Screen6 />,
    <Screen7 />,
    <Screen2 />,
    <Screen15 />,
    <Screen16 />,
    <Screen18 />,
    <Screen19 />,
  ];

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Navigation */}
      <div className="flex-shrink-0 shadow-sm">
        {/* Top bar with logo and menu */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
            <img
              src={logo}
              alt="SecureFood"
              className="h-12 cursor-pointer"
              onClick={handleLogoClick}
            />
            
            {/* Menu - only show after use case is selected */}
            {selectedUseCase !== null && (
              <nav className="flex gap-8">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveMenu(item)}
                    className={`text-sm transition-colors hover:text-teal-600 text-gray-700 ${
                      activeMenu === item ? 'border-b-2 border-teal-600 pb-1 text-teal-700' : ''
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {selectedUseCase !== null ? (
          // Show content based on menu selection for the selected use case
          activeMenu === 'Dashboard' ? (
            // Dashboard shows the case study landing page
            selectedUseCase === 1 ? (
              <GrainCaseStudy onBack={handleBackToUseCases} />
            ) : selectedUseCase === 2 ? (
              <FruitVegetablesCaseStudy onBack={handleBackToUseCases} />
            ) : selectedUseCase === 3 ? (
              <FishCaseStudy onBack={handleBackToUseCases} />
            ) : null
          ) : activeMenu === 'Monitoring' ? (
            <MonitoringPage initialSector={useCaseToSector(selectedUseCase)} />
          ) : activeMenu === 'Simulations' ? (
            <SimulationsPage initialSector={useCaseToSector(selectedUseCase)} />
          ) : activeMenu === 'Reports' ? (
            <ReportsPage initialSector={useCaseToSector(selectedUseCase)} />
          ) : null
        ) : (
          // No use case selected - show Screen0
          screens[currentScreen]
        )}
      </div>
    </div>
  );
}