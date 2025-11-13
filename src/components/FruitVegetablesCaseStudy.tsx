import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Truck, Package, Apple, Store, Users, Factory, Warehouse, TrendingUp, TrendingDown, Thermometer, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

type NodeType = 'farm' | 'bulk-transport' | 'processing' | 'packaging' | 
  'wholesale' | 'logistics' | 'retailer' | 'consumers';

interface NodeData {
  id: NodeType;
  icon: any;
  label: string;
  color: string;
  gradient: string;
  description: string;
  position: { x: number; y: number };
}

const nodes: NodeData[] = [
  { id: 'farm', icon: Apple, label: 'Farm', color: 'bg-teal-700', gradient: 'from-teal-600 to-teal-800', description: 'Fresh produce from Portuguese farms', position: { x: 50, y: 180 } },
  { id: 'bulk-transport', icon: Truck, label: 'Bulk Transport', color: 'bg-teal-500', gradient: 'from-teal-400 to-teal-600', description: 'Transportation from farms to processing', position: { x: 160, y: 180 } },
  { id: 'processing', icon: Package, label: 'Processing', color: 'bg-slate-500', gradient: 'from-slate-400 to-slate-600', description: 'Washing, sorting, and quality control', position: { x: 280, y: 180 } },
  { id: 'packaging', icon: Factory, label: 'Packaging', color: 'bg-teal-600', gradient: 'from-teal-500 to-emerald-600', description: 'Consumer-ready packaging', position: { x: 400, y: 180 } },
  { id: 'wholesale', icon: Warehouse, label: 'Wholesale', color: 'bg-slate-500', gradient: 'from-slate-400 to-slate-600', description: 'Wholesale distribution centers', position: { x: 520, y: 180 } },
  { id: 'logistics', icon: Truck, label: 'Logistics', color: 'bg-teal-500', gradient: 'from-teal-400 to-teal-600', description: 'Cold chain distribution', position: { x: 640, y: 180 } },
  { id: 'retailer', icon: Store, label: 'Retailer', color: 'bg-teal-600', gradient: 'from-teal-500 to-emerald-600', description: 'Supermarkets and retail stores', position: { x: 760, y: 180 } },
  { id: 'consumers', icon: Users, label: 'Consumers', color: 'bg-slate-600', gradient: 'from-slate-500 to-slate-700', description: 'End consumers', position: { x: 880, y: 180 } },
];

const connections = [
  { from: 'farm', to: 'bulk-transport', color: 'stroke-teal-500' },
  { from: 'bulk-transport', to: 'processing', color: 'stroke-teal-500' },
  { from: 'processing', to: 'packaging', color: 'stroke-slate-500' },
  { from: 'packaging', to: 'wholesale', color: 'stroke-teal-500' },
  { from: 'wholesale', to: 'logistics', color: 'stroke-slate-500' },
  { from: 'logistics', to: 'retailer', color: 'stroke-teal-500' },
  { from: 'retailer', to: 'consumers', color: 'stroke-teal-500' },
];

// Mock data for trend charts
const tempTrendData = Array.from({ length: 20 }, (_, i) => ({ value: 3 + Math.sin(i * 0.5) * 1.5 + Math.random() * 0.5 }));
const logisticsTrendData = Array.from({ length: 20 }, (_, i) => ({ value: 12 + Math.sin(i * 0.3) * 3 + Math.random() * 2 }));
const wasteTrendData = Array.from({ length: 20 }, (_, i) => ({ value: 8 - i * 0.15 + Math.random() * 1.5 }));

