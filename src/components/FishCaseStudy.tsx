import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Factory, 
  Truck, 
  Users, 
  Fish, 
  Store,
  Building2,
  Info,
  AlertTriangle,
  ArrowLeft,
  Waves,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Thermometer,
  Droplets,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

type NodeType = 'fingerlings' | 'transport1' | 'aquaculture' | 'primary-processing' | 
  'transport2' | 'retail' | 'consumers1' | 'secondary-processing' | 'bigh' | 
  'restaurant' | 'consumers2';

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
    id: 'fingerlings', 
    icon: Fish, 
    label: 'France Fingerlings', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-teal-700', 
    description: 'Juvenile fish imported from France for farming', 
    position: { x: 50, y: 180 },
    kpis: [
      { name: 'Supply Volume', value: '2.5M units', trend: 'stable' },
      { name: 'Survival Rate', value: '94%', trend: 'up' },
      { name: 'Import Cost', value: '€0.85/unit', trend: 'up' }
    ],
    metrics: {
      throughput: '2.5M units/year',
      efficiency: '94%',
      quality: '96%',
      cost: '€0.85/unit'
    }
  },
  { 
    id: 'transport1', 
    icon: Truck, 
    label: 'Transport', 
    color: 'bg-slate-500', 
    gradient: 'from-slate-400 to-slate-600', 
    description: 'Transportation of fingerlings to farms', 
    position: { x: 160, y: 180 },
    kpis: [
      { name: 'Transit Time', value: '6 hours', trend: 'stable' },
      { name: 'Survival Rate', value: '98%', trend: 'up' },
      { name: 'Cost per Unit', value: '€0.12', trend: 'stable' }
    ],
    metrics: {
      throughput: '2.45M units/year',
      efficiency: '98%',
      quality: '97%',
      cost: '€0.12/unit'
    }
  },
  { 
    id: 'aquaculture', 
    icon: Waves, 
    label: 'Aquaculture Farming', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-teal-700', 
    description: 'Fish farming operations', 
    position: { x: 270, y: 180 },
    kpis: [
      { name: 'Production', value: '850 tons', trend: 'up' },
      { name: 'Water Quality', value: '7.8 pH', trend: 'stable' },
      { name: 'Feed Conversion', value: '1.2:1', trend: 'up' }
    ],
    metrics: {
      throughput: '850 tons/year',
      efficiency: '89%',
      quality: '94%',
      cost: '€4.20/kg'
    }
  },
  { 
    id: 'primary-processing', 
    icon: Factory, 
    label: 'Primary Processing', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    description: 'Whole gutted and filleted fish processing', 
    position: { x: 400, y: 180 },
    kpis: [
      { name: 'Processing Rate', value: '450 kg/hr', trend: 'stable' },
      { name: 'Yield Rate', value: '68%', trend: 'up' },
      { name: 'Quality Score', value: '96%', trend: 'stable' }
    ],
    metrics: {
      throughput: '578 tons/year',
      efficiency: '85%',
      quality: '96%',
      cost: '€1.80/kg'
    }
  },
  { 
    id: 'transport2', 
    icon: Truck, 
    label: 'Transport', 
    color: 'bg-slate-500', 
    gradient: 'from-slate-400 to-slate-600', 
    description: 'Distribution to retail', 
    position: { x: 530, y: 180 },
    kpis: [
      { name: 'Delivery Time', value: '4 hours', trend: 'stable' },
      { name: 'Temperature', value: '2-4°C', trend: 'stable' },
      { name: 'On-Time Rate', value: '94%', trend: 'up' }
    ],
    metrics: {
      throughput: '400 tons/year',
      efficiency: '94%',
      quality: '95%',
      cost: '€0.45/kg'
    }
  },
  { 
    id: 'retail', 
    icon: Store, 
    label: 'Retail', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    description: 'Retail stores and markets', 
    position: { x: 660, y: 180 },
    kpis: [
      { name: 'Sales Volume', value: '385 tons', trend: 'stable' },
      { name: 'Freshness Score', value: '93%', trend: 'up' },
      { name: 'Waste Rate', value: '3.8%', trend: 'down' }
    ],
    metrics: {
      throughput: '385 tons/year',
      efficiency: '96%',
      quality: '93%',
      cost: '€12.50/kg retail'
    }
  },
  { 
    id: 'consumers1', 
    icon: Users, 
    label: 'Consumers', 
    color: 'bg-slate-600', 
    gradient: 'from-slate-500 to-slate-700', 
    description: 'End consumers', 
    position: { x: 790, y: 180 },
    kpis: [
      { name: 'Consumption', value: '380 tons', trend: 'stable' },
      { name: 'Satisfaction', value: '88%', trend: 'up' },
      { name: 'Repeat Purchase', value: '72%', trend: 'up' }
    ],
    metrics: {
      throughput: '380 tons/year',
      efficiency: '99%',
      quality: '91%',
      cost: '€12.50/kg avg'
    }
  },
  { 
    id: 'secondary-processing', 
    icon: Factory, 
    label: 'Secondary Processing', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    description: 'Smoked fillets production', 
    position: { x: 400, y: 60 },
    kpis: [
      { name: 'Processing Rate', value: '85 kg/hr', trend: 'stable' },
      { name: 'Quality Score', value: '97%', trend: 'up' },
      { name: 'Smoke Time', value: '6 hours', trend: 'stable' }
    ],
    metrics: {
      throughput: '178 tons/year',
      efficiency: '88%',
      quality: '97%',
      cost: '€3.20/kg'
    }
  },
  { 
    id: 'bigh', 
    icon: Building2, 
    label: 'BIGH', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-teal-700', 
    description: 'BIGH distribution hub', 
    position: { x: 530, y: 60 },
    kpis: [
      { name: 'Distribution Vol', value: '172 tons', trend: 'stable' },
      { name: 'Hub Efficiency', value: '97%', trend: 'up' },
      { name: 'Delivery Speed', value: '2 hours', trend: 'up' }
    ],
    metrics: {
      throughput: '172 tons/year',
      efficiency: '97%',
      quality: '96%',
      cost: '€0.65/kg'
    }
  },
  { 
    id: 'restaurant', 
    icon: Store, 
    label: 'Restaurant', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    description: 'Food service establishments', 
    position: { x: 660, y: 60 },
    kpis: [
      { name: 'Orders Volume', value: '168 tons', trend: 'up' },
      { name: 'Quality Rating', value: '4.6/5', trend: 'up' },
      { name: 'Menu Presence', value: '145 items', trend: 'stable' }
    ],
    metrics: {
      throughput: '168 tons/year',
      efficiency: '98%',
      quality: '95%',
      cost: '€18.50/kg'
    }
  },
  { 
    id: 'consumers2', 
    icon: Users, 
    label: 'Consumers', 
    color: 'bg-slate-600', 
    gradient: 'from-slate-500 to-slate-700', 
    description: 'Restaurant diners', 
    position: { x: 790, y: 60 },
    kpis: [
      { name: 'Diners Served', value: '165 tons', trend: 'up' },
      { name: 'Satisfaction', value: '92%', trend: 'up' },
      { name: 'Return Rate', value: '68%', trend: 'stable' }
    ],
    metrics: {
      throughput: '165 tons/year',
      efficiency: '98%',
      quality: '93%',
      cost: '€25/portion avg'
    }
  },
];

