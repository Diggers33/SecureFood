import { Wheat, Apple, Fish, Droplet, Milk, Check, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { Card } from './ui/card';

interface Screen0Props {
  onUseCaseClick?: (useCaseId: number) => void;
}

const useCases = [
  {
    id: 1,
    title: 'GRAIN',
    location: 'Ucrania',
    partner: 'UCAB',
    description: 'Analyze war impacts, price volatility & logistics disruptions',
    icon: Wheat,
    iconColor: '#3d7c7a', // Warmer teal
    active: true
  },
  {
    id: 2,
    title: 'FRUITS & VEGETABLES',
    location: 'Portugal',
    partner: 'MC',
    description: 'Monitor drought effects on crop yield & quality',
    icon: Apple,
    iconColor: '#2d8b89', // Lighter cyan-teal
    active: true
  },
  {
    id: 3,
    title: 'FISH',
    location: 'Grecia',
    partner: 'ELGO',
    description: 'Track red tide events & production disruptions',
    icon: Fish,
    iconColor: '#2d6b6a', // Primary teal
    active: true
  },
  {
    id: 4,
    title: 'AQUACULTURE',
    location: 'Bélgica',
    partner: 'BIGH',
    description: 'Plan for heat wave mitigation & health management',
    icon: Droplet,
    iconColor: '#3d8b8a', // Bright teal
    active: false
  },
  {
    id: 5,
    title: 'MILK & DAIRY',
    location: 'Grecia/Finlandia',
    partner: 'ELGO, LUKE',
    description: 'Evaluate heat stress & cold chain logistics',
    icon: Milk,
    iconColor: '#4a7c7a', // Slate-teal
    active: false
  }
];

export default function Screen0({ onUseCaseClick }: Screen0Props) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white shadow-sm rounded-full mb-6 border border-gray-200">
            <Sparkles className="w-4 h-4" style={{ color: '#2d6b6a' }} />
            <span className="text-sm" style={{ color: '#2d6b6a' }}>Digital Twin Analytics Platform</span>
          </div>
          <h1 className="text-5xl text-gray-800 mb-4">
            Select Your <span style={{ color: '#2d6b6a' }}>Supply Chain</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">Explore interactive case studies and real-time analytics</p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Click on any sector card below to dive into detailed risk analysis, predictive simulations, and comprehensive monitoring dashboards
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          {useCases.map((useCase) => {
            const IconComponent = useCase.icon;
            return (
              <Card 
                key={useCase.id}
                className={`p-0 transition-all duration-300 flex flex-col group relative overflow-hidden ${
                  useCase.active 
                    ? 'hover:shadow-lg cursor-pointer border-2 border-gray-200 hover:-translate-y-1'
                    : 'opacity-70 cursor-not-allowed border-2 border-gray-200'
                }`}
                style={useCase.active ? { 
                  '--hover-border-color': '#2d6b6a'
                } as React.CSSProperties : {}}
                onClick={() => useCase.active && onUseCaseClick?.(useCase.id)}
              >
                {/* Header */}
                <div className="bg-gray-50 p-6 pb-4 relative">
                  {/* Click to view indicator */}
                  {useCase.active && (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <div className="bg-white rounded-full p-1.5 shadow-md">
                        <ArrowRight className="w-3.5 h-3.5" style={{ color: '#2d6b6a' }} />
                      </div>
                    </div>
                  )}

                  {/* Coming Soon Badge */}
                  {!useCase.active && (
                    <div className="absolute top-3 right-3">
                      <span className="text-xs px-3 py-1 bg-white/90 text-gray-600 rounded-full shadow-sm backdrop-blur-sm">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mx-auto mb-4 relative">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: useCase.iconColor }}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-center text-gray-800 mb-1">
                    {useCase.title}
                  </h2>
                </div>

                {/* White Content Section */}
                <div className="p-5 pt-4 bg-white flex-1 flex flex-col">
                  {/* Description */}
                  <p className="text-center text-xs text-gray-600 mb-4 min-h-[2.5rem] leading-relaxed">
                    {useCase.description}
                  </p>

                  {/* Location & Partner */}
                  <div className="flex items-center justify-center gap-2 mb-4 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      📍 {useCase.location}
                    </span>
                    <span>•</span>
                    <span>{useCase.partner}</span>
                  </div>

                  {/* Hover Hint */}
                  {useCase.active && (
                    <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      <span
                        className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white shadow-md"
                        style={{ backgroundColor: '#f59e0b' }}
                      >
                        Click to explore
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white border-2 border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f0f9f9' }}>
                <TrendingUp className="w-6 h-6" style={{ color: '#2d6b6a' }} />
              </div>
              <div>
                <h3 className="text-sm text-gray-800 mb-1">Real-Time Monitoring</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Track KPIs, environmental factors, and supply chain health across all sectors
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f0f9f9' }}>
                <Sparkles className="w-6 h-6" style={{ color: '#2d6b6a' }} />
              </div>
              <div>
                <h3 className="text-sm text-gray-800 mb-1">Predictive Simulations</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  ML-powered forecasting for disruptions, price changes, and risk scenarios
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f0f9f9' }}>
                <Check className="w-6 h-6" style={{ color: '#2d6b6a' }} />
              </div>
              <div>
                <h3 className="text-sm text-gray-800 mb-1">Comprehensive Reports</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Generate detailed analytics reports and export insights for decision-making
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Navigation Tip */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200">
            <span className="text-sm text-gray-600">
              💡 <span className="text-gray-700">Quick Tip:</span> Use the <span style={{ color: '#2d6b6a' }}>top navigation menu</span> to access cross-sector features
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}