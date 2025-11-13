import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, FileSpreadsheet, ChevronDown, Sparkles, TrendingUp, Activity, BarChart3, Zap, Target, Brain, Fish, Wheat, Apple, Milk, PlayCircle, Trash2, Copy, X } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Legend } from 'recharts';
import { motion } from 'motion/react';
import { SavedSimulationsPanel, ComparisonView } from './SimulationComparisonPanel';

type SimulationSector = 'fish' | 'aquaculture' | 'grain' | 'fruits' | 'dairy';

interface SavedSimulation {
  id: string;
  name: string;
  sector: SimulationSector;
  variable: string;
  month: string;
  year: string;
  timestamp: Date;
  parameters: {
    demandShift?: number;
    supplyChange?: number;
    priceFluctuation?: number;
  };
  results: {
    demand: number[];
    supply: number[];
    inventory: number[];
  };
}

// Sample data for forecasting
const forecastData = [
  { time: 0, actual: 5.0, predicted: 5.0, disruption: false },
  { time: 5, actual: 5.3, predicted: 5.2, disruption: false },
  { time: 10, actual: 5.8, predicted: 5.7, disruption: false },
  { time: 15, actual: 6.1, predicted: 6.0, disruption: false },
  { time: 20, actual: 6.3, predicted: 6.2, disruption: false },
  { time: 25, actual: 6.4, predicted: 6.3, disruption: true },
  { time: 30, actual: 5.8, predicted: 5.9, disruption: true },
  { time: 35, actual: 5.0, predicted: 5.2, disruption: true },
  { time: 40, actual: 4.2, predicted: 4.5, disruption: false },
  { time: 45, actual: 4.0, predicted: 4.2, disruption: false },
  { time: 50, actual: 4.5, predicted: 4.6, disruption: false },
  { time: 55, actual: 4.8, predicted: 4.9, disruption: false },
  { time: 60, actual: 4.6, predicted: 4.7, disruption: false },
];

const featureImportanceData = [
  { name: 'ΔSea Temp', value: 0.24 },
  { name: 'ΔChlorophyll', value: 0.21 },
  { name: 'ΔLandings', value: 0.18 },
  { name: 'ΔInventory', value: 0.15 },
  { name: 'ΔImports', value: 0.12 },
];

const confusionMatrixData = [
  { x: 'No Disruption', y: 'No Disruption', value: 144, label: '144' },
  { x: 'Disruption', y: 'No Disruption', value: 23, label: '23' },
  { x: 'No Disruption', y: 'Disruption', value: 7, label: '7' },
  { x: 'Disruption', y: 'Disruption', value: 46, label: '46' },
];

// Sample data for market price logistic curve
const logisticCurveData = Array.from({ length: 50 }, (_, i) => {
  const x = -2.0 + (i * 4.0) / 50;
  return {
    x,
    y: 1 / (1 + Math.exp(-3 * x)),
  };
});

// Scatter plot data for Volume vs Quality
const scatterData = Array.from({ length: 120 }, () => ({
  volume: Math.random() * 100,
  quality: Math.random() * 100,
}));

