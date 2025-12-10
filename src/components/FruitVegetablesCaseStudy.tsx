import { useState } from 'react';
import { Card } from './ui/card';
import { Truck, Package, Apple, Store, Users, Factory, Warehouse, TrendingUp, TrendingDown, Thermometer, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BackToUseCasesButton } from './BackToUseCasesButton';

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
  kpis: {
    name: string;
    value: string;
    trend?: 'up' | 'down' | 'stable';
  }[];
  metrics?: {
    throughput: string;
    efficiency: string;
    quality: string;
    cost: string;
  };
}

const nodes: NodeData[] = [
  { 
    id: 'farm', 
    icon: Apple, 
    label: 'Farm', 
    color: 'bg-teal-700', 
    gradient: 'from-teal-600 to-teal-800', 
    description: 'Fresh produce from Portuguese farms', 
    position: { x: 50, y: 180 },
    kpis: [
      { name: 'Production Volume', value: '45k tons', trend: 'stable' },
      { name: 'Crop Yield', value: '18 t/ha', trend: 'up' },
      { name: 'Quality Grade', value: 'A+', trend: 'stable' }
    ],
    metrics: {
      throughput: '45,000 tons/year',
      efficiency: '92%',
      quality: '96%',
      cost: '€0.85/kg'
    }
  },
  { 
    id: 'bulk-transport', 
    icon: Truck, 
    label: 'Bulk Transport', 
    color: 'bg-teal-500', 
    gradient: 'from-teal-400 to-teal-600', 
    description: 'Transportation from farms to processing', 
    position: { x: 200, y: 180 },
    kpis: [
      { name: 'Transit Time', value: '3.2 hours', trend: 'down' },
      { name: 'Capacity Util', value: '88%', trend: 'up' },
      { name: 'On-Time Rate', value: '94%', trend: 'stable' }
    ],
    metrics: {
      throughput: '43,200 tons/year',
      efficiency: '88%',
      quality: '95%',
      cost: '€0.12/kg'
    }
  },
  { 
    id: 'processing', 
    icon: Package, 
    label: 'Processing', 
    color: 'bg-slate-500', 
    gradient: 'from-slate-400 to-slate-600', 
    description: 'Washing, sorting, and quality control', 
    position: { x: 350, y: 180 },
    kpis: [
      { name: 'Processing Rate', value: '280 kg/min', trend: 'up' },
      { name: 'Quality Pass', value: '97%', trend: 'up' },
      { name: 'Waste Rate', value: '4.2%', trend: 'down' }
    ],
    metrics: {
      throughput: '41,400 tons/year',
      efficiency: '95%',
      quality: '97%',
      cost: '€0.18/kg'
    }
  },
  { 
    id: 'packaging', 
    icon: Factory, 
    label: 'Packaging', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    description: 'Consumer-ready packaging', 
    position: { x: 500, y: 180 },
    kpis: [
      { name: 'Pack Speed', value: '650 units/hr', trend: 'stable' },
      { name: 'Material Cost', value: '€0.15/unit', trend: 'up' },
      { name: 'Line Efficiency', value: '91%', trend: 'stable' }
    ],
    metrics: {
      throughput: '39,700 tons/year',
      efficiency: '91%',
      quality: '98%',
      cost: '€0.22/kg'
    }
  },
  { 
    id: 'wholesale', 
    icon: Warehouse, 
    label: 'Wholesale', 
    color: 'bg-slate-500', 
    gradient: 'from-slate-400 to-slate-600', 
    description: 'Wholesale distribution centers', 
    position: { x: 650, y: 180 },
    kpis: [
      { name: 'Storage Volume', value: '38k tons', trend: 'stable' },
      { name: 'Turnover Rate', value: '8.5x/year', trend: 'up' },
      { name: 'Temp Control', value: '3.1°C avg', trend: 'stable' }
    ],
    metrics: {
      throughput: '38,000 tons/year',
      efficiency: '89%',
      quality: '96%',
      cost: '€0.08/kg storage'
    }
  },
  { 
    id: 'logistics', 
    icon: Truck, 
    label: 'Logistics', 
    color: 'bg-teal-500', 
    gradient: 'from-teal-400 to-teal-600', 
    description: 'Cold chain distribution', 
    position: { x: 800, y: 180 },
    kpis: [
      { name: 'Delivery Time', value: '8.4 hours', trend: 'down' },
      { name: 'Cold Chain', value: '99.2%', trend: 'up' },
      { name: 'Fuel Efficiency', value: '7.8 L/100km', trend: 'down' }
    ],
    metrics: {
      throughput: '36,500 tons/year',
      efficiency: '93%',
      quality: '97%',
      cost: '€0.16/kg'
    }
  },
  { 
    id: 'retailer', 
    icon: Store, 
    label: 'Retailer', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    description: 'Supermarkets and retail stores', 
    position: { x: 950, y: 180 },
    kpis: [
      { name: 'Sales Volume', value: '35k tons', trend: 'stable' },
      { name: 'Shelf Life', value: '6.8 days avg', trend: 'up' },
      { name: 'Waste Rate', value: '3.9%', trend: 'down' }
    ],
    metrics: {
      throughput: '35,000 tons/year',
      efficiency: '95%',
      quality: '94%',
      cost: '€2.85/kg retail'
    }
  },
  { 
    id: 'consumers', 
    icon: Users, 
    label: 'Consumers', 
    color: 'bg-slate-600', 
    gradient: 'from-slate-500 to-slate-700', 
    description: 'End consumers', 
    position: { x: 1100, y: 180 },
    kpis: [
      { name: 'Consumption', value: '34k tons', trend: 'stable' },
      { name: 'Satisfaction', value: '89%', trend: 'up' },
      { name: 'Price Index', value: '€2.85/kg', trend: 'up' }
    ],
    metrics: {
      throughput: '34,000 tons/year',
      efficiency: '97%',
      quality: '93%',
      cost: '€2.85/kg avg'
    }
  },
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
const tempTrendData = [
  { name: 'Jan', value: 2.8 },
  { name: 'Feb', value: 2.9 },
  { name: 'Mar', value: 3.2 },
  { name: 'Apr', value: 3.5 },
  { name: 'May', value: 3.8 },
  { name: 'Jun', value: 4.2 },
  { name: 'Jul', value: 4.5 },
  { name: 'Aug', value: 4.3 },
  { name: 'Sep', value: 3.8 },
  { name: 'Oct', value: 3.4 },
  { name: 'Nov', value: 3.0 },
  { name: 'Dec', value: 2.9 },
];

const logisticsTrendData = [
  { name: 'Jan', value: 12.5 },
  { name: 'Feb', value: 11.8 },
  { name: 'Mar', value: 11.2 },
  { name: 'Apr', value: 10.5 },
  { name: 'May', value: 10.8 },
  { name: 'Jun', value: 11.5 },
  { name: 'Jul', value: 12.2 },
  { name: 'Aug', value: 11.9 },
  { name: 'Sep', value: 11.4 },
  { name: 'Oct', value: 10.9 },
  { name: 'Nov', value: 11.1 },
  { name: 'Dec', value: 11.4 },
];

const wasteTrendData = [
  { name: 'Jan', value: 8.2 },
  { name: 'Feb', value: 7.8 },
  { name: 'Mar', value: 7.5 },
  { name: 'Apr', value: 7.0 },
  { name: 'May', value: 6.8 },
  { name: 'Jun', value: 6.2 },
  { name: 'Jul', value: 5.8 },
  { name: 'Aug', value: 5.5 },
  { name: 'Sep', value: 5.3 },
  { name: 'Oct', value: 5.1 },
  { name: 'Nov', value: 5.0 },
  { name: 'Dec', value: 5.2 },
];

export default function FruitVegetablesCaseStudy({ onBackToUseCases }: { onBackToUseCases?: () => void }) {
  const [hoveredNode, setHoveredNode] = useState<NodeType | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);

  const getNodeById = (id: NodeType) => nodes.find(n => n.id === id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto p-6">
        {/* Back Button */}
        {onBackToUseCases && (
          <div className="mb-6">
            <BackToUseCasesButton onClick={onBackToUseCases} />
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          {/* Sector Indicator */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-green-500 to-emerald-600">
              <Apple className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl mb-1">
                Fruits & Vegetables <span className="text-teal-600">Dashboard</span>
              </h1>
              <p className="text-sm text-gray-600">Fruits & Vegetables - Portugal</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Interactive visualization of the Portuguese fresh produce supply chain - hover over nodes for details
          </p>
        </div>

        {/* Supply Chain Diagram */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-teal-100 overflow-visible relative z-50">
          <div className="relative overflow-visible pb-64" style={{ height: '440px' }}>
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              <defs>
                {/* Arrowhead markers */}
                <marker id="arrowhead-fruit" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L0,10 L10,5 z" fill="#14b8a6" />
                </marker>
                <marker id="arrowhead-fruit-active" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M0,0 L0,12 L12,6 z" fill="#0d9488" />
                </marker>
              </defs>
              {connections.map((conn, idx) => {
                const fromNode = getNodeById(conn.from as NodeType);
                const toNode = getNodeById(conn.to as NodeType);
                if (!fromNode || !toNode) return null;

                const highlighted = selectedNode === conn.from || selectedNode === conn.to;
                
                // Node dimensions
                const nodeWidth = 48;
                const nodeHeight = 48;
                
                // Calculate start and end points at the edges of nodes
                const fromCenterX = fromNode.position.x + nodeWidth / 2;
                const fromCenterY = fromNode.position.y + nodeHeight / 2;
                const toCenterX = toNode.position.x + nodeWidth / 2;
                const toCenterY = toNode.position.y + nodeHeight / 2;
                
                // Standard horizontal connections - from right edge to left edge
                const x1 = fromNode.position.x + nodeWidth;
                const y1 = fromCenterY;
                const x2 = toNode.position.x;
                const y2 = toCenterY;
                
                // Calculate control points for smooth Bézier curve
                const dx = x2 - x1;
                const dy = y2 - y1;
                const cx1 = x1 + dx * 0.5;
                const cy1 = y1;
                const cx2 = x1 + dx * 0.5;
                const cy2 = y2;
                
                // Create smooth cubic Bézier path
                const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

                return (
                  <motion.path
                    key={idx}
                    d={pathData}
                    stroke={highlighted ? '#0d9488' : '#14b8a6'}
                    strokeWidth={highlighted ? 3 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    markerEnd={highlighted ? 'url(#arrowhead-fruit-active)' : 'url(#arrowhead-fruit)'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: highlighted ? 0.9 : (selectedNode ? 0.2 : 0.5)
                    }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              const hovered = hoveredNode === node.id;
              const selected = selectedNode === node.id;

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
                  onClick={() => setSelectedNode(selected ? null : node.id)}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${node.gradient} rounded-xl flex items-center justify-center shadow-xl cursor-pointer relative group`}
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        scale: hovered ? 1.1 : 1,
                        boxShadow: hovered 
                          ? '0 20px 25px -5px rgba(45, 107, 106, 0.3), 0 10px 10px -5px rgba(45, 107, 106, 0.2)'
                          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-6 h-6 text-white drop-shadow-lg" />
                    </motion.div>
                    <p className="text-xs mt-3 text-center max-w-[120px] text-gray-700">
                      {node.label}
                    </p>

                    {/* Hover/Click expandable tooltip with KPIs */}
                    {(hovered || selected) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          height: selected ? 'auto' : 'auto'
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => {
                          if (!selected) {
                            setHoveredNode(null);
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!selected) {
                            setSelectedNode(node.id);
                          }
                        }}
                        className={`absolute top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-xs rounded-xl shadow-2xl border-2 transition-all ${
                          selected 
                            ? 'w-96 p-6 border-orange-400/50 z-[9999]' 
                            : 'w-64 p-4 border-teal-500/30 cursor-pointer hover:border-teal-400/50 z-[9999]'
                        }`}
                      >
                        {/* Header */}
                        <div className={`flex items-start justify-between ${selected ? 'mb-4 pb-3' : 'mb-3 pb-2'} border-b border-gray-700`}>
                          <div className="flex-1">
                            <p className={`text-teal-300 ${selected ? 'text-base mb-1.5' : 'mb-1'}`}>{node.label}</p>
                            <p className={`text-gray-400 leading-relaxed ${selected ? 'text-xs' : 'text-[10px]'}`}>{node.description}</p>
                          </div>
                          {selected && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedNode(null);
                              }}
                              className="ml-3 w-6 h-6 rounded-full bg-gray-700 hover:bg-red-600 flex items-center justify-center transition-colors flex-shrink-0"
                            >
                              <span className="text-white text-sm">×</span>
                            </button>
                          )}
                        </div>

                        {/* Compact view - first 3 KPIs */}
                        {!selected && (
                          <>
                            <div className="space-y-2">
                              {node.kpis.slice(0, 3).map((kpi, i) => (
                                <div key={i} className="flex items-center justify-between">
                                  <span className="text-[10px] text-gray-300">{kpi.name}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-white">{kpi.value}</span>
                                    {kpi.trend === 'up' && <TrendingUp className="w-3 h-3 text-orange-400" />}
                                    {kpi.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                                    {kpi.trend === 'stable' && <span className="w-3 h-0.5 bg-gray-400 rounded"></span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 pt-2 border-t border-gray-700 text-center">
                              <p className="text-[9px] text-teal-400 hover:text-teal-300 transition-colors">Click to view detailed metrics</p>
                            </div>
                          </>
                        )}

                        {/* Expanded view - all KPIs and metrics */}
                        {selected && (
                          <>
                            {/* All KPIs */}
                            <div className="space-y-2.5 mb-4">
                              {node.kpis.map((kpi, i) => (
                                <div key={i} className="flex items-center justify-between bg-gray-800/50 p-2.5 rounded-lg">
                                  <span className="text-xs text-gray-300">{kpi.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-white">{kpi.value}</span>
                                    {kpi.trend === 'up' && <TrendingUp className="w-4 h-4 text-orange-400" />}
                                    {kpi.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                                    {kpi.trend === 'stable' && <span className="w-4 h-0.5 bg-gray-400 rounded"></span>}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Performance Metrics */}
                            {node.metrics && (
                              <>
                                <div className="border-t border-gray-700 pt-4 mb-3">
                                  <p className="text-xs text-teal-300 mb-3">Performance Metrics</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5">
                                  <div className="bg-teal-900/30 p-2.5 rounded-lg border border-teal-700/30">
                                    <p className="text-[10px] text-teal-400 mb-1">Throughput</p>
                                    <p className="text-xs text-white">{node.metrics.throughput}</p>
                                  </div>
                                  <div className="bg-gray-800/50 p-2.5 rounded-lg border border-gray-700/30">
                                    <p className="text-[10px] text-gray-400 mb-1">Efficiency</p>
                                    <p className="text-xs text-white">{node.metrics.efficiency}</p>
                                  </div>
                                  <div className="bg-teal-900/30 p-2.5 rounded-lg border border-teal-700/30">
                                    <p className="text-[10px] text-teal-400 mb-1">Quality</p>
                                    <p className="text-xs text-white">{node.metrics.quality}</p>
                                  </div>
                                  <div className="bg-gray-800/50 p-2.5 rounded-lg border border-gray-700/30">
                                    <p className="text-[10px] text-gray-400 mb-1">Cost</p>
                                    <p className="text-xs text-white">{node.metrics.cost}</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}

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
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={tempTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[2, 5]} 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                  label={{ value: '°C', position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value.toFixed(1)}°C`, 'Temperature']}
                />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-100">
            <h3 className="text-sm mb-4 text-orange-900">Logistics Delay Trend</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={logisticsTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[10, 13]} 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'hours', position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value.toFixed(1)}h`, 'Delay']}
                />
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-50/50 to-white border-2 border-emerald-100">
            <h3 className="text-sm mb-4 text-emerald-900">Waste Reduction Trend</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={wasteTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[4, 9]} 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                  label={{ value: '%', position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value.toFixed(1)}%`, 'Waste']}
                />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
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