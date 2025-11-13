import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Thermometer,
  Milk,
  Truck,
  Package,
  Activity,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

export default function DairyMonitoring() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-indigo-700 mb-1">Milk Production</p>
                <p className="text-3xl text-indigo-900">22.5</p>
                <p className="text-xs text-indigo-600">L/cow/day</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Milk className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-indigo-200">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">-21% from normal</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-orange-700 mb-1">Heat Stress Level</p>
                <p className="text-3xl text-orange-900">3</p>
                <p className="text-xs text-orange-600">High</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Thermometer className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-orange-200">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-700">Affecting output</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-blue-700 mb-1">Cold Chain Temp</p>
                <p className="text-3xl text-blue-900">4.2</p>
                <p className="text-xs text-blue-600">°C</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-blue-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">Optimal range</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-amber-700 mb-1">Temp Failures</p>
                <p className="text-3xl text-amber-900">2</p>
                <p className="text-xs text-amber-600">incidents</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-amber-200">
              <Activity className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-700">In transport</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-green-700 mb-1">Quality Score</p>
                <p className="text-3xl text-green-900">92</p>
                <p className="text-xs text-green-600">%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-green-200">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">Above standard</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        <Card className="p-6 bg-white border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <Milk className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm text-gray-800">Production vs Heat Stress</h3>
              <p className="text-xs text-gray-500">4-week correlation</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dairyProductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line yAxisId="left" type="monotone" dataKey="production" stroke="#6366f1" name="Production (L/cow/day)" strokeWidth={3} dot={{ r: 5, fill: '#6366f1' }} />
              <Line yAxisId="right" type="monotone" dataKey="stress" stroke="#f97316" name="Heat Stress Level" strokeWidth={3} dot={{ r: 5, fill: '#f97316' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm text-gray-800">Cold Chain Performance</h3>
              <p className="text-xs text-gray-500">Temperature monitoring</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dairyColdChainData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="location" tick={{ fontSize: 10 }} stroke="#9ca3af" angle={-15} textAnchor="end" height={70} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar yAxisId="left" dataKey="temp" fill="#3b82f6" name="Temperature (°C)" radius={[10, 10, 0, 0]} />
              <Bar yAxisId="right" dataKey="failures" fill="#ef4444" name="Failures" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-3 gap-5">
        <Card className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Milk className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm text-gray-800">Herd Health</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <span className="text-sm text-gray-600">Active Cows</span>
              <span className="text-base text-gray-900">1,245</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <span className="text-sm text-gray-600">Health Score</span>
              <span className="text-base text-green-700">Good</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Vaccination Rate</span>
              <span className="text-base text-gray-900">98%</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm text-gray-800">Quality Metrics</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-green-200">
              <span className="text-sm text-gray-600">Bacterial Count</span>
              <span className="text-base text-green-700">Low</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-green-200">
              <span className="text-sm text-gray-600">Somatic Cells</span>
              <span className="text-base text-green-700">Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fat Content</span>
              <span className="text-base text-gray-900">3.8%</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm text-gray-800">Distribution</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Farm to processor (OK)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Transport routes (2 alerts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Retail delivery (OK)</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
