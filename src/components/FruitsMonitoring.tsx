import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Thermometer,
  Droplet,
  Apple,
  Package,
  CloudRain,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

export default function FruitsMonitoring() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-orange-700 mb-1">Temperature</p>
                <p className="text-3xl text-orange-900">27</p>
                <p className="text-xs text-orange-600">°C</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Thermometer className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-orange-200">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">Heat stress risk</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-blue-700 mb-1">Rainfall</p>
                <p className="text-3xl text-blue-900">5</p>
                <p className="text-xs text-blue-600">mm</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <CloudRain className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-blue-200">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">Drought conditions</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-amber-700 mb-1">Soil Moisture</p>
                <p className="text-3xl text-amber-900">18</p>
                <p className="text-xs text-amber-600">%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <Droplet className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-amber-200">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">Critical low</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-red-700 mb-1">Yield Drop</p>
                <p className="text-3xl text-red-900">28</p>
                <p className="text-xs text-red-600">%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-700">vs historical avg</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-green-700 mb-1">Cold Chain</p>
                <p className="text-3xl text-green-900">95</p>
                <p className="text-xs text-green-600">% uptime</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">Performing well</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        <Card className="p-6 bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <CloudRain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm text-gray-800">Climate Conditions</h3>
              <p className="text-xs text-gray-500">6-month trend</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={fruitsClimateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="rainfall" stroke="#3b82f6" name="Rainfall (mm)" strokeWidth={3} dot={{ r: 5, fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="soilMoisture" stroke="#10b981" name="Soil Moisture (%)" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
              <Line type="monotone" dataKey="temp" stroke="#f97316" name="Temperature (°C)" strokeWidth={3} dot={{ r: 5, fill: '#f97316' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white border-2 border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <Apple className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm text-gray-800">Crop Yield Comparison</h3>
              <p className="text-xs text-gray-500">Current vs Historical</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={fruitsYieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="crop" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="historical" fill="#94a3b8" name="Historical Avg (tons/ha)" radius={[10, 10, 0, 0]} />
              <Bar dataKey="current" fill="#10b981" name="Current Season (tons/ha)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-3 gap-5">
        <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <Apple className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm text-gray-800">Crop Health</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-green-200">
              <span className="text-sm text-gray-600">Tomatoes</span>
              <span className="text-base text-orange-700">Stressed</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-green-200">
              <span className="text-sm text-gray-600">Lettuce</span>
              <span className="text-base text-orange-700">Stressed</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Peppers</span>
              <span className="text-base text-red-700">Critical</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <Droplet className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm text-gray-800">Irrigation Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-blue-200">
              <span className="text-sm text-gray-600">Water Usage</span>
              <span className="text-base text-red-700">+45%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-blue-200">
              <span className="text-sm text-gray-600">Reservoir Level</span>
              <span className="text-base text-orange-700">32%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Efficiency</span>
              <span className="text-base text-gray-900">78%</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm text-gray-800">Supply Chain</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Cold storage (OK)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Transport (OK)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Quality checks</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
