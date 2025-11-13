import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const stackedData = [
  { month: 'Jan', category1: 30, category2: 45, category3: 25, category4: 15 },
  { month: 'Feb', category1: 35, category2: 50, category3: 30, category4: 20 },
  { month: 'Mar', category1: 40, category2: 48, category3: 28, category4: 18 },
  { month: 'Apr', category1: 38, category2: 52, category3: 32, category4: 22 },
  { month: 'May', category1: 42, category2: 55, category3: 35, category4: 25 },
  { month: 'Jun', category1: 45, category2: 58, category3: 38, category4: 28 },
];

export default function Screen7() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-teal-700 text-white p-6 mb-6">
          <h1 className="text-2xl">Category Performance Breakdown</h1>
        </div>

        <Card className="p-6">
          <h2 className="mb-6">Monthly Performance by Category</h2>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={stackedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="category1" stackId="a" fill="#ef4444" name="Electronics" />
              <Bar dataKey="category2" stackId="a" fill="#10b981" name="Automotive" />
              <Bar dataKey="category3" stackId="a" fill="#f59e0b" name="Materials" />
              <Bar dataKey="category4" stackId="a" fill="#2dd4bf" name="Other" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <h3 className="text-sm">Electronics</h3>
            </div>
            <div className="text-2xl">240</div>
            <div className="text-xs text-gray-600 mt-1">Total Units</div>
            <div className="text-xs text-green-600 mt-1">↑ 15.2%</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <h3 className="text-sm">Automotive</h3>
            </div>
            <div className="text-2xl">308</div>
            <div className="text-xs text-gray-600 mt-1">Total Units</div>
            <div className="text-xs text-green-600 mt-1">↑ 11.8%</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <h3 className="text-sm">Materials</h3>
            </div>
            <div className="text-2xl">188</div>
            <div className="text-xs text-gray-600 mt-1">Total Units</div>
            <div className="text-xs text-green-600 mt-1">↑ 8.4%</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-teal-500 rounded"></div>
              <h3 className="text-sm">Other</h3>
            </div>
            <div className="text-2xl">128</div>
            <div className="text-xs text-gray-600 mt-1">Total Units</div>
            <div className="text-xs text-green-600 mt-1">↑ 12.1%</div>
          </Card>
        </div>

        {/* Analysis text */}
        <Card className="p-6 mt-6">
          <h2 className="mb-3">Analysis Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The stacked bar chart shows consistent growth across all categories over the 6-month period. 
            Automotive leads in total volume with 308 units, followed by Electronics at 240 units. 
            The combined growth rate across all categories is 12.3%, indicating strong overall performance. 
            Electronics shows the highest growth rate at 15.2%, suggesting increasing market demand in this segment.
          </p>
        </Card>
      </div>
    </div>
  );
}