const connections = [
  { from: 'fingerlings', to: 'transport1', color: 'stroke-teal-500' },
  { from: 'transport1', to: 'aquaculture', color: 'stroke-slate-500' },
  { from: 'aquaculture', to: 'primary-processing', color: 'stroke-teal-500' },
  { from: 'primary-processing', to: 'transport2', color: 'stroke-teal-500' },
  { from: 'transport2', to: 'retail', color: 'stroke-slate-500' },
  { from: 'retail', to: 'consumers1', color: 'stroke-teal-500' },
  { from: 'aquaculture', to: 'secondary-processing', color: 'stroke-teal-500' },
  { from: 'secondary-processing', to: 'bigh', color: 'stroke-teal-500' },
  { from: 'bigh', to: 'restaurant', color: 'stroke-teal-500' },
  { from: 'restaurant', to: 'consumers2', color: 'stroke-teal-500' },
];

const paths = {
  retail: ['fingerlings', 'transport1', 'aquaculture', 'primary-processing', 'transport2', 'retail', 'consumers1'],
  restaurant: ['fingerlings', 'transport1', 'aquaculture', 'secondary-processing', 'bigh', 'restaurant', 'consumers2'],
};

// Mock data for trend charts
const oxygenTrendData = Array.from({ length: 20 }, (_, i) => ({ value: 7.5 + Math.sin(i * 0.4) * 0.8 + Math.random() * 0.3 }));
const waterTempTrendData = Array.from({ length: 20 }, (_, i) => ({ value: 15 + Math.sin(i * 0.3) * 2 + Math.random() * 0.5 }));
const harvestTrendData = Array.from({ length: 20 }, (_, i) => ({ value: 120 + i * 3 + Math.random() * 10 }));

