import { Card } from './ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const timeSeriesData = [
  { date: '1/1', value: 45, forecast: 43 },
  { date: '1/8', value: 52, forecast: 51 },
  { date: '1/15', value: 48, forecast: 49 },
  { date: '1/22', value: 61, forecast: 58 },
  { date: '1/29', value: 55, forecast: 56 },
  { date: '2/5', value: 67, forecast: 65 },
  { date: '2/12', value: 72, forecast: 71 },
  { date: '2/19', value: 68, forecast: 69 },
  { date: '2/26', value: 75, forecast: 74 },
  { date: '3/5', value: 71, forecast: 73 },
  { date: '3/12', value: null, forecast: 76 },
  { date: '3/19', value: null, forecast: 78 },
  { date: '3/26', value: null, forecast: 75 },
];

const categoryData = [
  { category: 'Electronics', value: 85 },
  { category: 'Automotive', value: 72 },
  { category: 'Materials', value: 68 },
  { category: 'Chemicals', value: 61 },
  { category: 'Textiles', value: 55 },
  { category: 'Food', value: 48 },
  { category: 'Pharma', value: 42 },
  { category: 'Other', value: 35 },
];

export default function Screen4() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-teal-700 text-white p-6 mb-6">
          <h1 className="text-2xl">Advanced Analytics Dashboard</h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left sidebar with filters and info */}
          <div className="col-span-3 space-y-4">
            <Card className="p-4">
              <h3 className="text-sm mb-3">Filters</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600">Time Period</label>
                  <select className="w-full mt-1 px-2 py-1 border rounded text-sm">
                    <option>Last 3 months</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Region</label>
                  <select className="w-full mt-1 px-2 py-1 border rounded text-sm">
                    <option>All Regions</option>
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia Pacific</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Category</label>
                  <select className="w-full mt-1 px-2 py-1 border rounded text-sm">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Automotive</option>
                    <option>Materials</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm mb-2">Key Metrics</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs text-gray-600">Correlation</div>
                  <div>0.87</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">R-squared</div>
                  <div>0.76</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">RMSE</div>
                  <div>4.32</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">MAE</div>
                  <div>3.18</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main content area */}
          <div className="col-span-9 space-y-6">
            {/* Time series chart */}
            <Card className="p-6">
              <h2 className="mb-4">Demand Forecast vs Actual</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="forecast" stroke="#2d6b6a" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Bar chart and heatmap */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="mb-4">Category Performance</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={80} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0d9488" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h2 className="mb-4">Risk Heatmap</h2>
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
                    <div className="w-3 h-3 bg-teal-300 rounded"></div>
                    Medium
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