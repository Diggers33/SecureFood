import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  TrendingDown,
  Thermometer,
  Droplet,
  Fish,
  Wheat,
  Apple,
  Milk,
  Truck,
  DollarSign,
  Package,
  Activity,
  CheckCircle,
  CloudRain,
  Wind,
  BarChart3,
  Zap,
  MapPin,
  Clock
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';
import OtherSectorMonitoring from './OtherSectorMonitoring';

// Sample data for Fish monitoring
const fishEnvironmentalData = [
  { time: '00:00', algae: 45, temperature: 18.2, oxygen: 7.5 },
  { time: '04:00', algae: 52, temperature: 18.5, oxygen: 7.3 },
  { time: '08:00', algae: 68, temperature: 19.1, oxygen: 6.8 },
  { time: '12:00', algae: 85, temperature: 20.5, oxygen: 6.2 },
  { time: '16:00', algae: 92, temperature: 21.2, oxygen: 5.9 },
  { time: '20:00', algae: 88, temperature: 20.8, oxygen: 6.1 },
];

const fishProductionData = [
  { day: 'Mon', volume: 1200, affected: 200 },
  { day: 'Tue', volume: 1150, affected: 350 },
  { day: 'Wed', volume: 980, affected: 520 },
  { day: 'Thu', volume: 850, affected: 650 },
  { day: 'Fri', volume: 720, affected: 780 },
];

// Sample data for Aquaculture monitoring
const aquacultureTempData = [
  { day: 'Mon', ambient: 28, water: 24, threshold: 30 },
  { day: 'Tue', ambient: 31, water: 26, threshold: 30 },
  { day: 'Wed', ambient: 34, water: 28, threshold: 30 },
  { day: 'Thu', ambient: 36, water: 30, threshold: 30 },
  { day: 'Fri', ambient: 33, water: 28, threshold: 30 },
];

const aquacultureHealthData = [
  { week: 'W1', mortality: 1.2, diseaseOutbreaks: 0 },
  { week: 'W2', mortality: 1.5, diseaseOutbreaks: 1 },
  { week: 'W3', mortality: 2.8, diseaseOutbreaks: 2 },
  { week: 'W4', mortality: 4.2, diseaseOutbreaks: 3 },
];

// Sample data for Grain monitoring
const grainPriceData = [
  { month: 'Jan', domestic: 280, international: 310 },
  { month: 'Feb', domestic: 295, international: 325 },
  { month: 'Mar', domestic: 340, international: 380 },
  { month: 'Apr', domestic: 385, international: 420 },
  { month: 'May', domestic: 410, international: 455 },
  { month: 'Jun', domestic: 395, international: 440 },
];

const grainLogisticsData = [
  { route: 'Rail', delays: 12, capacity: 65 },
  { route: 'Road', delays: 28, capacity: 45 },
  { route: 'Sea', delays: 45, capacity: 20 },
];

// Sample data for Fruits & Vegetables monitoring
const fruitsClimateData = [
  { month: 'Jan', rainfall: 45, soilMoisture: 68, temp: 12 },
  { month: 'Feb', rainfall: 38, soilMoisture: 62, temp: 14 },
  { month: 'Mar', rainfall: 22, soilMoisture: 48, temp: 16 },
  { month: 'Apr', rainfall: 15, soilMoisture: 35, temp: 19 },
  { month: 'May', rainfall: 8, soilMoisture: 22, temp: 23 },
  { month: 'Jun', rainfall: 5, soilMoisture: 18, temp: 27 },
];

const fruitsYieldData = [
  { crop: 'Tomatoes', current: 42, historical: 58 },
  { crop: 'Lettuce', current: 35, historical: 48 },
  { crop: 'Peppers', current: 28, historical: 45 },
  { crop: 'Cucumbers', current: 38, historical: 52 },
];

// Sample data for Milk & Dairy monitoring
const dairyProductionData = [
  { week: 'W1', production: 28.5, stress: 0 },
  { week: 'W2', production: 27.8, stress: 1 },
  { week: 'W3', production: 25.2, stress: 2 },
  { week: 'W4', production: 22.5, stress: 3 },
];

const dairyColdChainData = [
  { location: 'Farm Storage', temp: 4.2, failures: 0 },
  { location: 'Transport A', temp: 5.8, failures: 2 },
  { location: 'Transport B', temp: 4.5, failures: 1 },
  { location: 'Distribution', temp: 4.1, failures: 0 },
  { location: 'Retail', temp: 4.3, failures: 0 },
];

type MonitoringSector = 'fish' | 'aquaculture' | 'grain' | 'fruits' | 'dairy';