export default function FishCaseStudy({ onBack }: { onBack?: () => void }) {
  const [hoveredNode, setHoveredNode] = useState<NodeType | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [selectedPath, setSelectedPath] = useState<'retail' | 'restaurant' | null>(null);
  const [showStudyAreas, setShowStudyAreas] = useState(false);

  const getNodeById = (id: NodeType) => nodes.find(n => n.id === id);

  const isNodeHighlighted = (nodeId: NodeType) => {
    if (!selectedPath) return false;
    return paths[selectedPath].includes(nodeId);
  };

  const isConnectionHighlighted = (from: NodeType, to: NodeType) => {
    if (!selectedPath) return false;
    const path = paths[selectedPath];
    const fromIndex = path.indexOf(from);
    const toIndex = path.indexOf(to);
    return fromIndex !== -1 && toIndex !== -1 && Math.abs(fromIndex - toIndex) === 1;
  };

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
            <Fish className="w-4 h-4 text-teal-600" />
            <span className="text-sm text-teal-700">Case Study 3</span>
          </div>
          <h1 className="text-4xl mb-2">
            Fish and <span className="text-teal-600">Aquaculture Products</span>
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Interactive visualization of the aquaculture supply chain - hover over nodes for details, click path buttons to highlight routes
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6 flex-wrap items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border-2 border-teal-100">
          <span className="text-sm mr-2">Highlight Path:</span>
          <Button
            variant={selectedPath === 'retail' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPath(selectedPath === 'retail' ? null : 'retail')}
            className={`h-10 text-sm transition-all duration-300 ${
              selectedPath === 'retail' 
                ? 'bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 shadow-md scale-105' 
                : 'hover:bg-teal-50 hover:border-teal-300'
            }`}
          >
            <Store className="w-4 h-4 mr-2" />
            Retail Route
          </Button>
          <Button
            variant={selectedPath === 'restaurant' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPath(selectedPath === 'restaurant' ? null : 'restaurant')}
            className={`h-10 text-sm transition-all duration-300 ${
              selectedPath === 'restaurant' 
                ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-md scale-105' 
                : 'hover:bg-teal-50 hover:border-teal-300'
            }`}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Restaurant Route (via BIGH)
          </Button>
          <div className="h-8 w-px bg-gray-300 mx-2"></div>
          <Button
            variant={showStudyAreas ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowStudyAreas(!showStudyAreas)}
            className={`h-10 text-sm transition-all duration-300 ${
              showStudyAreas 
                ? 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 shadow-md scale-105' 
                : 'hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {showStudyAreas ? 'Hide' : 'Show'} Study Areas
          </Button>
        </div>

        {/* Main Flow Diagram */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-teal-100">
          <div className="relative" style={{ height: '340px' }}>
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#2d6b6a" />
                </marker>
                <marker id="arrowhead-active" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#2d6b6a" />
                </marker>
              </defs>
              {connections.map((conn, idx) => {
                const fromNode = getNodeById(conn.from as NodeType);
                const toNode = getNodeById(conn.to as NodeType);
                if (!fromNode || !toNode) return null;

                const highlighted = isConnectionHighlighted(conn.from as NodeType, conn.to as NodeType);
                const x1 = fromNode.position.x + 65;
                const y1 = fromNode.position.y + 30;
                const x2 = toNode.position.x + 5;
                const y2 = toNode.position.y + 30;

                return (
                  <motion.line
                    key={idx}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className={highlighted ? 'stroke-teal-600' : conn.color}
                    strokeWidth={highlighted ? '4' : '2'}
                    markerEnd={highlighted ? 'url(#arrowhead-active)' : 'url(#arrowhead-blue)'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: highlighted ? 1 : 0.4 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              const highlighted = isNodeHighlighted(node.id);
              const hovered = hoveredNode === node.id;

              return (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{ left: node.position.x, top: node.position.y, zIndex: hovered ? 20 : 10 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${node.gradient} rounded-2xl flex items-center justify-center shadow-xl cursor-pointer relative group`}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                      animate={{
                        scale: highlighted || selectedNode === node.id ? 1.1 : 1,
                        boxShadow: highlighted || selectedNode === node.id
                          ? '0 20px 25px -5px rgba(45, 107, 106, 0.3), 0 10px 10px -5px rgba(45, 107, 106, 0.2)'
                          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                      {(highlighted || selectedNode === node.id) && (
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-2xl opacity-30 blur-sm"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1.3 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                    <p className={`text-xs mt-2 text-center max-w-[100px] transition-all ${
                      highlighted || selectedNode === node.id ? 'text-teal-700' : 'text-gray-700'
                    }`}>
                      {node.label}
                    </p>

                    {/* Hover tooltip with KPIs */}
                    {hovered && !selectedNode && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onClick={() => setSelectedNode(node.id)}
                        className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-xs p-4 rounded-xl shadow-2xl z-30 w-64 border-2 border-teal-500/30 cursor-pointer hover:border-teal-400/50 transition-colors"
                      >
                        <div className="mb-3 pb-2 border-b border-gray-700">
                          <p className="text-teal-300 mb-1">{node.label}</p>
                          <p className="text-[10px] text-gray-400 leading-relaxed">{node.description}</p>
                        </div>
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
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                      </motion.div>
                    )}

                    {/* Expanded detailed metrics view when clicked */}
                    {selectedNode === node.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl z-40 w-[420px] border-2 border-teal-400/40"
                      >
                        {/* Header */}
                        <div className="p-5 pb-4 border-b border-gray-700">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-br ${node.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-base text-white mb-0.5">{node.label}</p>
                                <p className="text-[10px] text-gray-400 leading-relaxed">{node.description}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedNode(null);
                              }}
                              className="h-6 w-6 p-0 hover:bg-gray-700 text-gray-400 hover:text-white -mr-2 -mt-1"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* KPIs Section */}
                        <div className="p-5">
                          <h4 className="text-[10px] text-teal-400 mb-3 uppercase tracking-wider">Key Performance Indicators</h4>
                          <div className="space-y-2.5 mb-5">
                            {node.kpis.map((kpi, i) => (
                              <div key={i} className="flex items-center justify-between py-2 px-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-teal-500/30 transition-colors">
                                <span className="text-xs text-gray-300">{kpi.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-white">{kpi.value}</span>
                                  {kpi.trend === 'up' && <TrendingUp className="w-4 h-4 text-orange-400" />}
                                  {kpi.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                                  {kpi.trend === 'stable' && <span className="w-4 h-0.5 bg-gray-500 rounded"></span>}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Performance Metrics Grid */}
                          {node.metrics && (
                            <>
                              <h4 className="text-[10px] text-teal-400 mb-3 uppercase tracking-wider">Performance Metrics</h4>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-lg bg-teal-900/30 border border-teal-700/40">
                                  <p className="text-[10px] text-teal-300 mb-1">Throughput</p>
                                  <p className="text-sm text-white">{node.metrics.throughput}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                  <p className="text-[10px] text-gray-400 mb-1">Efficiency</p>
                                  <p className="text-sm text-white">{node.metrics.efficiency}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-teal-900/30 border border-teal-700/40">
                                  <p className="text-[10px] text-teal-300 mb-1">Quality</p>
                                  <p className="text-sm text-white">{node.metrics.quality}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                  <p className="text-[10px] text-gray-400 mb-1">Cost</p>
                                  <p className="text-sm text-white">{node.metrics.cost}</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

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
          {/* Water Temperature */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-blue-700 mb-1">Water Temp</p>
                <p className="text-2xl text-blue-900">15.8°C</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700">
              <TrendingUp className="w-3 h-3" />
              <span>Optimal range</span>
            </div>
          </Card>

          {/* Oxygen Level */}
          <Card className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-teal-700 mb-1">Dissolved Oxygen</p>
                <p className="text-2xl text-teal-900">7.8mg/L</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700">
              <TrendingUp className="w-3 h-3" />
              <span>Above target</span>
            </div>
          </Card>

          {/* Harvest Rate */}
          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-emerald-700 mb-1">Harvest Volume</p>
                <p className="text-2xl text-emerald-900">185t</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                <Fish className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700">
              <TrendingUp className="w-3 h-3" />
              <span>+18% this month</span>
            </div>
          </Card>

          {/* Processing Efficiency */}
          <Card className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-slate-700 mb-1">Processing Yield</p>
                <p className="text-2xl text-slate-900">92%</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-500 flex items-center justify-center">
                <Factory className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700">
              <TrendingUp className="w-3 h-3" />
              <span>+3% vs target</span>
            </div>
          </Card>
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-100">
            <h3 className="text-sm mb-4 text-blue-900">Water Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={waterTempTrendData}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-100">
            <h3 className="text-sm mb-4 text-teal-900">Dissolved Oxygen Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={oxygenTrendData}>
                <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-50/50 to-white border-2 border-emerald-100">
            <h3 className="text-sm mb-4 text-emerald-900">Harvest Volume Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={harvestTrendData}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Supply Chain Routes Info */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-teal-900">Retail Route</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Traditional supply chain: Aquaculture → Primary Processing (on-site) → Retail → Consumers. Products are whole gutted and filleted fish.
                </p>
                <div className="inline-flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-full text-teal-700">
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                  Direct to Market
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-slate-900">Restaurant Route (via BIGH)</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Specialized supply chain: Aquaculture → Secondary Processing (Vendsyssel) → BIGH → Restaurant → Consumers. Products are smoked fillets.
                </p>
                <div className="inline-flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-full text-slate-700">
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></span>
                  Premium Channel
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Supply Chain Insights */}
        {showStudyAreas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="p-6 bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border-2 border-teal-200 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-3 text-teal-900">Study Focus Areas</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-teal-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Waves className="w-4 h-4 text-teal-600" />
                        <h4 className="text-sm text-gray-800">Red Tide Events</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Monitoring harmful algal blooms that impact fish health and production disruptions in Greece.
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-teal-100">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-slate-600" />
                        <h4 className="text-sm text-gray-800">Production Risk</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Analyzing environmental factors affecting fish farming yield and quality control.
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-teal-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="w-4 h-4 text-slate-600" />
                        <h4 className="text-sm text-gray-800">Supply Chain</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Tracking cold chain logistics and distribution efficiency across multiple channels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}