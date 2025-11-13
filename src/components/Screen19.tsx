import { Card } from './ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const scatterData = Array.from({ length: 100 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 1000,
}));

const correlationMatrix = [
  [1.00, 0.78, -0.38, 0.62, 0.19],
  [0.78, 1.00, -0.31, 0.68, 0.27],
  [-0.38, -0.31, 1.00, -0.47, -0.14],
  [0.62, 0.68, -0.47, 1.00, 0.41],
  [0.19, 0.27, -0.14, 0.41, 1.00],
];

const variables = ['Efficiency', 'Throughput', 'Cost', 'Reliability', 'Speed'];

export default function Screen19() {
  const getCorrelationColor = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue > 0.8) return value > 0 ? 'bg-teal-700' : 'bg-red-700';
    if (absValue > 0.6) return value > 0 ? 'bg-teal-500' : 'bg-red-500';
    if (absValue > 0.4) return value > 0 ? 'bg-teal-300' : 'bg-red-300';
    if (absValue > 0.2) return value > 0 ? 'bg-teal-100' : 'bg-red-100';
    return 'bg-gray-100';
  };

  const getTextColor = (value: number) => {
    return Math.abs(value) > 0.5 ? 'text-white' : 'text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-teal-700 text-white p-6 mb-6">
          <h1 className="text-2xl">Correlation Analysis - Final Report</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Scatter plot */}
          <Card className="p-6">
            <h2 className="mb-4">Performance Relationship Analysis</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Efficiency" />
                <YAxis type="number" dataKey="y" name="Throughput" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={scatterData} fill="#0d9488" />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Correlation coefficient: 0.78</p>
              <p>p-value: {'<'} 0.001</p>
              <p className="text-xs mt-2">Strong positive correlation between efficiency and throughput</p>
            </div>
          </Card>

          {/* Correlation matrix */}
          <Card className="p-6">
            <h2 className="mb-4">Variable Correlation Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 text-xs bg-gray-50"></th>
                    {variables.map((variable, i) => (
                      <th key={i} className="border p-2 text-xs bg-gray-50 min-w-[60px]">
                        {variable}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {correlationMatrix.map((row, i) => (
                    <tr key={i}>
                      <td className="border p-2 text-xs bg-gray-50">{variables[i]}</td>
                      {row.map((value, j) => (
                        <td 
                          key={j} 
                          className={`border p-2 text-center text-xs ${getCorrelationColor(value)} ${getTextColor(value)}`}
                        >
                          {value.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs flex-wrap">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-teal-700"></div>
                <span>Strong +</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-teal-300"></div>
                <span>Weak +</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-100"></div>
                <span>None</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-red-300"></div>
                <span>Weak -</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-red-700"></div>
                <span>Strong -</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Summary insights */}
        <Card className="p-6 mt-6">
          <h2 className="mb-4">Summary Findings</h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm mb-2">Key Positive Correlations</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Efficiency ↔ Throughput (0.78)</li>
                <li>• Reliability ↔ Throughput (0.68)</li>
                <li>• Efficiency ↔ Reliability (0.62)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm mb-2">Key Negative Correlations</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cost ↔ Reliability (-0.47)</li>
                <li>• Cost ↔ Efficiency (-0.38)</li>
                <li>• Cost ↔ Throughput (-0.31)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm mb-2">Strategic Insights</h3>
              <p className="text-sm text-gray-600">
                Higher efficiency drives throughput improvements. 
                Cost reduction initiatives should carefully balance reliability impact.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-6 bg-teal-50 border border-teal-200 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="text-teal-800">Conclusion:</span> The analysis reveals strong interdependencies 
            between operational metrics. Optimization strategies should consider these correlations to avoid 
            unintended consequences across the supply chain.
          </p>
        </div>
      </div>
    </div>
  );
}