export default function FruitVegetablesCaseStudy({ onBack }: { onBack?: () => void }) {
  const [hoveredNode, setHoveredNode] = useState<NodeType | null>(null);

  const getNodeById = (id: NodeType) => nodes.find(n => n.id === id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={onBack ? onBack : () => window.location.reload()}
            className="gap-2 h-10 text-sm hover:bg-teal-50 hover:border-teal-300 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Use Cases
          </Button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-full mb-4 border-2 border-teal-200">
            <Apple className="w-4 h-4 text-teal-600" />
            <span className="text-sm text-teal-700">Case Study 2</span>
          </div>
          <h1 className="text-4xl mb-2">
            Fruits & Vegetables{' '}
            <span className="text-teal-600">Supply Chain - Portugal</span>
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Interactive visualization of the Portuguese fresh produce supply chain - hover over nodes for details
          </p>
        </div>

        {/* Supply Chain Diagram */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-teal-100 overflow-hidden">
          <div className="relative" style={{ height: '400px' }}>
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <marker id="arrowhead-fruit" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#2d6b6a" />
                </marker>
              </defs>
              {connections.map((conn, idx) => {
                const fromNode = getNodeById(conn.from as NodeType);
                const toNode = getNodeById(conn.to as NodeType);
                if (!fromNode || !toNode) return null;

                const x1 = fromNode.position.x + 75;
                const y1 = fromNode.position.y + 40;
                const x2 = toNode.position.x + 5;
                const y2 = toNode.position.y + 40;

                return (
                  <motion.line
                    key={idx}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className={conn.color}
                    strokeWidth="3"
                    markerEnd="url(#arrowhead-fruit)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              const hovered = hoveredNode === node.id;

              return (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{ left: node.position.x, top: node.position.y, zIndex: hovered ? 20 : 10 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${node.gradient} rounded-2xl flex items-center justify-center shadow-xl cursor-pointer relative group`}
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        scale: hovered ? 1.1 : 1,
                        boxShadow: hovered 
                          ? '0 20px 25px -5px rgba(45, 107, 106, 0.3), 0 10px 10px -5px rgba(45, 107, 106, 0.2)'
                          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                    </motion.div>
                    <p className="text-xs mt-3 text-center max-w-[120px] text-gray-700">
                      {node.label}
                    </p>

                    {/* Hover tooltip */}
                    {hovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl z-30 w-48"
                      >
                        <p className="leading-relaxed">{node.description}</p>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Metrics and Trends */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {/* Temperature Metric */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-blue-700 mb-1">Cold Chain Temp</p>
                <p className="text-2xl text-blue-900">3.2°C</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700">
              <TrendingDown className="w-3 h-3" />
              <span>Optimal range</span>
            </div>
          </Card>

          {/* Logistics Delay */}
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-orange-700 mb-1">Avg Delay</p>
                <p className="text-2xl text-orange-900">11.4h</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-orange-700">
              <TrendingUp className="w-3 h-3" />
              <span>+8% vs target</span>
            </div>
          </Card>

          {/* Freshness Score */}
          <Card className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-teal-700 mb-1">Freshness Score</p>
                <p className="text-2xl text-teal-900">94</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                <Apple className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700">
              <TrendingUp className="w-3 h-3" />
              <span>+2% this week</span>
            </div>
          </Card>

          {/* Waste Rate */}
          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-emerald-700 mb-1">Waste Rate</p>
                <p className="text-2xl text-emerald-900">5.2%</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700">
              <TrendingDown className="w-3 h-3" />
              <span>-12% this month</span>
            </div>
          </Card>
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-100">
            <h3 className="text-sm mb-4 text-blue-900">Cold Chain Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={tempTrendData}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-100">
            <h3 className="text-sm mb-4 text-orange-900">Logistics Delay Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={logisticsTrendData}>
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-50/50 to-white border-2 border-emerald-100">
            <h3 className="text-sm mb-4 text-emerald-900">Waste Reduction Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={wasteTrendData}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-teal-900">Portugal Focus</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This case study focuses on the Portuguese fruits and vegetables supply chain, analyzing logistics efficiency, cold chain management, and distribution optimization from farm to consumer.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-slate-900">Cold Chain Critical</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Fresh produce requires rapid transport, temperature control, and careful handling at each stage to maintain quality and minimize waste throughout the entire supply chain.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
