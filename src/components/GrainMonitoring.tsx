import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Wheat,
  Truck,
  DollarSign,
  Package,
  MapPin
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

export default function GrainMonitoring() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-amber-700 mb-1">Int'l Price</p>
                <p className="text-3xl text-amber-900">€455</p>
                <p className="text-xs text-amber-600">/ton</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-amber-200">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">+46% vs Jan</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-green-700 mb-1">Domestic Price</p>
                <p className="text-3xl text-green-900">€395</p>
                <p className="text-xs text-green-600">/ton</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-green-200">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">+41% vs Jan</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-red-700 mb-1">Sea Route Delays</p>
                <p className="text-3xl text-red-900">45</p>
                <p className="text-xs text-red-600">incidents</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wheat className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-700">Blockade impact</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-orange-700 mb-1">Road Delays</p>
                <p className="text-3xl text-orange-900">28</p>
                <p className="text-xs text-orange-600">incidents</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-orange-200">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-orange-700">Above average</span>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-blue-700 mb-1">Export Capacity</p>
                <p className="text-3xl text-blue-900">20</p>
                <p className="text-xs text-blue-600">%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-blue-200">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">War impact</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        <Card className="p-6 bg-white border-2 border-amber-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm text-gray-800">Price Trends</h3>
              <p className="text-xs text-gray-500">6-month comparison</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={grainPriceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="international" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="International (€/ton)" strokeWidth={3} />
              <Area type="monotone" dataKey="domestic" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Domestic (€/ton)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white border-2 border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm text-gray-800">Logistics Analysis</h3>
              <p className="text-xs text-gray-500">By transport route</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={grainLogisticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="route" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e5e7eb' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="delays" fill="#ef4444" name="Delays" radius={[10, 10, 0, 0]} />
              <Bar dataKey="capacity" fill="#10b981" name="Capacity (%)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-3 gap-5">
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm text-gray-800">Storage Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-blue-200">
              <span className="text-sm text-gray-600">Field Elevators</span>
              <span className="text-base text-gray-900">78% full</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-blue-200">
              <span className="text-sm text-gray-600">Sea Elevators</span>
              <span className="text-base text-gray-900">92% full</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Capacity</span>
              <span className="text-base text-orange-700">Near limit</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm text-gray-800">Production</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-green-200">
              <span className="text-sm text-gray-600">Current Harvest</span>
              <span className="text-base text-gray-900">2.8M tons</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-green-200">
              <span className="text-sm text-gray-600">Affected Farms</span>
              <span className="text-base text-red-700">35%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Quality Grade</span>
              <span className="text-base text-green-700">A-Grade</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm text-gray-800">Risk Zones</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Eastern region (High)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Southern ports (Medium)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Western region (Low)</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
