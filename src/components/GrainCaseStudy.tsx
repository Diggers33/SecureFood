import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Factory, 
  Truck, 
  Users, 
  Ship, 
  Wheat, 
  Package, 
  Building2,
  ArrowRight,
  Info,
  AlertTriangle,
  ArrowLeft,
  Home,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Thermometer,
  Droplets
} from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

type NodeType = 'farm' | 'logistics' | 'elevator-sea' | 'elevator-field' | 'ship' | 
  'foreign' | 'mills' | 'packaging' | 'distribution' | 'retailer' | 'consumer' | 
  'feed-mills' | 'livestock';

interface NodeData {
  id: NodeType;
  icon: any;
  label: string;
  color: string;
  gradient: string;
  hoverColor: string;
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
    icon: Wheat, 
    label: 'Farm', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-teal-700', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Grain production from Ukrainian farms', 
    position: { x: 50, y: 200 },
    kpis: [
      { name: 'Production Volume', value: '450k tons', trend: 'down' },
      { name: 'Yield Rate', value: '4.2 t/ha', trend: 'stable' },
      { name: 'Quality Score', value: '92%', trend: 'up' }
    ],
    metrics: {
      throughput: '450,000 tons/year',
      efficiency: '87%',
      quality: '92%',
      cost: '€185/ton'
    }
  },
  { 
    id: 'logistics', 
    icon: Truck, 
    label: 'Logistics', 
    color: 'bg-slate-500', 
    gradient: 'from-slate-400 to-slate-600', 
    hoverColor: 'hover:bg-slate-600', 
    description: 'Transportation from farm to elevators', 
    position: { x: 200, y: 200 },
    kpis: [
      { name: 'Transport Capacity', value: '425k tons', trend: 'down' },
      { name: 'Delivery Time', value: '2.3 days', trend: 'up' },
      { name: 'Fleet Utilization', value: '78%', trend: 'stable' }
    ],
    metrics: {
      throughput: '425,000 tons/year',
      efficiency: '78%',
      quality: '95%',
      cost: '€22/ton'
    }
  },
  { 
    id: 'elevator-sea', 
    icon: Building2, 
    label: 'Grain Elevator (Sea)', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Storage and processing near seaports', 
    position: { x: 350, y: 100 },
    kpis: [
      { name: 'Storage Capacity', value: '125k tons', trend: 'stable' },
      { name: 'Turnover Rate', value: '3.2x/year', trend: 'down' },
      { name: 'Moisture Control', value: '12.1%', trend: 'stable' }
    ],
    metrics: {
      throughput: '125,000 tons capacity',
      efficiency: '82%',
      quality: '94%',
      cost: '€15/ton storage'
    }
  },
  { 
    id: 'elevator-field', 
    icon: Building2, 
    label: 'Grain Elevator (Field)', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Storage near production area', 
    position: { x: 350, y: 300 },
    kpis: [
      { name: 'Storage Capacity', value: '200k tons', trend: 'stable' },
      { name: 'Utilization', value: '88%', trend: 'up' },
      { name: 'Processing Speed', value: '150 t/hr', trend: 'stable' }
    ],
    metrics: {
      throughput: '200,000 tons capacity',
      efficiency: '88%',
      quality: '93%',
      cost: '€12/ton storage'
    }
  },
  { 
    id: 'ship', 
    icon: Ship, 
    label: 'Loading on Ship', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-teal-700', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Bulk loading for export', 
    position: { x: 500, y: 100 },
    kpis: [
      { name: 'Export Volume', value: '2.4M tons', trend: 'down' },
      { name: 'Loading Rate', value: '1,200 t/hr', trend: 'down' },
      { name: 'Ship Delays', value: '18 days avg', trend: 'up' }
    ],
    metrics: {
      throughput: '2.4M tons/year',
      efficiency: '62%',
      quality: '96%',
      cost: '€28/ton'
    }
  },
  { 
    id: 'foreign', 
    icon: Users, 
    label: 'Foreign Partners', 
    color: 'bg-slate-600', 
    gradient: 'from-slate-500 to-slate-700', 
    hoverColor: 'hover:bg-slate-700', 
    description: 'International grain buyers', 
    position: { x: 650, y: 100 },
    kpis: [
      { name: 'Contract Volume', value: '2.2M tons', trend: 'down' },
      { name: 'Price Premium', value: '€285/ton', trend: 'up' },
      { name: 'Market Share', value: '15%', trend: 'stable' }
    ],
    metrics: {
      throughput: '2.2M tons/year',
      efficiency: '91%',
      quality: '97%',
      cost: '€285/ton avg'
    }
  },
  { 
    id: 'mills', 
    icon: Factory, 
    label: 'Mills (Flour)', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Flour production facilities', 
    position: { x: 650, y: 300 },
    kpis: [
      { name: 'Milling Capacity', value: '180k tons', trend: 'stable' },
      { name: 'Extraction Rate', value: '76%', trend: 'up' },
      { name: 'Product Quality', value: '94%', trend: 'stable' }
    ],
    metrics: {
      throughput: '180,000 tons/year',
      efficiency: '85%',
      quality: '94%',
      cost: '€45/ton processing'
    }
  },
  { 
    id: 'packaging', 
    icon: Package, 
    label: 'Packaging', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-teal-700', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Consumer packaging', 
    position: { x: 800, y: 300 },
    kpis: [
      { name: 'Packaging Speed', value: '850 units/hr', trend: 'stable' },
      { name: 'Material Cost', value: '€0.18/unit', trend: 'up' },
      { name: 'Line Efficiency', value: '89%', trend: 'stable' }
    ],
    metrics: {
      throughput: '165,000 tons/year',
      efficiency: '89%',
      quality: '96%',
      cost: '€8/ton packaging'
    }
  },
  { 
    id: 'distribution', 
    icon: Truck, 
    label: 'Distribution', 
    color: 'bg-slate-500', 
    gradient: 'from-slate-400 to-slate-600', 
    hoverColor: 'hover:bg-slate-600', 
    description: 'Distribution logistics', 
    position: { x: 950, y: 300 },
    kpis: [
      { name: 'Delivery Coverage', value: '450 outlets', trend: 'up' },
      { name: 'On-Time Rate', value: '92%', trend: 'stable' },
      { name: 'Fuel Efficiency', value: '8.2 L/100km', trend: 'down' }
    ],
    metrics: {
      throughput: '160,000 tons/year',
      efficiency: '92%',
      quality: '97%',
      cost: '€15/ton distribution'
    }
  },
  { 
    id: 'retailer', 
    icon: Building2, 
    label: 'Retailer/Wholesaler', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Retail and wholesale outlets', 
    position: { x: 1100, y: 300 },
    kpis: [
      { name: 'Sales Volume', value: '155k tons', trend: 'stable' },
      { name: 'Inventory Turn', value: '12x/year', trend: 'up' },
      { name: 'Waste Rate', value: '2.1%', trend: 'down' }
    ],
    metrics: {
      throughput: '155,000 tons/year',
      efficiency: '94%',
      quality: '96%',
      cost: '€420/ton retail'
    }
  },
  { 
    id: 'consumer', 
    icon: Users, 
    label: 'Ukrainian Consumers', 
    color: 'bg-slate-600', 
    gradient: 'from-slate-500 to-slate-700', 
    hoverColor: 'hover:bg-slate-700', 
    description: 'Domestic market', 
    position: { x: 1250, y: 300 },
    kpis: [
      { name: 'Consumption', value: '152k tons', trend: 'stable' },
      { name: 'Price Index', value: '€1.85/kg', trend: 'up' },
      { name: 'Satisfaction', value: '87%', trend: 'stable' }
    ],
    metrics: {
      throughput: '152,000 tons/year',
      efficiency: '98%',
      quality: '95%',
      cost: '€1.85/kg avg'
    }
  },
  { 
    id: 'feed-mills', 
    icon: Factory, 
    label: 'Feed Mills', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Animal feed production', 
    position: { x: 650, y: 450 },
    kpis: [
      { name: 'Feed Production', value: '95k tons', trend: 'stable' },
      { name: 'Protein Content', value: '18.5%', trend: 'stable' },
      { name: 'Batch Quality', value: '96%', trend: 'up' }
    ],
    metrics: {
      throughput: '95,000 tons/year',
      efficiency: '91%',
      quality: '96%',
      cost: '€38/ton processing'
    }
  },
  { 
    id: 'livestock', 
    icon: Users, 
    label: 'Livestock Farms', 
    color: 'bg-slate-600', 
    gradient: 'from-slate-500 to-slate-700', 
    hoverColor: 'hover:bg-slate-700', 
    description: 'Animal agriculture', 
    position: { x: 800, y: 450 },
    kpis: [
      { name: 'Feed Consumption', value: '92k tons', trend: 'stable' },
      { name: 'Animal Growth', value: '+12% avg', trend: 'up' },
      { name: 'Feed Efficiency', value: '2.8:1', trend: 'stable' }
    ],
    metrics: {
      throughput: '92,000 tons/year',
      efficiency: '88%',
      quality: '94%',
      cost: '€240/ton livestock'
    }
  },
];

