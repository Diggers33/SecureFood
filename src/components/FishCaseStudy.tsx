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
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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
    position: { x: 50, y: 200 },
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
    position: { x: 220, y: 200 },
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
    position: { x: 390, y: 200 },
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
    position: { x: 580, y: 200 },
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
    position: { x: 770, y: 200 },
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
    position: { x: 960, y: 200 },
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
    position: { x: 1150, y: 200 },
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
    position: { x: 580, y: 60 },
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
    position: { x: 770, y: 60 },
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
    position: { x: 960, y: 60 },
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
    position: { x: 1150, y: 60 },
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
  export: ['fingerlings', 'transport1', 'aquaculture', 'secondary-processing', 'bigh', 'restaurant', 'consumers2'],
  domestic: ['fingerlings', 'transport1', 'aquaculture', 'primary-processing', 'transport2', 'retail', 'consumers1'],
  feed: [], // Not applicable for fish case study
};

// Mock data for trend charts
const oxygenTrendData = [
  { name: 'Jan', value: 7.2 },
  { name: 'Feb', value: 7.4 },
  { name: 'Mar', value: 7.6 },
  { name: 'Apr', value: 7.8 },
  { name: 'May', value: 8.1 },
  { name: 'Jun', value: 7.9 },
  { name: 'Jul', value: 7.7 },
  { name: 'Aug', value: 7.5 },
  { name: 'Sep', value: 7.8 },
  { name: 'Oct', value: 8.0 },
  { name: 'Nov', value: 8.2 },
  { name: 'Dec', value: 8.3 },
];

const waterTempTrendData = [
  { name: 'Jan', value: 14.2 },
  { name: 'Feb', value: 14.8 },
  { name: 'Mar', value: 15.5 },
  { name: 'Apr', value: 16.2 },
  { name: 'May', value: 17.0 },
  { name: 'Jun', value: 17.8 },
  { name: 'Jul', value: 18.2 },
  { name: 'Aug', value: 18.0 },
  { name: 'Sep', value: 17.2 },
  { name: 'Oct', value: 16.5 },
  { name: 'Nov', value: 15.8 },
  { name: 'Dec', value: 14.5 },
];

const harvestTrendData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 125 },
  { name: 'Mar', value: 135 },
  { name: 'Apr', value: 145 },
  { name: 'May', value: 155 },
  { name: 'Jun', value: 165 },
  { name: 'Jul', value: 175 },
  { name: 'Aug', value: 180 },
  { name: 'Sep', value: 185 },
  { name: 'Oct', value: 182 },
  { name: 'Nov', value: 178 },
  { name: 'Dec', value: 170 },
];

