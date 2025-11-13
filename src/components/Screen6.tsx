import { Card } from './ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const scatterData = Array.from({ length: 100 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 1000,
}));

const correlationMatrix = [
  [1.00, 0.85, -0.42, 0.67, 0.23],
  [0.85, 1.00, -0.35, 0.72, 0.31],
  [-0.42, -0.35, 1.00, -0.51, -0.18],
  [0.67, 0.72, -0.51, 1.00, 0.44],
  [0.23, 0.31, -0.18, 0.44, 1.00],
];

const variables = ['Revenue', 'Volume', 'Distance', 'Quality', 'Lead Time'];

export default function Screen6() {
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
          <h1 className="text-2xl">Correlation Analysis</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Scatter plot */}
          <Card className="p-6">
            <h2 className="mb-4">Relationship: Volume vs Quality</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Volume" />
                <YAxis type="number" dataKey="y" name="Quality" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={scatterData} fill="#0d9488" />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Correlation coefficient: 0.72</p>
              <p>p-value: {'<'} 0.001</p>
            </div>
          </Card>

          {/* Correlation matrix */}
          <Card className="p-6">
            <h2 className="mb-4">Correlation Matrix</h2>
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
            <div className="mt-4 flex items-center gap-4 text-xs">
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

        {/* Additional insights */}
        <Card className="p-6 mt-6">
          <h2 className="mb-4">Key Insights</h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm mb-2">Strongest Positive Correlation</h3>
              <p className="text-sm text-gray-600">Revenue ↔ Volume (0.85)</p>
              <p className="text-xs text-gray-500 mt-1">Higher volumes drive revenue growth</p>
            </div>
            <div>
              <h3 className="text-sm mb-2">Strongest Negative Correlation</h3>
              <p className="text-sm text-gray-600">Quality ↔ Distance (-0.51)</p>
              <p className="text-xs text-gray-500 mt-1">Longer distances may impact quality</p>
            </div>
            <div>
              <h3 className="text-sm mb-2">Weakest Correlation</h3>
              <p className="text-sm text-gray-600">Lead Time ↔ Distance (-0.18)</p>
              <p className="text-xs text-gray-500 mt-1">Distance has minimal impact on lead time</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}