const connections = [
  { from: 'farm', to: 'logistics', color: 'stroke-teal-500' },
  { from: 'logistics', to: 'elevator-sea', color: 'stroke-slate-500' },
  { from: 'logistics', to: 'elevator-field', color: 'stroke-slate-500' },
  { from: 'elevator-sea', to: 'ship', color: 'stroke-teal-500' },
  { from: 'ship', to: 'foreign', color: 'stroke-teal-500' },
  { from: 'ship', to: 'mills', color: 'stroke-teal-500', label: 'supplies to export' },
  { from: 'elevator-field', to: 'mills', color: 'stroke-teal-500' },
  { from: 'foreign', to: 'mills', color: 'stroke-slate-500', label: 'noodles across borders' },
  { from: 'mills', to: 'packaging', color: 'stroke-teal-500' },
  { from: 'packaging', to: 'distribution', color: 'stroke-teal-500' },
  { from: 'distribution', to: 'retailer', color: 'stroke-slate-500' },
  { from: 'retailer', to: 'consumer', color: 'stroke-teal-500' },
  { from: 'mills', to: 'feed-mills', color: 'stroke-teal-500' },
  { from: 'feed-mills', to: 'livestock', color: 'stroke-teal-500' },
];

const paths = {
  export: ['farm', 'logistics', 'elevator-sea', 'ship', 'foreign'],
  domestic: ['farm', 'logistics', 'elevator-field', 'mills', 'packaging', 'distribution', 'retailer', 'consumer'],
  feed: ['farm', 'logistics', 'elevator-field', 'mills', 'feed-mills', 'livestock'],
};