export default function FishCaseStudy({ onBack }: { onBack?: () => void }) {
  const [hoveredNode, setHoveredNode] = useState<NodeType | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [selectedPath, setSelectedPath] = useState<'export' | 'domestic' | 'feed' | null>(null);
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
          {/* Sector Indicator */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600">
              <Fish className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl mb-1">
                Fish <span className="text-teal-600">Dashboard</span>
              </h1>
              <p className="text-sm text-gray-600">Fish - Greece</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Interactive visualization of the aquaculture supply chain - hover over nodes for details, click path buttons to highlight routes
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6 flex-wrap items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border-2 border-teal-100">
          <span className="text-sm text-gray-600 mr-2">Highlight Path:</span>
          <Button
            variant={selectedPath === 'export' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPath(selectedPath === 'export' ? null : 'export')}
            className={`h-10 text-sm transition-all duration-300 ${
              selectedPath === 'export' 
                ? 'bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 shadow-md scale-105 text-white' 
                : 'hover:bg-teal-50 hover:border-teal-300'
            }`}
          >
            <Truck className="w-4 h-4 mr-2" />
            Export Route
          </Button>
          <Button
            variant={selectedPath === 'domestic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPath(selectedPath === 'domestic' ? null : 'domestic')}
            className={`h-10 text-sm transition-all duration-300 ${
              selectedPath === 'domestic' 
                ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-md scale-105 text-white' 
                : 'hover:bg-teal-50 hover:border-teal-300'
            }`}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Domestic Route
          </Button>
          <Button
            variant={selectedPath === 'feed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPath(selectedPath === 'feed' ? null : 'feed')}
            className={`h-10 text-sm transition-all duration-300 ${
              selectedPath === 'feed' 
                ? 'bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 shadow-md scale-105 text-white' 
                : 'hover:bg-teal-50 hover:border-teal-300'
            }`}
            disabled
          >
            <Factory className="w-4 h-4 mr-2" />
            Feed Production
          </Button>
        </div>

        {/* Main Flow Diagram */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-teal-100 overflow-visible relative z-50">
          <div className="relative overflow-visible pb-64" style={{ height: '400px' }}>
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                {/* Arrowhead markers */}
                <marker id="arrowhead-fish" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L0,10 L10,5 z" fill="#14b8a6" />
                </marker>
                <marker id="arrowhead-fish-active" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M0,0 L0,12 L12,6 z" fill="#0d9488" />
                </marker>
              </defs>
              {connections.map((conn, idx) => {
                const fromNode = getNodeById(conn.from as NodeType);
                const toNode = getNodeById(conn.to as NodeType);
                if (!fromNode || !toNode) return null;

                const highlighted = isConnectionHighlighted(conn.from as NodeType, conn.to as NodeType);
                
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
                
                const dx = x2 - x1;
                const dy = y2 - y1;
                
                let pathData: string;
                
                // Special handling for vertical branching from aquaculture
                if (conn.from === 'aquaculture' && conn.to === 'secondary-processing') {
                  // Upward diagonal curve
                  const startX = fromNode.position.x + nodeWidth; // right edge
                  const startY = fromCenterY; // center
                  const endX = toNode.position.x;     // left edge
                  const endY = toCenterY;     // center
                  const cx1 = startX + (endX - startX) * 0.5;
                  const cy1 = startY;
                  const cx2 = startX + (endX - startX) * 0.5;
                  const cy2 = endY;
                  pathData = `M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`;
                }
                // Default smooth curve for other connections
                else {
                  const cx1 = x1 + dx * 0.5;
                  const cy1 = y1;
                  const cx2 = x1 + dx * 0.5;
                  const cy2 = y2;
                  pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
                }

                return (
                  <motion.path
                    key={idx}
                    d={pathData}
                    stroke={highlighted ? '#0d9488' : '#14b8a6'}
                    strokeWidth={highlighted ? 3 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    markerEnd={highlighted ? 'url(#arrowhead-fish-active)' : 'url(#arrowhead-fish)'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: highlighted ? 0.9 : (selectedPath ? 0.2 : 0.5)
                    }}
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
                      className={`w-12 h-12 bg-gradient-to-br ${node.gradient} rounded-xl flex items-center justify-center shadow-xl cursor-pointer relative group`}
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
                      <Icon className="w-6 h-6 text-white drop-shadow-lg" />
                      {(highlighted || selectedNode === node.id) && (
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl opacity-30 blur-sm"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1.3 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                    <p className={`text-xs mt-3 text-center max-w-[120px] transition-all ${
                      highlighted || selectedNode === node.id ? 'text-teal-700' : 'text-gray-700'
                    }`}>
                      {node.label}
                    </p>

                    {/* Hover tooltip with KPIs */}
                    {(hovered || selectedNode === node.id) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          height: selectedNode === node.id ? 'auto' : 'auto'
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => {
                          if (selectedNode !== node.id) {
                            setHoveredNode(null);
                          }
                        }}
                        onClick={() => {
                          if (selectedNode !== node.id) {
                            setSelectedNode(node.id);
                          }
                        }}
                        className={`absolute top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-xs rounded-xl shadow-2xl border-2 transition-all ${
                          selectedNode === node.id 
                            ? 'w-96 p-6 border-orange-400/50 z-[9999]' 
                            : 'w-64 p-4 border-teal-500/30 cursor-pointer hover:border-teal-400/50 z-[9999]'
                        }`}
                      >
                        {/* Header */}
                        <div className={`flex items-start justify-between ${selectedNode === node.id ? 'mb-4 pb-3' : 'mb-3 pb-2'} border-b border-gray-700`}>
                          <div className="flex-1">
                            <p className={`text-teal-300 ${selectedNode === node.id ? 'text-base mb-1.5' : 'mb-1'}`}>{node.label}</p>
                            <p className={`text-gray-400 leading-relaxed ${selectedNode === node.id ? 'text-xs' : 'text-[10px]'}`}>{node.description}</p>
                          </div>
                          {selectedNode === node.id && (
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
                        {selectedNode !== node.id && (
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
                        {selectedNode === node.id && (
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
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={waterTempTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[10, 20]} 
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

          <Card className="p-6 bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-100">
            <h3 className="text-sm mb-4 text-teal-900">Dissolved Oxygen Trend</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={oxygenTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[6, 9]} 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'mg/L', position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value.toFixed(1)} mg/L`, 'Oxygen']}
                />
                <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-50/50 to-white border-2 border-emerald-100">
            <h3 className="text-sm mb-4 text-emerald-900">Harvest Volume Trend</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={harvestTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[100, 200]} 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'tons', position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value.toFixed(0)} tons`, 'Volume']}
                />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
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