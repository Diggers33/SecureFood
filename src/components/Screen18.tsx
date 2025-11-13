import { Card } from './ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const timeSeriesData = [
  { date: '1/1', value: 42, forecast: 40 },
  { date: '1/8', value: 49, forecast: 48 },
  { date: '1/15', value: 45, forecast: 46 },
  { date: '1/22', value: 58, forecast: 55 },
  { date: '1/29', value: 52, forecast: 53 },
  { date: '2/5', value: 64, forecast: 62 },
  { date: '2/12', value: 69, forecast: 68 },
  { date: '2/19', value: 65, forecast: 66 },
  { date: '2/26', value: 72, forecast: 71 },
  { date: '3/5', value: 68, forecast: 70 },
  { date: '3/12', value: null, forecast: 73 },
  { date: '3/19', value: null, forecast: 75 },
  { date: '3/26', value: null, forecast: 72 },
];

const categoryData = [
  { category: 'Node A', value: 82 },
  { category: 'Node B', value: 75 },
  { category: 'Node C', value: 71 },
  { category: 'Node D', value: 64 },
  { category: 'Node E', value: 58 },
  { category: 'Node F', value: 51 },
  { category: 'Node G', value: 45 },
  { category: 'Node H', value: 38 },
];

export default function Screen18() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-teal-700 text-white p-6 mb-6">
          <h1 className="text-2xl">Advanced Analytics Dashboard</h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left sidebar */}
          <div className="col-span-3 space-y-4">
            <Card className="p-4">
              <h3 className="text-sm mb-3">Analysis Controls</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600">Time Range</label>
                  <select className="w-full mt-1 px-2 py-1 border rounded text-sm">
                    <option>Last quarter</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Model Type</label>
                  <select className="w-full mt-1 px-2 py-1 border rounded text-sm">
                    <option>ARIMA</option>
                    <option>Prophet</option>
                    <option>LSTM</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm mb-2">Model Performance</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs text-gray-600">Accuracy</div>
                  <div>91.3%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Precision</div>
                  <div>0.88</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Recall</div>
                  <div>0.84</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">F1 Score</div>
                  <div>0.86</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main content */}
          <div className="col-span-9 space-y-6">
            <Card className="p-6">
              <h2 className="mb-4">Predictive Analysis</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="mb-4">Node Performance Ranking</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={60} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0d9488" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h2 className="mb-4">Risk Matrix</h2>
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const intensity = Math.random();
                    const bgColor = intensity > 0.7 ? 'bg-red-600' : 
                                   intensity > 0.5 ? 'bg-orange-500' : 
                                   intensity > 0.3 ? 'bg-teal-300' : 
                                   'bg-teal-100';
                    return (
                      <div 
                        key={i} 
                        className={`aspect-square ${bgColor} rounded`}
                        title={`Risk: ${(intensity * 100).toFixed(0)}%`}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-teal-100 rounded"></div>
                    Low
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-600 rounded"></div>
                    High
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}