export default function GrainCaseStudy({ onBack }: { onBack?: () => void }) {
  const [hoveredNode, setHoveredNode] = useState<NodeType | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [selectedPath, setSelectedPath] = useState<'export' | 'domestic' | 'feed' | null>(null);
  const [showRisks, setShowRisks] = useState(false);

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

  // Mock data for trend charts
  const moistureTrendData = Array.from({ length: 20 }, (_, i) => ({ value: 12 + Math.sin(i * 0.4) * 1.5 + Math.random() * 0.5 }));
  const storageTempTrendData = Array.from({ length: 20 }, (_, i) => ({ value: 18 + Math.sin(i * 0.5) * 3 + Math.random() * 0.8 }));
  const disruptionTrendData = Array.from({ length: 20 }, (_, i) => ({ value: 85 - i * 1.5 + Math.random() * 5 }));

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
            <Wheat className="w-4 h-4 text-teal-600" />
            <span className="text-sm text-teal-700">Case Study 1</span>
          </div>
          <h1 className="text-4xl mb-2">
            Grain Supply Chain{' '}
            <span className="text-teal-600">- Ukraine</span>
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Interactive visualization of the grain supply chain - hover over nodes for details, click path buttons to highlight routes
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6 flex-wrap items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border-2 border-teal-100">
          <span className="text-sm mr-2">Highlight Path:</span>
          <Button
            variant={selectedPath === 'export' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPath(selectedPath === 'export' ? null : 'export')}
            className={`h-10 text-sm transition-all duration-300 ${
              selectedPath === 'export' 
                ? 'bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 shadow-md scale-105' 
                : 'hover:bg-teal-50 hover:border-teal-300'
            }`}
          >
            <Ship className="w-4 h-4 mr-2" />
            Export Route
          </Button>
          <Button
            variant={selectedPath === 'domestic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPath(selectedPath === 'domestic' ? null : 'domestic')}
            className={`h-10 text-sm transition-all duration-300 ${
              selectedPath === 'domestic' 
                ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-md scale-105' 
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
                ? 'bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 shadow-md scale-105' 
                : 'hover:bg-teal-50 hover:border-teal-300'
            }`}
          >
            <Factory className="w-4 h-4 mr-2" />
            Feed Production
          </Button>
          <div className="h-8 w-px bg-gray-300 mx-2"></div>
          <Button
            variant={showRisks ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowRisks(!showRisks)}
            className={`h-10 text-sm transition-all duration-300 ${
              showRisks 
                ? 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 shadow-md scale-105' 
                : 'hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            {showRisks ? 'Hide' : 'Show'} Risk Analysis
          </Button>
        </div>

        {/* Supply Chain Diagram */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-teal-100 overflow-visible relative z-50">
          <div className="relative overflow-visible pb-64" style={{ height: '520px' }}>
            {/* Study Area Box */}
            {showRisks && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute left-8 top-12 w-[640px] h-[280px] border-4 border-dashed border-slate-400 rounded-xl bg-slate-50/30 pointer-events-none"
              >
                <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-100 rounded-full border-2 border-slate-300">
                  <span className="text-xs text-slate-700">⚠️ Study Focus: War Impact Zone</span>
                </div>
              </motion.div>
            )}

            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <marker id="arrowhead-grain" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#2d6b6a" />
                </marker>
                <marker id="arrowhead-grain-active" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#2d6b6a" />
                </marker>
              </defs>
              {connections.map((conn, idx) => {
                const fromNode = getNodeById(conn.from as NodeType);
                const toNode = getNodeById(conn.to as NodeType);
                if (!fromNode || !toNode) return null;

                const highlighted = isConnectionHighlighted(conn.from as NodeType, conn.to as NodeType);
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
                    className={highlighted ? 'stroke-teal-600' : conn.color}
                    strokeWidth={highlighted ? '4' : '2'}
                    markerEnd={highlighted ? 'url(#arrowhead-grain-active)' : 'url(#arrowhead-grain)'}
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
                        opacity: selectedPath ? (highlighted ? 1 : 0.4) : 1,
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
        <div className="grid grid-cols-4 gap-4 mt-6 relative z-0">
          {/* Moisture Level */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-blue-700 mb-1">Moisture Level</p>
                <p className="text-2xl text-blue-900">12.3%</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-700">
              <TrendingDown className="w-3 h-3" />
              <span>Within safe range</span>
            </div>
          </Card>

          {/* Storage Temperature */}
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-orange-700 mb-1">Storage Temp</p>
                <p className="text-2xl text-orange-900">18.5°C</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-orange-700">
              <TrendingUp className="w-3 h-3" />
              <span>Slightly elevated</span>
            </div>
          </Card>

          {/* Export Volume */}
          <Card className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-teal-700 mb-1">Export Volume</p>
                <p className="text-2xl text-teal-900">2.4M</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                <Ship className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-red-700">
              <TrendingDown className="w-3 h-3" />
              <span>-38% vs 2021</span>
            </div>
          </Card>

          {/* Supply Chain Risk */}
          <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-red-700 mb-1">Disruption Index</p>
                <p className="text-2xl text-red-900">68</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-red-700">
              <TrendingDown className="w-3 h-3" />
              <span>War impact zone</span>
            </div>
          </Card>
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-3 gap-6 mt-6 relative z-0">
          <Card className="p-6 bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-100 relative z-10">
            <h3 className="text-sm mb-4 text-blue-900">Moisture Level Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={moistureTrendData}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-100 relative z-10">
            <h3 className="text-sm mb-4 text-orange-900">Storage Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={storageTempTrendData}>
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50/50 to-white border-2 border-red-100 relative z-10">
            <h3 className="text-sm mb-4 text-red-900">Disruption Impact Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={disruptionTrendData}>
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Supply Chain Routes Info */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-teal-900">Export Route</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Farm → Logistics → Sea Elevator → Ship → Foreign Markets. Primary export channel for international grain trade.
                </p>
                <div className="inline-flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-full text-teal-700">
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                  International Trade
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-slate-900">Domestic Route</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Farm → Field Elevator → Mills → Packaging → Distribution → Retail → Consumers. Serves domestic Ukrainian market.
                </p>
                <div className="inline-flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-full text-slate-700">
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></span>
                  Local Market
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-teal-900">Feed Production</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Farm → Field Elevator → Mills → Feed Mills → Livestock Farms. Supports Ukrainian animal agriculture industry.
                </p>
                <div className="inline-flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-full text-teal-700">
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                  Agriculture Supply
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Risk Analysis */}
        {showRisks && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="p-6 bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 border-2 border-slate-200 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-3 text-slate-900">War Impact & Risk Analysis</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-slate-600" />
                        <h4 className="text-sm text-gray-800">Production Disruption</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Active conflict zones affecting farm production and harvest operations in eastern regions.
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="w-4 h-4 text-slate-600" />
                        <h4 className="text-sm text-gray-800">Logistics Challenges</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Transportation routes compromised, border crossing delays, and increased security screening.
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Ship className="w-4 h-4 text-teal-600" />
                        <h4 className="text-sm text-gray-800">Export Blockade</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Sea port access limited due to naval operations affecting grain export capacity significantly.
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