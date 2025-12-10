import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Copy, Trash2, BarChart3, Fish, Activity, Wheat, Apple, Milk } from 'lucide-react';

interface SavedSimulation {
  id: string;
  name: string;
  sector: 'fish' | 'aquaculture' | 'grain' | 'fruits' | 'dairy';
  variable: string;
  month: string;
  year: string;
  timestamp: Date;
  parameters: {
    demandShift?: number;
    supplyChange?: number;
    priceFluctuation?: number;
  };
  results: {
    demand: number[];
    supply: number[];
    inventory: number[];
  };
}

interface SimulationComparisonPanelProps {
  savedSimulations: SavedSimulation[];
  selectedSimulations: string[];
  onDelete: (id: string) => void;
  onDuplicate: (simulation: SavedSimulation) => void;
  onToggleSelection: (id: string) => void;
  simulationData: any[];
}

const sectors = [
  { id: 'fish' as const, name: 'Fish - Greece', icon: Fish, gradient: 'from-blue-500 to-cyan-600' },
  { id: 'aquaculture' as const, name: 'Aquaculture - Belgium', icon: Activity, gradient: 'from-teal-500 to-emerald-600' },
  { id: 'grain' as const, name: 'Grain - Ukraine', icon: Wheat, gradient: 'from-amber-500 to-orange-600' },
  { id: 'fruits' as const, name: 'Fruits & Vegetables - Portugal', icon: Apple, gradient: 'from-green-500 to-emerald-600' },
  { id: 'dairy' as const, name: 'Milk & Dairy - Greece/Finland', icon: Milk, gradient: 'from-indigo-500 to-purple-600' },
];

