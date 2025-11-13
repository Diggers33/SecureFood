import { useState } from 'react';
import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronRight, Ship, Anchor, Factory, Truck, Store, UtensilsCrossed, AlertTriangle, Clock } from 'lucide-react';

const tempData = [
  { x: 'J', y: 18 },
  { x: 'F', y: 22 },
  { x: 'M', y: 17 },
  { x: 'A', y: 24 },
  { x: 'M', y: 19 },
  { x: 'J', y: 21 },
  { x: 'J', y: 18 },
];

const logisticsData = [
  { x: 'J', y: 75 },
  { x: 'F', y: 82 },
  { x: 'M', y: 78 },
  { x: 'A', y: 85 },
  { x: 'M', y: 80 },
  { x: 'J', y: 83 },
  { x: 'J', y: 77 },
];

const stockData = [
  { x: 'J', y: 65 },
  { x: 'F', y: 72 },
  { x: 'M', y: 68 },
  { x: 'A', y: 75 },
  { x: 'M', y: 70 },
  { x: 'J', y: 73 },
  { x: 'J', y: 67 },
];

export default function Screen8() {
  const [expandedSection, setExpandedSection] = useState<string | null>('production');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        {/* Use Case Selector */}
        <div className="mb-6">
          <button className="w-full text-left px-3 py-2 border border-gray-300 rounded bg-gray-50 text-sm hover:bg-gray-100">
            choose another use case
          </button>
        </div>

        {/* Supply Chain Status */}
        <div className="mb-6">
          <h3 className="text-xs text-gray-500 mb-3">Supply Chain Status</h3>
          <div className="text-sm text-gray-700 px-3 py-2 bg-gray-50 rounded">
            Fish - Greece
          </div>
        </div>

        {/* Production Nodes */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('production')}
            className="flex items-center justify-between w-full text-sm mb-2"
          >
            <span className="flex items-center gap-2">
              {expandedSection === 'production' ? '▼' : '▶'} Production Nodes
            </span>
          </button>
          
          {expandedSection === 'production' && (
            <div className="ml-4 space-y-2">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full text-left py-1">
                <ChevronRight className="w-3 h-3" />
                Transport Routes
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full text-left py-1">
                <ChevronRight className="w-3 h-3" />
                Storage Facilities
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full text-left py-1">
                <ChevronRight className="w-3 h-3" />
                Distribution Points
              </button>
            </div>
          )}
        </div>

        {/* Network Status */}
        <div>
          <h3 className="text-xs text-gray-500 mb-3">Network Status</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <Truck className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs">Production</div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                <Truck className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs">Transport</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
              <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center">
                <Store className="w-4 h-4 text-amber-700" />
              </div>
              <div className="flex-1">
                <div className="text-xs">Storage</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
              <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center">
                <Store className="w-4 h-4 text-teal-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs">Distribution</div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Filters */}
        <div className="flex gap-4 mb-8">
          <select className="px-4 py-2 border border-gray-300 rounded text-sm bg-white">
            <option>Fish - Greece</option>
            <option>Grain - Ucrania</option>
            <option>Fruits & Vegetables - Portugal</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded text-sm bg-white">
            <option>Year</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>

        {/* Supply Chain Flow Diagram */}
        <Card className="p-8 mb-6 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center justify-between relative">
            {/* Harvesting */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-teal-500">
                <Ship className="w-8 h-8 text-teal-600" />
              </div>
              <div className="text-xs text-center">
                <div className="text-teal-700">HARVESTING</div>
              </div>
            </div>

            {/* Landing */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-orange-400">
                <Anchor className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-xs text-center">
                <div className="text-orange-700">LANDING</div>
              </div>
            </div>

            {/* Processing */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-blue-400">
                <Factory className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-xs text-center">
                <div className="text-blue-700">PROCESSING</div>
              </div>
            </div>

            {/* Distribution */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-orange-400">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-xs text-center">
                <div className="text-orange-700">DISTRIBUTION</div>
              </div>
            </div>

            {/* Retail & Food Services */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-teal-500">
                <Store className="w-8 h-8 text-teal-600" />
              </div>
              <div className="text-xs text-center max-w-[80px]">
                <div className="text-teal-700">RETAIL & FOOD SERVICES</div>
              </div>
            </div>

            {/* Consumers */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center shadow-md">
                <UtensilsCrossed className="w-8 h-8 text-white" />
              </div>
              <div className="text-xs text-center">
                <div className="text-teal-700">CONSUMERS</div>
              </div>
            </div>

            {/* Connecting Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-orange-400 to-teal-400 -z-0"></div>
          </div>
        </Card>

        {/* Metrics Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="flex items-center gap-2">
              <div className="text-3xl text-yellow-600">3</div>
              <div className="text-xs text-gray-600">Active Incidents</div>
            </div>
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <div className="text-3xl text-orange-600">-7</div>
              <div className="text-xs text-gray-600">Alert Thresholds</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-4xl text-teal-600 mb-2">67%</div>
            <div className="text-xs text-gray-600 mb-2">Stock Levels</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-teal-500 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-3xl text-gray-700">2.4</div>
              <div className="text-sm text-gray-500">days</div>
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Avg Delivery Time
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="text-sm mb-3">Temperature Trends</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="x" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#0d9488" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm mb-3">Logistics Status</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={logisticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="x" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#0d9488" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm mb-3">Stock Changes</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="x" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}
