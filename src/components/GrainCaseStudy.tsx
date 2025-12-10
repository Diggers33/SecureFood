import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tooltip as UITooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
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
  Droplets,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BackToUseCasesButton } from './BackToUseCasesButton';

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
    position: { x: 40, y: 200 },
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
    position: { x: 220, y: 200 },
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
    gradient: 'from-teal-500 to-teal-700', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Storage near Black Sea ports', 
    position: { x: 400, y: 100 },
    kpis: [
      { name: 'Storage Capacity', value: '380k tons', trend: 'stable' },
      { name: 'Utilization', value: '72%', trend: 'down' },
      { name: 'Drying Efficiency', value: '94%', trend: 'stable' }
    ],
    metrics: {
      throughput: '380,000 tons/year',
      efficiency: '72%',
      quality: '94%',
      cost: '€12/ton storage'
    }
  },
  { 
    id: 'elevator-field', 
    icon: Building2, 
    label: 'Grain Elevator (Field)', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-teal-700', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Storage near production areas', 
    position: { x: 400, y: 300 },
    kpis: [
      { name: 'Storage Capacity', value: '185k tons', trend: 'stable' },
      { name: 'Utilization', value: '89%', trend: 'up' },
      { name: 'Quality Control', value: '96%', trend: 'stable' }
    ],
    metrics: {
      throughput: '185,000 tons/year',
      efficiency: '89%',
      quality: '96%',
      cost: '€10/ton storage'
    }
  },
  { 
    id: 'ship', 
    icon: Ship, 
    label: 'Shipping', 
    color: 'bg-slate-500', 
    gradient: 'from-slate-400 to-slate-600', 
    hoverColor: 'hover:bg-slate-600', 
    description: 'Maritime transport', 
    position: { x: 580, y: 100 },
    kpis: [
      { name: 'Shipping Volume', value: '340k tons', trend: 'down' },
      { name: 'Transit Time', value: '14 days avg', trend: 'up' },
      { name: 'Port Delays', value: '3.5 days', trend: 'up' }
    ],
    metrics: {
      throughput: '340,000 tons/year',
      efficiency: '68%',
      quality: '93%',
      cost: '€35/ton freight'
    }
  },
  { 
    id: 'foreign', 
    icon: Factory, 
    label: 'Foreign Mills', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'International processing', 
    position: { x: 760, y: 100 },
    kpis: [
      { name: 'Processing', value: '320k tons', trend: 'down' },
      { name: 'Flour Output', value: '256k tons', trend: 'down' },
      { name: 'Export Demand', value: 'High', trend: 'stable' }
    ],
    metrics: {
      throughput: '320,000 tons/year',
      efficiency: '82%',
      quality: '94%',
      cost: '€45/ton milling'
    }
  },
  { 
    id: 'mills', 
    icon: Factory, 
    label: 'Mills (Flour)', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-emerald-600', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Grain processing to flour', 
    position: { x: 760, y: 300 },
    kpis: [
      { name: 'Processing Rate', value: '175k tons', trend: 'stable' },
      { name: 'Flour Yield', value: '76%', trend: 'stable' },
      { name: 'Quality Grade', value: 'A', trend: 'up' }
    ],
    metrics: {
      throughput: '175,000 tons/year',
      efficiency: '91%',
      quality: '97%',
      cost: '€42/ton milling'
    }
  },
  { 
    id: 'feed-mills', 
    icon: Factory, 
    label: 'Feed Mills', 
    color: 'bg-slate-500', 
    gradient: 'from-slate-400 to-slate-600', 
    hoverColor: 'hover:bg-slate-600', 
    description: 'Animal feed production', 
    position: { x: 940, y: 400 },
    kpis: [
      { name: 'Processing Rate', value: '95k tons', trend: 'stable' },
      { name: 'Mix Quality', value: '94%', trend: 'up' },
      { name: 'Feed Conversion', value: '1.8:1', trend: 'stable' }
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
    position: { x: 1120, y: 400 },
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
  { 
    id: 'packaging', 
    icon: Package, 
    label: 'Packaging', 
    color: 'bg-teal-600', 
    gradient: 'from-teal-500 to-teal-700', 
    hoverColor: 'hover:bg-teal-700', 
    description: 'Consumer packaging', 
    position: { x: 940, y: 300 },
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
    position: { x: 1120, y: 300 },
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
    description: 'Retail distribution', 
    position: { x: 1300, y: 300 },
    kpis: [
      { name: 'Sales Volume', value: '155k tons', trend: 'stable' },
      { name: 'Shelf Turnover', value: '12x/year', trend: 'up' },
      { name: 'Stock Accuracy', value: '96%', trend: 'stable' }
    ],
    metrics: {
      throughput: '155,000 tons/year',
      efficiency: '94%',
      quality: '95%',
      cost: '€8/ton handling'
    }
  },
  { 
    id: 'consumer', 
    icon: Users, 
    label: 'End Consumer', 
    color: 'bg-slate-600', 
    gradient: 'from-slate-500 to-slate-700', 
    hoverColor: 'hover:bg-slate-700', 
    description: 'Consumer market', 
    position: { x: 1480, y: 300 },
    kpis: [
      { name: 'Consumption', value: '150k tons', trend: 'stable' },
      { name: 'Price Index', value: '€2.45/kg', trend: 'up' },
      { name: 'Satisfaction', value: '87%', trend: 'stable' }
    ],
    metrics: {
      throughput: '150,000 tons/year',
      efficiency: '97%',
      quality: '93%',
      cost: '€2.45/kg avg'
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

export default function GrainCaseStudy({ onBackToUseCases }: { onBackToUseCases?: () => void }) {
  const [hoveredNode, setHoveredNode] = useState<NodeType | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [selectedPath, setSelectedPath] = useState<'export' | 'domestic' | 'feed' | null>(null);
  const [zoom, setZoom] = useState(0.75);
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
  const moistureTrendData = [
    { name: 'Jan', value: 11.5 },
    { name: 'Feb', value: 11.8 },
    { name: 'Mar', value: 12.2 },
    { name: 'Apr', value: 12.5 },
    { name: 'May', value: 12.8 },
    { name: 'Jun', value: 13.2 },
    { name: 'Jul', value: 12.9 },
    { name: 'Aug', value: 12.3 },
    { name: 'Sep', value: 11.8 },
    { name: 'Oct', value: 11.5 },
    { name: 'Nov', value: 12.0 },
    { name: 'Dec', value: 12.3 },
  ];

  const storageTempTrendData = [
    { name: 'Jan', value: 16.5 },
    { name: 'Feb', value: 17.2 },
    { name: 'Mar', value: 18.0 },
    { name: 'Apr', value: 19.5 },
    { name: 'May', value: 21.0 },
    { name: 'Jun', value: 22.5 },
    { name: 'Jul', value: 23.8 },
    { name: 'Aug', value: 22.0 },
    { name: 'Sep', value: 20.5 },
    { name: 'Oct', value: 19.0 },
    { name: 'Nov', value: 17.5 },
    { name: 'Dec', value: 16.8 },
  ];

  const disruptionTrendData = [
    { name: 'Jan', value: 85 },
    { name: 'Feb', value: 82 },
    { name: 'Mar', value: 78 },
    { name: 'Apr', value: 75 },
    { name: 'May', value: 72 },
    { name: 'Jun', value: 70 },
    { name: 'Jul', value: 68 },
    { name: 'Aug', value: 65 },
    { name: 'Sep', value: 64 },
    { name: 'Oct', value: 66 },
    { name: 'Nov', value: 67 },
    { name: 'Dec', value: 68 },
  ];

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
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-amber-500 to-orange-600">
              <Wheat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl mb-1">
                Grain <span className="text-teal-600">Dashboard</span>
              </h1>
              <p className="text-sm text-gray-600">Grain - Ukraine</p>
            </div>
          </div>
          
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
        </div>

        {/* Supply Chain Diagram */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-teal-100 overflow-visible relative z-50">
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-[100] flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-teal-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.min(zoom + 0.1, 1.5))}
              disabled={zoom >= 1.5}
              className="h-8 w-8 p-0"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
              disabled={zoom <= 0.5}
              className="h-8 w-8 p-0"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(0.75)}
              className="h-8 w-8 p-0"
              title="Reset Zoom"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <div className="flex items-center px-2 text-xs text-gray-600 border-l border-gray-300 ml-1">
              {Math.round(zoom * 100)}%
            </div>
          </div>

          <div 
            className="relative overflow-visible pb-64 transition-transform duration-300 origin-top-left" 
            style={{ 
              height: '560px', 
              transform: `scale(${zoom})`,
              width: `${100 / zoom}%`
            }}
          >
            {/* Study Area Box */}
            {showRisks && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute left-8 top-16 w-[640px] h-[260px] border-4 border-dashed border-slate-400 rounded-xl bg-slate-50/30 pointer-events-none"
              >
                <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-100 rounded-full border-2 border-slate-300">
                  <span className="text-xs text-slate-700">⚠️ Study Focus: War Impact Zone</span>
                </div>
              </motion.div>
            )}

            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              <defs>
                {/* Arrowhead markers */}
                <marker id="arrowhead-grain" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L0,10 L10,5 z" fill="#14b8a6" />
                </marker>
                <marker id="arrowhead-grain-active" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
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
                
                let x1, y1, x2, y2;
                
                // Special handling for vertical connection from foreign to mills
                if (conn.from === 'foreign' && conn.to === 'mills') {
                  // Vertical connection - from bottom of foreign to top of mills
                  x1 = fromCenterX;
                  y1 = fromNode.position.y + nodeHeight;
                  x2 = toCenterX;
                  y2 = toNode.position.y;
                } else {
                  // Standard horizontal connections - from right edge to left edge
                  x1 = fromNode.position.x + nodeWidth;
                  y1 = fromCenterY;
                  x2 = toNode.position.x;
                  y2 = toCenterY;
                }
                
                const dx = x2 - x1;
                const dy = y2 - y1;
                
                let pathData: string;
                
                // Special handling for vertical connection from foreign to mills
                if (conn.from === 'foreign' && conn.to === 'mills') {
                  pathData = `M ${x1} ${y1} L ${x2} ${y2}`;
                }
                // Special handling for vertical branching from logistics node
                else if (conn.from === 'logistics' && (conn.to === 'elevator-sea' || conn.to === 'elevator-field')) {
                  const radius = 25;
                  if (dy > 0) {
                    // Downward curve
                    pathData = `M ${x1} ${y1} L ${x1 + dx * 0.3} ${y1} Q ${x1 + dx * 0.3 + radius} ${y1}, ${x1 + dx * 0.3 + radius} ${y1 + radius} L ${x1 + dx * 0.3 + radius} ${y2 - radius} Q ${x1 + dx * 0.3 + radius} ${y2}, ${x1 + dx * 0.3 + radius * 2} ${y2} L ${x2} ${y2}`;
                  } else {
                    // Upward curve
                    pathData = `M ${x1} ${y1} L ${x1 + dx * 0.3} ${y1} Q ${x1 + dx * 0.3 + radius} ${y1}, ${x1 + dx * 0.3 + radius} ${y1 - radius} L ${x1 + dx * 0.3 + radius} ${y2 + radius} Q ${x1 + dx * 0.3 + radius} ${y2}, ${x1 + dx * 0.3 + radius * 2} ${y2} L ${x2} ${y2}`;
                  }
                }
                // Special handling for long horizontal arrow from elevator-field to mills
                else if (conn.from === 'elevator-field' && conn.to === 'mills') {
                  const midX = (x1 + x2) / 2;
                  const midY = y1 - 30;
                  pathData = `M ${x1} ${y1} Q ${midX} ${midY}, ${x2} ${y2}`;
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
                  <g key={idx}>
                    <motion.path
                      d={pathData}
                      stroke={highlighted ? '#0d9488' : '#14b8a6'}
                      strokeWidth={highlighted ? 3 : 2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      markerEnd={highlighted ? 'url(#arrowhead-grain-active)' : 'url(#arrowhead-grain)'}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: highlighted ? 0.9 : (selectedPath ? 0.2 : 0.5)
                      }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    />
                    {/* Waypoint dot for long horizontal arrow */}
                    {conn.from === 'elevator-field' && conn.to === 'mills' && (
                      <motion.circle
                        cx={(x1 + x2) / 2}
                        cy={y1 - 30}
                        r={highlighted ? 4 : 3}
                        fill={highlighted ? '#0d9488' : '#14b8a6'}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: highlighted ? 0.9 : (selectedPath ? 0.2 : 0.6)
                        }}
                        transition={{ duration: 0.3, delay: idx * 0.05 + 0.3 }}
                      />
                    )}
                  </g>
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
                      whileHover={{ scale: 1.15 }}
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                      animate={{
                        scale: highlighted || selectedNode === node.id ? 1.15 : 1,
                        opacity: selectedPath ? (highlighted ? 1 : 0.4) : 1,
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
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={moistureTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[10, 14]} 
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
                  formatter={(value: any) => [`${value.toFixed(1)}%`, 'Moisture']}
                />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-100 relative z-10">
            <h3 className="text-sm mb-4 text-orange-900">Storage Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={storageTempTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[15, 25]} 
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
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50/50 to-white border-2 border-red-100 relative z-10">
            <h3 className="text-sm mb-4 text-red-900">Disruption Impact Trend</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={disruptionTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[60, 90]} 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#d1d5db' }}
                  label={{ value: 'Index', position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value.toFixed(0)}`, 'Disruption']}
                />
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
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