// Correlation matrix data
const correlationData = [
  { row: 'Revenue', col: 'Revenue', value: 1.00, label: '1.00' },
  { row: 'Revenue', col: 'Volume', value: 0.85, label: '0.85' },
  { row: 'Revenue', col: 'Distance', value: -0.42, label: '-0.42' },
  { row: 'Revenue', col: 'Quality', value: 0.67, label: '0.67' },
  { row: 'Revenue', col: 'Lead Time', value: 0.23, label: '0.23' },
  
  { row: 'Volume', col: 'Revenue', value: 0.85, label: '0.85' },
  { row: 'Volume', col: 'Volume', value: 1.00, label: '1.00' },
  { row: 'Volume', col: 'Distance', value: -0.52, label: '-0.52' },
  { row: 'Volume', col: 'Quality', value: 0.72, label: '0.72' },
  { row: 'Volume', col: 'Lead Time', value: 0.31, label: '0.31' },
  
  { row: 'Distance', col: 'Revenue', value: -0.42, label: '-0.42' },
  { row: 'Distance', col: 'Volume', value: -0.52, label: '-0.52' },
  { row: 'Distance', col: 'Distance', value: 1.00, label: '1.00' },
  { row: 'Distance', col: 'Quality', value: -0.18, label: '-0.18' },
  { row: 'Distance', col: 'Lead Time', value: -0.18, label: '-0.18' },
  
  { row: 'Quality', col: 'Revenue', value: 0.67, label: '0.67' },
  { row: 'Quality', col: 'Volume', value: 0.72, label: '0.72' },
  { row: 'Quality', col: 'Distance', value: -0.18, label: '-0.18' },
  { row: 'Quality', col: 'Quality', value: 1.00, label: '1.00' },
  { row: 'Quality', col: 'Lead Time', value: 0.44, label: '0.44' },
  
  { row: 'Lead Time', col: 'Revenue', value: 0.23, label: '0.23' },
  { row: 'Lead Time', col: 'Volume', value: 0.31, label: '0.31' },
  { row: 'Lead Time', col: 'Distance', value: -0.18, label: '-0.18' },
  { row: 'Lead Time', col: 'Quality', value: 0.44, label: '0.44' },
  { row: 'Lead Time', col: 'Lead Time', value: 1.00, label: '1.00' },
];

const getCorrelationColor = (value: number) => {
  if (value >= 0.8) return '#047857'; // Strong positive - dark teal
  if (value >= 0.6) return '#14b8a6'; // Medium-strong positive - teal
  if (value >= 0.4) return '#5eead4'; // Medium positive - light teal
  if (value >= 0.2) return '#99f6e4'; // Weak positive - very light teal
  if (value > -0.2) return '#f3f4f6'; // Near zero - gray
  if (value > -0.4) return '#fecdd3'; // Weak negative - light red
  if (value > -0.6) return '#fda4af'; // Medium negative - medium red
  return '#f87171'; // Strong negative - red
};

// Sample simulation data
const simulationData = [
  { time: 'Jan', demand: 120, supply: 110, inventory: 85 },
  { time: 'Feb', demand: 135, supply: 125, inventory: 78 },
  { time: 'Mar', demand: 145, supply: 140, inventory: 82 },
  { time: 'Apr', demand: 155, supply: 150, inventory: 88 },
  { time: 'May', demand: 140, supply: 145, inventory: 92 },
  { time: 'Jun', demand: 130, supply: 135, inventory: 95 },
];