export default function MonitoringPage() {
  const [selectedSector, setSelectedSector] = useState<MonitoringSector>('fish');
  const [timeRange, setTimeRange] = useState('24h');

  const sectors = [
    { id: 'fish' as MonitoringSector, name: 'Fish - Greece', icon: Fish, color: 'blue', gradient: 'from-blue-500 to-cyan-600' },
    { id: 'aquaculture' as MonitoringSector, name: 'Aquaculture - Belgium', icon: Activity, color: 'teal', gradient: 'from-teal-500 to-emerald-600' },
    { id: 'grain' as MonitoringSector, name: 'Grain - Ukraine', icon: Wheat, color: 'amber', gradient: 'from-amber-500 to-orange-600' },
    { id: 'fruits' as MonitoringSector, name: 'Fruits & Vegetables - Portugal', icon: Apple, color: 'green', gradient: 'from-green-500 to-emerald-600' },
    { id: 'dairy' as MonitoringSector, name: 'Milk & Dairy - Greece/Finland', icon: Milk, color: 'indigo', gradient: 'from-indigo-500 to-purple-600' },
  ];

  const currentSector = sectors.find(s => s.id === selectedSector);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-full mb-4 border border-teal-200">
            <Activity className="w-4 h-4 text-teal-600" />
            <span className="text-sm text-teal-700">Real-Time Analytics</span>
          </div>
          <h1 className="text-4xl mb-2">
            Supply Chain <span className="text-teal-600">Monitoring</span>
          </h1>
          <p className="text-sm text-gray-600">Real-time monitoring and early warning system across all supply chain sectors</p>
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

        {/* Time Range Selector */}
        <div className="mb-6 flex gap-3 items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 w-fit">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">Time Range:</span>
          {['24h', '7d', '30d', '90d'].map((range) => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange(range)}
              className={`px-5 py-2 text-sm rounded-xl transition-all duration-300 ${
                timeRange === range
                  ? `bg-gradient-to-r ${currentSector?.gradient} text-white shadow-md`
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {range}
            </motion.button>
          ))}
        </div>

        {/* FISH MONITORING */}
        {selectedSector === 'fish' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-5 gap-4">
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="p-5 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-red-700 mb-1">Algae Concentration</p>
                      <p className="text-3xl text-red-900">92</p>
                      <p className="text-xs text-red-600">cells/mL</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-3 border-t border-red-200">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700">+28% vs yesterday</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-orange-700 mb-1">Water Temperature</p>
                      <p className="text-3xl text-orange-900">21.2</p>
                      <p className="text-xs text-orange-600">°C</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Thermometer className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-3 border-t border-orange-200">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-orange-700">Above normal</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-blue-700 mb-1">Dissolved Oxygen</p>
                      <p className="text-3xl text-blue-900">5.9</p>
                      <p className="text-xs text-blue-600">mg/L</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Droplet className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-3 border-t border-blue-200">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700">Critical level</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-teal-700 mb-1">Catch Volume</p>
                      <p className="text-3xl text-teal-900">720</p>
                      <p className="text-xs text-teal-600">tons</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Fish className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-3 border-t border-teal-200">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700">-40% this week</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="p-5 bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-rose-700 mb-1">Affected Areas</p>
                      <p className="text-3xl text-rose-900">65</p>
                      <p className="text-xs text-rose-600">%</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Fish className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-3 border-t border-rose-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-rose-700">Red tide detected</span>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-5">
              <Card className="p-6 bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-800">Environmental Indicators</h3>
                    <p className="text-xs text-gray-500">Last 24 hours</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={fishEnvironmentalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Line yAxisId="left" type="monotone" dataKey="algae" stroke="#ef4444" name="Algae (cells/mL)" strokeWidth={3} dot={{ r: 5, fill: '#ef4444' }} />
                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#f59e0b" name="Temperature (°C)" strokeWidth={3} dot={{ r: 5, fill: '#f59e0b' }} />
                    <Line yAxisId="right" type="monotone" dataKey="oxygen" stroke="#3b82f6" name="Oxygen (mg/L)" strokeWidth={3} dot={{ r: 5, fill: '#3b82f6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-white border-2 border-teal-100 hover:border-teal-300 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-800">Production Impact</h3>
                    <p className="text-xs text-gray-500">5-day trend</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={fishProductionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="volume" fill="#14b8a6" name="Catch Volume (tons)" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="affected" fill="#ef4444" name="Affected Areas (tons)" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Market & Logistics */}
            <div className="grid grid-cols-3 gap-5">
              <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm text-gray-800">Market Prices</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-green-200">
                    <span className="text-sm text-gray-600">Wholesale</span>
                    <div className="text-right">
                      <span className="text-base text-gray-900">€8.50/kg</span>
                      <span className="text-xs text-red-600 ml-2">+12%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-green-200">
                    <span className="text-sm text-gray-600">Retail</span>
                    <div className="text-right">
                      <span className="text-base text-gray-900">€12.20/kg</span>
                      <span className="text-xs text-red-600 ml-2">+15%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Logistics Costs</span>
                    <div className="text-right">
                      <span className="text-base text-gray-900">€1.80/kg</span>
                      <span className="text-xs text-orange-600 ml-2">+8%</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm text-gray-800">Logistics Status</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-orange-200">
                    <span className="text-sm text-gray-600">Avg Delivery Time</span>
                    <div className="text-right">
                      <span className="text-base text-gray-900">18h</span>
                      <span className="text-xs text-orange-600 ml-2">+6h</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-orange-200">
                    <span className="text-sm text-gray-600">Route Interruptions</span>
                    <span className="text-base text-red-600">3 active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Transport Capacity</span>
                    <div className="text-right">
                      <span className="text-base text-gray-900">65%</span>
                      <span className="text-xs text-yellow-600 ml-2">Low</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm text-gray-800">Affected Zones</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Zone A-3 (Critical)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Zone B-7 (Warning)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Zone C-2 (Monitor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Zone D-1 (Normal)</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Other Sectors */}
        {selectedSector === 'aquaculture' && (
          <OtherSectorMonitoring sector="aquaculture" />
        )}
        {selectedSector === 'grain' && (
          <OtherSectorMonitoring sector="grain" />
        )}
        {selectedSector === 'fruits' && (
          <OtherSectorMonitoring sector="fruits" />
        )}
        {selectedSector === 'dairy' && (
          <OtherSectorMonitoring sector="dairy" />
        )}
      </div>
    </div>
  );
}