export function SavedSimulationsPanel({ 
  savedSimulations, 
  selectedSimulations, 
  onDelete, 
  onDuplicate, 
  onToggleSelection 
}: Omit<SimulationComparisonPanelProps, 'simulationData'>) {
  if (savedSimulations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5"
    >
      <Card className="p-6 bg-white border-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base text-gray-800">Saved Simulations</h3>
          <Badge className="text-xs" style={{ backgroundColor: '#f0f9f9', color: '#2d6b6a' }}>
            {savedSimulations.length} scenarios
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {savedSimulations.map((sim) => {
            const isSelected = selectedSimulations.includes(sim.id);
            const sectorInfo = sectors.find(s => s.id === sim.sector);
            const SectorIcon = sectorInfo?.icon || Fish;
            
            return (
              <motion.div
                key={sim.id}
                whileHover={{ y: -2 }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-teal-500 bg-teal-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm'
                }`}
                onClick={() => onToggleSelection(sim.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${sectorInfo?.gradient} rounded-lg flex items-center justify-center`}>
                      <SectorIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{sim.name}</p>
                      <p className="text-[10px] text-gray-500">{sectorInfo?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate(sim);
                      }}
                      className="w-6 h-6 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    >
                      <Copy className="w-3 h-3 text-gray-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(sim.id);
                      }}
                      className="w-6 h-6 rounded-lg hover:bg-red-100 flex items-center justify-center"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Variable:</span>
                    <span className="text-gray-700">{sim.variable}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Period:</span>
                    <span className="text-gray-700">{sim.month} {sim.year}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-700">{new Date(sim.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className={`text-[10px] text-center py-1.5 rounded-lg ${
                  isSelected 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {isSelected ? '✓ Selected for comparison' : 'Click to compare'}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}

export function ComparisonView({ 
  savedSimulations, 
  selectedSimulations,
  simulationData 
}: Pick<SimulationComparisonPanelProps, 'savedSimulations' | 'selectedSimulations' | 'simulationData'>) {
  if (selectedSimulations.length === 0) return null;

  const getComparisonData = () => {
    const selected = savedSimulations.filter(sim => selectedSimulations.includes(sim.id));
    if (selected.length === 0) return [];

    return simulationData.map((_, idx) => {
      const dataPoint: any = { time: simulationData[idx].time };
      selected.forEach((sim, simIdx) => {
        dataPoint[`demand${simIdx}`] = sim.results.demand[idx];
        dataPoint[`supply${simIdx}`] = sim.results.supply[idx];
        dataPoint[`inventory${simIdx}`] = sim.results.inventory[idx];
      });
      return dataPoint;
    });
  };

  const comparisonData = getComparisonData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5"
    >
      <Card className="p-6 bg-white border-2 border-teal-200 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#2d6b6a' }}>
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base text-gray-800">Scenario Comparison</h3>
            <p className="text-xs text-gray-500">Comparing {selectedSimulations.length} simulation scenarios</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Demand Comparison */}
          <div className="p-4 rounded-xl border-2 border-gray-200" style={{ backgroundColor: '#f0f9f9' }}>
            <h4 className="text-xs text-teal-900 mb-3">Demand Comparison</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 9 }} stroke="#64748b" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                {selectedSimulations.map((simId, idx) => {
                  const sim = savedSimulations.find(s => s.id === simId);
                  const colors = ['#2d6b6a', '#64748b', '#f97316'];
                  return (
                    <Line
                      key={simId}
                      type="monotone"
                      dataKey={`demand${idx}`}
                      stroke={colors[idx]}
                      strokeWidth={2}
                      name={sim?.name || `Scenario ${idx + 1}`}
                      dot={{ r: 3 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Supply Comparison */}
          <div className="p-4 rounded-xl border-2 border-gray-200 bg-white">
            <h4 className="text-xs text-slate-900 mb-3">Supply Comparison</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 9 }} stroke="#64748b" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                {selectedSimulations.map((simId, idx) => {
                  const sim = savedSimulations.find(s => s.id === simId);
                  const colors = ['#2d6b6a', '#64748b', '#f97316'];
                  return (
                    <Line
                      key={simId}
                      type="monotone"
                      dataKey={`supply${idx}`}
                      stroke={colors[idx]}
                      strokeWidth={2}
                      name={sim?.name || `Scenario ${idx + 1}`}
                      dot={{ r: 3 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Inventory Comparison */}
          <div className="p-4 rounded-xl border-2 border-gray-200" style={{ backgroundColor: '#f0f9f9' }}>
            <h4 className="text-xs text-teal-900 mb-3">Inventory Comparison</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 9 }} stroke="#64748b" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                {selectedSimulations.map((simId, idx) => {
                  const sim = savedSimulations.find(s => s.id === simId);
                  const colors = ['#2d6b6a', '#64748b', '#f97316'];
                  return (
                    <Line
                      key={simId}
                      type="monotone"
                      dataKey={`inventory${idx}`}
                      stroke={colors[idx]}
                      strokeWidth={2}
                      name={sim?.name || `Scenario ${idx + 1}`}
                      dot={{ r: 3 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison Summary */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {selectedSimulations.map((simId, idx) => {
            const sim = savedSimulations.find(s => s.id === simId);
            if (!sim) return null;
            
            const avgDemand = sim.results.demand.reduce((a, b) => a + b, 0) / sim.results.demand.length;
            const avgSupply = sim.results.supply.reduce((a, b) => a + b, 0) / sim.results.supply.length;
            const avgInventory = sim.results.inventory.reduce((a, b) => a + b, 0) / sim.results.inventory.length;

            return (
              <Card key={simId} className="p-4 border-2 border-gray-200">
                <h4 className="text-sm text-gray-900 mb-3">{sim.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Avg Demand:</span>
                    <span className="text-gray-900">{avgDemand.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Avg Supply:</span>
                    <span className="text-gray-900">{avgSupply.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Avg Inventory:</span>
                    <span className="text-gray-900">{avgInventory.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-2 border-t border-gray-200">
                    <span className="text-gray-500">Gap:</span>
                    <span className={avgDemand > avgSupply ? 'text-red-600' : 'text-green-600'}>
                      {(avgDemand - avgSupply).toFixed(1)}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