export default function SimulationsPage() {
  const [activeTab, setActiveTab] = useState('simulations');
  const [selectedSector, setSelectedSector] = useState<SimulationSector>('fish');
  const [selectedVariable, setSelectedVariable] = useState('Capture volume');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [visualizationType, setVisualizationType] = useState('Time Series');
  const [datasetType, setDatasetType] = useState('Platform Data (default)');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [savedSimulations, setSavedSimulations] = useState<SavedSimulation[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedSimulations, setSelectedSimulations] = useState<string[]>([]);
  const [simulationName, setSimulationName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const sectors = [
    { id: 'fish' as SimulationSector, name: 'Fish - Greece', icon: Fish, color: 'blue', gradient: 'from-blue-500 to-cyan-600' },
    { id: 'aquaculture' as SimulationSector, name: 'Aquaculture - Belgium', icon: Activity, color: 'teal', gradient: 'from-teal-500 to-emerald-600' },
    { id: 'grain' as SimulationSector, name: 'Grain - Ukraine', icon: Wheat, color: 'amber', gradient: 'from-amber-500 to-orange-600' },
    { id: 'fruits' as SimulationSector, name: 'Fruits & Vegetables - Portugal', icon: Apple, color: 'green', gradient: 'from-green-500 to-emerald-600' },
    { id: 'dairy' as SimulationSector, name: 'Milk & Dairy - Greece/Finland', icon: Milk, color: 'indigo', gradient: 'from-indigo-500 to-purple-600' },
  ];

  const variables = [
    'Capture volume',
    'Imports',
    'Exports',
    'Quantity available for consumption',
    'Quantity consumed (kg or tons)',
    'Market price',
  ];

  const visualizationTypes = [
    'Time Series',
    'Bar Chart',
    'Logistic Curve',
    'Confusion Matrix',
    'Scatter Plot',
    'Heatmap',
    'Sensitivity Line Plot',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
      // Handle file upload logic here
    }
  };

  const handleRunSimulation = () => {
    setShowSaveDialog(true);
  };

  const handleSaveSimulation = () => {
    if (!simulationName.trim()) return;
    
    // Generate simulation results based on current parameters
    const results = {
      demand: simulationData.map(d => d.demand + (Math.random() - 0.5) * 10),
      supply: simulationData.map(d => d.supply + (Math.random() - 0.5) * 10),
      inventory: simulationData.map(d => d.inventory + (Math.random() - 0.5) * 8),
    };

    const newSimulation: SavedSimulation = {
      id: `sim-${Date.now()}`,
      name: simulationName,
      sector: selectedSector,
      variable: selectedVariable,
      month: selectedMonth,
      year: selectedYear,
      timestamp: new Date(),
      parameters: {
        demandShift: Math.random() * 10 - 5,
        supplyChange: Math.random() * 8 - 4,
        priceFluctuation: Math.random() * 6 - 3,
      },
      results,
    };

    setSavedSimulations([...savedSimulations, newSimulation]);
    setSimulationName('');
    setShowSaveDialog(false);
  };

  const handleDeleteSimulation = (id: string) => {
    setSavedSimulations(savedSimulations.filter(sim => sim.id !== id));
    setSelectedSimulations(selectedSimulations.filter(simId => simId !== id));
  };

  const handleDuplicateSimulation = (simulation: SavedSimulation) => {
    const duplicate: SavedSimulation = {
      ...simulation,
      id: `sim-${Date.now()}`,
      name: `${simulation.name} (Copy)`,
      timestamp: new Date(),
    };
    setSavedSimulations([...savedSimulations, duplicate]);
  };

  const toggleSimulationSelection = (id: string) => {
    if (selectedSimulations.includes(id)) {
      setSelectedSimulations(selectedSimulations.filter(simId => simId !== id));
    } else {
      if (selectedSimulations.length < 3) {
        setSelectedSimulations([...selectedSimulations, id]);
      }
    }
  };

  const getComparisonData = () => {
    const selected = savedSimulations.filter(sim => selectedSimulations.includes(sim.id));
    if (selected.length === 0) return [];

    return simulationData.map((_, idx) => {
      const dataPoint: any = { time: simulationData[idx].time };
      selected.forEach((sim, simIdx) => {
        dataPoint[`demand${simIdx}`] = sim.results.demand[idx];
        dataPoint[`supply${simIdx}`] = sim.results.supply[idx];
        dataPoint[`inventory${simIdx}`] = sim.results.inventory[idx];
      });
      return dataPoint;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-5 flex-shrink-0 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full mb-3 border border-gray-200" style={{ backgroundColor: '#f0f9f9' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#2d6b6a' }} />
            <span className="text-sm" style={{ color: '#2d6b6a' }}>AI-Powered</span>
          </div>
          <h2 className="text-lg mb-1">Simulation Controls</h2>
          <p className="text-xs text-gray-500">Configure your analysis parameters</p>
        </div>

        {/* Variable Selector */}
        <div className="mb-4">
          <Label className="text-xs text-gray-600 mb-2 block">Select Variable</Label>
          <div className="relative">
            <select
              value={selectedVariable}
              onChange={(e) => setSelectedVariable(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm appearance-none bg-white focus:outline-none transition-colors"
              style={{ '--focus-border-color': '#2d6b6a' } as React.CSSProperties}
            >
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Month & Year */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <Label className="text-xs text-gray-600 mb-2 block">Month</Label>
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-2 py-2 border-2 border-gray-200 rounded-xl text-xs appearance-none bg-white focus:outline-none transition-colors"
              >
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-600 mb-2 block">Year</Label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-2 py-2 border-2 border-gray-200 rounded-xl text-xs appearance-none bg-white focus:outline-none transition-colors"
              >
                {['2024', '2023', '2022', '2021', '2020'].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Visualization Type */}
        <div className="mb-4">
          <Label className="text-xs text-gray-600 mb-2 block">Visualization</Label>
          <div className="relative">
            <select
              value={visualizationType}
              onChange={(e) => setVisualizationType(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm appearance-none bg-white hover:border-teal-300 focus:border-teal-500 focus:outline-none transition-colors"
            >
              {visualizationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="mb-4 space-y-2">
          <p className="text-xs text-gray-600 mb-2">Quick Access</p>
          {visualizationTypes.slice(0, 4).map((type) => (
            <motion.button
              key={type}
              whileHover={{ x: 3 }}
              onClick={() => setVisualizationType(type)}
              className={`block w-full text-left py-2 px-3 rounded-lg text-xs transition-all ${
                visualizationType === type
                  ? 'text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              style={visualizationType === type ? { backgroundColor: '#2d6b6a' } : {}}
            >
              {type}
            </motion.button>
          ))}
        </div>

        {/* Dataset Selection */}
        <div className="mb-4">
          <Label className="text-xs text-gray-600 mb-2 block">Dataset Source</Label>
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDatasetType('Platform Data (default)')}
              className={`block w-full text-left py-2.5 px-3 rounded-xl text-xs transition-all ${
                datasetType === 'Platform Data (default)'
                  ? 'text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
              }`}
              style={datasetType === 'Platform Data (default)' ? { backgroundColor: '#2d6b6a' } : {}}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Platform Data
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setDatasetType('Upload New Data');
                setShowUploadForm(true);
              }}
              className={`block w-full text-left py-2.5 px-3 rounded-xl text-xs transition-all ${
                datasetType === 'Upload New Data'
                  ? 'text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
              }`}
              style={datasetType === 'Upload New Data' ? { backgroundColor: '#2d6b6a' } : {}}
            >
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Custom Data
              </div>
            </motion.button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="mt-6 p-4 rounded-xl border-2 border-gray-200" style={{ backgroundColor: '#f0f9f9' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2d6b6a' }}>
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-700">Model Accuracy</p>
              <p className="text-base" style={{ color: '#2d6b6a' }}>94.2%</p>
            </div>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div className="h-full" style={{ width: '94.2%', backgroundColor: '#2d6b6a' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-full mb-4 border border-gray-200">
            <Activity className="w-4 h-4" style={{ color: '#2d6b6a' }} />
            <span className="text-sm" style={{ color: '#2d6b6a' }}>Advanced Analytics</span>
          </div>
          <h1 className="text-4xl mb-2">
            Simulations & <span style={{ color: '#2d6b6a' }}>Forecasting</span>
          </h1>
          <p className="text-sm text-gray-600">AI-powered predictive modeling and scenario analysis</p>
        </div>

        {/* Sector Selection */}
        <div className="mb-6 flex gap-3 flex-wrap">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            const isActive = selectedSector === sector.id;
            return (
              <motion.div key={sector.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSector(sector.id)}
                  className={`h-11 text-sm transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${sector.gradient} hover:opacity-90 text-white shadow-lg scale-105 border-0`
                      : `hover:border-${sector.color}-300 hover:bg-${sector.color}-50 border-2`
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {sector.name}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="bg-white mb-6 p-1.5 rounded-xl shadow-md border-2 border-gray-200">
            <TabsTrigger 
              value="simulations" 
              className="text-sm px-8 py-2.5 rounded-lg transition-all"
              style={{
                backgroundColor: activeTab === 'simulations' ? '#2d6b6a' : 'transparent',
                color: activeTab === 'simulations' ? 'white' : '#64748b'
              }}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              SIMULATIONS
            </TabsTrigger>
            <TabsTrigger 
              value="forecasting" 
              className="text-sm px-8 py-2.5 rounded-lg transition-all"
              style={{
                backgroundColor: activeTab === 'forecasting' ? '#2d6b6a' : 'transparent',
                color: activeTab === 'forecasting' ? 'white' : '#64748b'
              }}
            >
              <Target className="w-4 h-4 mr-2" />
              FORECASTING
            </TabsTrigger>
          </TabsList>

          {/* Simulations Tab */}
          <TabsContent value="simulations">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Stats Overview */}
              <div className="grid grid-cols-4 gap-4 mb-5">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Card className="p-4 border-2 border-gray-200 hover:shadow-lg transition-all" style={{ backgroundColor: '#f0f9f9' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#2d6b6a' }}>
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Saved Scenarios</p>
                        <p className="text-xl text-blue-900">{savedSimulations.length}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Card className="p-4 border-2 border-gray-200 hover:shadow-lg transition-all" style={{ backgroundColor: '#f0f9f9' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#64748b' }}>
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: '#475569' }}>Accuracy</p>
                        <p className="text-xl" style={{ color: '#334155' }}>94.2%</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Card className="p-4 border-2 border-gray-200 hover:shadow-lg transition-all" style={{ backgroundColor: '#f0f9f9' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#2d6b6a' }}>
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-teal-700">Data Points</p>
                        <p className="text-xl text-teal-900">220</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Card className="p-4 border-2 border-gray-200 hover:shadow-lg transition-all" style={{ backgroundColor: '#f0f9f9' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#64748b' }}>
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-orange-700">Confidence</p>
                        <p className="text-xl text-orange-900">High</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Run Simulation & Comparison Controls */}
              <div className="flex gap-3 mb-5">
                <Button
                  onClick={handleRunSimulation}
                  className="h-12 px-6 text-white shadow-lg rounded-xl hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#f59e0b' }}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Run New Simulation
                </Button>
                
                {savedSimulations.length > 0 && (
                  <Button
                    variant={showComparison ? 'default' : 'outline'}
                    onClick={() => setShowComparison(!showComparison)}
                    className="h-12 px-6 rounded-xl"
                    style={showComparison ? { backgroundColor: '#64748b', color: 'white' } : {}}
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    {showComparison ? 'Hide' : 'Show'} Comparison
                  </Button>
                )}

                {showComparison && selectedSimulations.length > 0 && (
                  <Badge 
                    className="h-12 px-4 flex items-center gap-2 text-white rounded-xl"
                    style={{ backgroundColor: '#2d6b6a' }}
                  >
                    <Target className="w-4 h-4" />
                    {selectedSimulations.length} scenarios selected
                  </Badge>
                )}
              </div>

              {/* Saved Simulations Panel */}
              <SavedSimulationsPanel
                savedSimulations={savedSimulations}
                selectedSimulations={selectedSimulations}
                showComparison={showComparison}
                onDelete={handleDeleteSimulation}
                onDuplicate={handleDuplicateSimulation}
                onToggleSelection={toggleSimulationSelection}
              />

              {/* Comparison View */}
              {showComparison && (
                <ComparisonView
                  savedSimulations={savedSimulations}
                  selectedSimulations={selectedSimulations}
                  simulationData={simulationData}
                />
              )}

              {/* Main Visualization Card */}
              <Card className="p-6 bg-white border-2 border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#2d6b6a' }}>
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base text-gray-800">ML Model Forecasting - Supply Chain Disruptions</h3>
                    <p className="text-xs text-gray-500">AI-powered predictive analysis with confidence intervals</p>
                  </div>
                  <Badge className="ml-auto text-white" style={{ backgroundColor: '#2d6b6a' }}>
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Model
                  </Badge>
                </div>
                
                {/* 2x2 Grid of Charts */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Top Left: Forecasting Chart */}
                  <div className="p-4 rounded-xl border-2 border-gray-200" style={{ backgroundColor: '#f0f9f9' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <h4 className="text-xs text-blue-900">Forecasted vs Actual Fish Price</h4>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={forecastData}>
                        <defs>
                          <linearGradient id="disruptionGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fca5a5" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#fca5a5" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                        <XAxis 
                          dataKey="time" 
                          label={{ value: 'Time (days)', position: 'insideBottom', offset: -5, style: { fontSize: 10 } }} 
                          tick={{ fontSize: 9 }} 
                          stroke="#64748b"
                        />
                        <YAxis 
                          label={{ value: '€/kg', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} 
                          tick={{ fontSize: 9 }}
                          domain={[3.5, 6.5]}
                          stroke="#64748b"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '12px', 
                            border: '2px solid #e2e8f0',
                            fontSize: '11px'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#1e40af" 
                          strokeWidth={2.5} 
                          name="Actual Price" 
                          dot={{ r: 4, fill: '#1e40af' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="#3b82f6" 
                          strokeWidth={2.5} 
                          strokeDasharray="5 5" 
                          name="Predicted Price" 
                          dot={{ r: 4, fill: '#3b82f6' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    {/* Legend */}
                    <div className="flex gap-4 justify-center mt-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-1 bg-blue-900 rounded"></div>
                        <span className="text-[10px] text-gray-700">Actual</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-1 bg-blue-500 rounded" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 50%, transparent 50%)', backgroundSize: '8px 1px' }}></div>
                        <span className="text-[10px] text-gray-700">Predicted</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-2 bg-rose-200 rounded"></div>
                        <span className="text-[10px] text-gray-700">Disruption</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Right: Feature Importance */}
                  <div className="p-4 rounded-xl border-2 border-gray-200 bg-white">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-4 h-4" style={{ color: '#475569' }} />
                      <h4 className="text-xs" style={{ color: '#334155' }}>Feature Importance (SHAP Values)</h4>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={featureImportanceData} layout="vertical" margin={{ left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                        <XAxis 
                          type="number" 
                          tick={{ fontSize: 9 }}
                          label={{ value: 'Mean SHAP Value', position: 'insideBottom', offset: -5, style: { fontSize: 10 } }}
                          domain={[0, 0.25]}
                          stroke="#64748b"
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={75} 
                          tick={{ fontSize: 9 }} 
                          stroke="#64748b"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '12px', 
                            border: '2px solid #e2e8f0',
                            fontSize: '11px'
                          }} 
                        />
                        <Bar dataKey="value" fill="url(#barGradient)" radius={[0, 8, 8, 0]} />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="100%" stopColor="#64748b" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bottom Left: Logistic Curve */}
                  <div className="p-4 rounded-xl border-2 border-gray-200" style={{ backgroundColor: '#f0f9f9' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-4 h-4 text-teal-600" />
                      <h4 className="text-xs text-teal-900">Predicted Disruption Risk vs. ΔX</h4>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={logisticCurveData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                        <XAxis 
                          dataKey="x" 
                          label={{ value: 'ΔX (Stressor Deviation)', position: 'insideBottom', offset: -5, style: { fontSize: 10 } }} 
                          tick={{ fontSize: 9 }}
                          domain={[-2, 2]}
                          stroke="#64748b"
                        />
                        <YAxis 
                          label={{ value: 'Disruption Probability', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} 
                          tick={{ fontSize: 9 }}
                          domain={[0, 1]}
                          stroke="#64748b"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '12px', 
                            border: '2px solid #e2e8f0',
                            fontSize: '11px'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="y" 
                          stroke="#14b8a6" 
                          strokeWidth={3} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bottom Right: Confusion Matrix */}
                  <div className="p-4 rounded-xl border-2 border-gray-200 bg-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-orange-600" />
                      <h4 className="text-xs text-orange-900">Confusion Matrix: Disruption Classifier</h4>
                    </div>
                    <div className="flex flex-col items-center" style={{ height: 200 }}>
                      <div className="flex-1 flex items-center">
                        <div className="grid grid-cols-2 gap-2">
                          {confusionMatrixData.map((cell, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              className={`w-24 h-24 flex items-center justify-center text-lg rounded-xl shadow-md transition-all ${
                                cell.value > 100
                                  ? 'text-white'
                                  : cell.value > 40
                                  ? 'text-white'
                                  : cell.value > 20
                                  ? 'text-gray-800'
                                  : 'text-gray-800'
                              }
                              style={{
                                backgroundColor: 
                                  cell.value > 100 ? '#2d6b6a' :
                                  cell.value > 40 ? '#64748b' :
                                  cell.value > 20 ? '#cbd5e1' :
                                  '#f0f9f9'
                              }`}
                            >
                              {cell.label}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <div className="flex justify-between text-[10px] text-gray-600 mb-1 w-52">
                          <span>No Disruption</span>
                          <span>Disruption</span>
                        </div>
                        <div className="text-[10px] text-gray-600">Predicted label</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Forecasting Tab */}
          <TabsContent value="forecasting">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Left: Scatter Plot */}
                <Card className="p-6 bg-white border-2 border-teal-100 hover:border-teal-300 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-800">Relationship: Volume vs Quality</h3>
                      <p className="text-xs text-gray-500">Correlation analysis</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart margin={{ top: 10, right: 10, bottom: 40, left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                      <XAxis 
                        type="number" 
                        dataKey="volume" 
                        name="Volume" 
                        tick={{ fontSize: 10 }}
                        label={{ value: 'Volume', position: 'insideBottom', offset: -10, style: { fontSize: 11 } }}
                        domain={[0, 100]}
                        stroke="#64748b"
                      />
                      <YAxis 
                        type="number" 
                        dataKey="quality" 
                        name="Quality" 
                        tick={{ fontSize: 10 }}
                        label={{ value: 'Quality', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
                        domain={[0, 100]}
                        stroke="#64748b"
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }} 
                        contentStyle={{ 
                          borderRadius: '12px', 
                          border: '2px solid #e2e8f0',
                          fontSize: '11px'
                        }} 
                      />
                      <Scatter data={scatterData} fill="#14b8a6" />
                    </ScatterChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-gray-600">Correlation coefficient:</p>
                        <p className="text-base text-teal-700">0.72</p>
                      </div>
                      <div>
                        <p className="text-gray-600">p-value:</p>
                        <p className="text-base text-teal-700">&lt; 0.001</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Right: Correlation Matrix */}
                <Card className="p-6 bg-white border-2 border-gray-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#2d6b6a' }}>
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-800">Correlation Matrix</h3>
                      <p className="text-xs text-gray-500">Cross-variable relationships</p>
                    </div>
                  </div>
                  <div className="overflow-auto">
                    <div className="inline-block min-w-full">
                      {/* Column Headers */}
                      <div className="flex mb-2">
                        <div className="w-20"></div>
                        {['Revenue', 'Volume', 'Distance', 'Quality', 'Lead Time'].map((col) => (
                          <div key={col} className="w-16 text-center text-[10px] text-gray-700 px-1">
                            {col}
                          </div>
                        ))}
                      </div>
                      {/* Matrix Rows */}
                      {['Revenue', 'Volume', 'Distance', 'Quality', 'Lead Time'].map((row) => (
                        <div key={row} className="flex mb-2">
                          <div className="w-20 text-[10px] text-gray-700 flex items-center pr-2 justify-end">
                            {row}
                          </div>
                          {['Revenue', 'Volume', 'Distance', 'Quality', 'Lead Time'].map((col) => {
                            const cell = correlationData.find(c => c.row === row && c.col === col);
                            return (
                              <motion.div 
                                key={`${row}-${col}`}
                                whileHover={{ scale: 1.1, zIndex: 10 }}
                                className="w-16 h-12 flex items-center justify-center text-[10px] mx-0.5 rounded-lg shadow-sm transition-all cursor-pointer"
                                style={{ 
                                  backgroundColor: getCorrelationColor(cell?.value || 0),
                                  color: Math.abs(cell?.value || 0) >= 0.6 ? 'white' : '#374151'
                                }}
                              >
                                {cell?.label}
                              </motion.div>
                            );
                          })}
                        </div>
                      ))}
                      {/* Legend */}
                      <div className="mt-4 flex items-center gap-3 text-[10px] flex-wrap">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-[#047857] rounded"></div>
                          <span>Strong +</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-[#99f6e4] rounded"></div>
                          <span>Weak +</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-[#f3f4f6] rounded"></div>
                          <span>None</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-[#fecdd3] rounded"></div>
                          <span>Weak -</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-[#f87171] rounded"></div>
                          <span>Strong -</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <Card className="p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800">Upload Custom Data</h3>
                  <p className="text-xs text-gray-500">Import your own dataset for analysis</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* File Upload */}
                <div>
                  <Label className="text-sm mb-3 block text-gray-700">Upload Excel File</Label>
                  <div className="border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center hover:border-purple-500 hover:bg-purple-50/50 transition-all cursor-pointer">
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <FileSpreadsheet className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Excel files (.xlsx, .xls, .csv)
                      </p>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-sm text-gray-500">OR</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Manual Entry Form */}
                <div>
                  <Label className="text-sm mb-3 block text-gray-700">Manual Data Entry</Label>
                  <div className="space-y-3">
                    <Input 
                      placeholder="Variable name" 
                      className="border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                    />
                    <Input 
                      placeholder="Time period" 
                      className="border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                    />
                    <Input 
                      placeholder="Value" 
                      type="number" 
                      className="border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 hover:bg-gray-50 rounded-xl"
                    onClick={() => setShowUploadForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg rounded-xl">
                    Upload Data
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Save Simulation Dialog */}
      {showSaveDialog && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSaveDialog(false);
              setSimulationName('');
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 shadow-2xl border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#2d6b6a' }}>
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">Save Simulation</h3>
                  <p className="text-xs text-gray-500">Enter a name for this simulation scenario</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Current Configuration */}
                <div className="p-4 rounded-xl border-2 border-gray-200" style={{ backgroundColor: '#f0f9f9' }}>
                  <p className="text-xs text-gray-600 mb-3">Current Configuration</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Sector:</span>
                      <span className="text-gray-900">{sectors.find(s => s.id === selectedSector)?.name}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Variable:</span>
                      <span className="text-gray-900">{selectedVariable}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Period:</span>
                      <span className="text-gray-900">{selectedMonth} {selectedYear}</span>
                    </div>
                  </div>
                </div>

                {/* Simulation Name */}
                <div>
                  <Label className="text-sm mb-2 block text-gray-700">Simulation Name</Label>
                  <Input 
                    placeholder="e.g., High Demand Scenario" 
                    className="border-2 border-gray-200 rounded-xl h-11 focus:border-teal-500"
                    value={simulationName}
                    onChange={(e) => setSimulationName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && simulationName.trim() && handleSaveSimulation()}
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 hover:bg-gray-50 rounded-xl h-11"
                    onClick={() => {
                      setShowSaveDialog(false);
                      setSimulationName('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 text-white shadow-lg rounded-xl h-11 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: simulationName.trim() ? '#2d6b6a' : '#94a3b8' }}
                    onClick={handleSaveSimulation}
                    disabled={!simulationName.trim()}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Save Simulation
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}