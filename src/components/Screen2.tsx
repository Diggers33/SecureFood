import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 65000, costs: 45000, profit: 20000 },
  { month: 'Feb', revenue: 72000, costs: 48000, profit: 24000 },
  { month: 'Mar', revenue: 78000, costs: 52000, profit: 26000 },
  { month: 'Apr', revenue: 85000, costs: 55000, profit: 30000 },
  { month: 'May', revenue: 92000, costs: 58000, profit: 34000 },
  { month: 'Jun', revenue: 88000, costs: 60000, profit: 28000 },
  { month: 'Jul', revenue: 95000, costs: 62000, profit: 33000 },
  { month: 'Aug', revenue: 102000, costs: 65000, profit: 37000 },
];

export default function Screen2() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto p-6">
        <div className="bg-teal-700 text-white p-6 mb-6">
          <h1 className="text-2xl">Supply Chain Performance Dashboard</h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left sidebar with metrics */}
          <div className="col-span-3 space-y-4">
            <Card className="p-4">
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-2xl mt-1">$677K</div>
              <div className="text-sm text-green-600 mt-1">↑ 12.5%</div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-gray-600">Total Costs</div>
              <div className="text-2xl mt-1">$445K</div>
              <div className="text-sm text-red-600 mt-1">↑ 8.3%</div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-gray-600">Net Profit</div>
              <div className="text-2xl mt-1">$232K</div>
              <div className="text-sm text-green-600 mt-1">↑ 21.4%</div>
            </Card>

            <Card className="p-4">
              <div className="text-sm text-gray-600">Efficiency</div>
              <div className="text-2xl mt-1">87%</div>
              <div className="text-sm text-green-600 mt-1">↑ 3.2%</div>
            </Card>
          </div>

          {/* Main chart area */}
          <div className="col-span-9">
            <Card className="p-6">
              <h2 className="mb-4">Performance Trends</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={2} />
                  <Line type="monotone" dataKey="costs" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="#2d6b6a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Bottom metrics */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card className="p-4">
                <div className="text-sm text-gray-600">Supplier Score</div>
                <div className="text-xl mt-1">8.4/10</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-600">Delivery Time</div>
                <div className="text-xl mt-1">5.2 days</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-600">Quality Rate</div>
                <div className="text-xl mt-1">94.8%</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}