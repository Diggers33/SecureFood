import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Thermometer,
  Droplet,
  Fish,
  Activity,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import GrainMonitoring from './GrainMonitoring';
import FruitsMonitoring from './FruitsMonitoring';
import DairyMonitoring from './DairyMonitoring';

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

type MonitoringSector = 'aquaculture' | 'grain' | 'fruits' | 'dairy';

interface OtherSectorMonitoringProps {
  sector: MonitoringSector;
}

export default function OtherSectorMonitoring({ sector }: OtherSectorMonitoringProps) {
  if (sector === 'aquaculture') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4">
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-orange-700 mb-1">Ambient Temp</p>
                  <p className="text-3xl text-orange-900">36</p>
                  <p className="text-xs text-orange-600">°C</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Thermometer className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 pt-3 border-t border-orange-200">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">Above threshold</span>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-blue-700 mb-1">Water Temp</p>
                  <p className="text-3xl text-blue-900">30</p>
                  <p className="text-xs text-blue-600">°C</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 pt-3 border-t border-blue-200">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">At threshold</span>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-red-700 mb-1">Mortality Rate</p>
                  <p className="text-3xl text-red-900">4.2</p>
                  <p className="text-xs text-red-600">%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 pt-3 border-t border-red-200">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">+250% increase</span>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-amber-700 mb-1">Disease Outbreaks</p>
                  <p className="text-3xl text-amber-900">3</p>
                  <p className="text-xs text-amber-600">active</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 pt-3 border-t border-amber-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-amber-700">Requires attention</span>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-teal-700 mb-1">Farm Status</p>
                  <p className="text-3xl text-teal-900">85</p>
                  <p className="text-xs text-teal-600">% operational</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 pt-3 border-t border-teal-200">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-teal-700">Stable</span>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-5">
          <Card className="p-6 bg-white border-2 border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                <Thermometer className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm text-gray-800">Temperature Trends</h3>
                <p className="text-xs text-gray-500">5-day monitoring</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={aquacultureTempData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="ambient" stroke="#f97316" name="Ambient Temp (°C)" strokeWidth={3} dot={{ r: 5, fill: '#f97316' }} />
                <Line type="monotone" dataKey="water" stroke="#3b82f6" name="Water Temp (°C)" strokeWidth={3} dot={{ r: 5, fill: '#3b82f6' }} />
                <Line type="monotone" dataKey="threshold" stroke="#ef4444" name="Threshold" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-white border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm text-gray-800">Health Indicators</h3>
                <p className="text-xs text-gray-500">4-week trend</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={aquacultureHealthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="mortality" fill="#ef4444" name="Mortality Rate (%)" radius={[10, 10, 0, 0]} />
                <Bar dataKey="diseaseOutbreaks" fill="#f97316" name="Disease Outbreaks" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-3 gap-5">
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                <Droplet className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm text-gray-800">Water Quality</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                <span className="text-sm text-gray-600">pH Level</span>
                <span className="text-base text-gray-900">7.2</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                <span className="text-sm text-gray-600">Salinity</span>
                <span className="text-base text-gray-900">35 ppt</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Dissolved O₂</span>
                <span className="text-base text-green-700">6.5 mg/L</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <Fish className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm text-gray-800">Production</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-teal-200">
                <span className="text-sm text-gray-600">Fish Biomass</span>
                <span className="text-base text-gray-900">3,450 kg</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-teal-200">
                <span className="text-sm text-gray-600">Feed Conversion</span>
                <span className="text-base text-gray-900">1.6 FCR</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Growth Rate</span>
                <span className="text-base text-green-700">12 g/day</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm text-gray-800">Farm Units</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Unit 1-2 (Normal)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Unit 3 (Warning)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Unit 4 (Critical)</span>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    );
  }

  if (sector === 'grain') {
    return <GrainMonitoring />;
  }

  if (sector === 'fruits') {
    return <FruitsMonitoring />;
  }

  if (sector === 'dairy') {
    return <DairyMonitoring />;
  }

  // Return placeholder for now for other sectors (we can add them later if needed)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-2 border-gray-200">
        <p className="text-gray-600 text-sm">
          Monitoring dashboard for {sector} coming soon...
        </p>
      </Card>
    </motion.div>
  );
}