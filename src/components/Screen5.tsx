import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dist1Data = Array.from({ length: 50 }, (_, i) => ({
  x: i,
  y: Math.exp(-Math.pow(i - 25, 2) / 50) * 30 + Math.random() * 5,
}));

const dist2Data = Array.from({ length: 50 }, (_, i) => ({
  x: i,
  y: Math.exp(-Math.pow(i - 20, 2) / 40) * 25 + Math.random() * 4,
}));

const dist3Data = Array.from({ length: 50 }, (_, i) => ({
  x: i,
  y: Math.exp(-Math.pow(i - 30, 2) / 60) * 28 + Math.random() * 4,
}));

export default function Screen5() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-teal-700 text-white p-6 mb-6">
          <h1 className="text-2xl">Distribution Analysis</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Distribution charts */}
          <Card className="p-6">
            <h2 className="mb-4">Lead Time Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dist1Data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4">Cost Variance Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dist2Data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#0d9488" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4">Quality Score Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dist3Data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#2d6b6a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Color gradient reference */}
          <Card className="p-6 flex items-center justify-center">
            <div className="w-full">
              <h2 className="mb-4">Color Scale Reference</h2>
              <div className="space-y-4">
                <div className="h-48 w-full rounded-lg" 
                     style={{
                       background: 'linear-gradient(to bottom, #ccfbf1, #99f6e4, #5eead4, #2dd4bf, #14b8a6, #0d9488, #0f766e, #115e59, #134e4a, #042f2e)'
                     }}>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Statistical summary */}
        <Card className="p-6 mt-6">
          <h2 className="mb-4">Statistical Summary</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Mean Lead Time</div>
              <div className="text-xl">12.4 days</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Std Deviation</div>
              <div className="text-xl">3.2 days</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Median</div>
              <div className="text-xl">11.8 days</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">95th Percentile</div>
              <div className="text-xl">18.5 days</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}