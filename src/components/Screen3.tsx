import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export default function Screen3() {
  const suppliers = [
    { name: 'Supplier A', rating: 8.5, onTime: '95%', quality: '97%', cost: '$45K' },
    { name: 'Supplier B', rating: 7.8, onTime: '89%', quality: '92%', cost: '$38K' },
    { name: 'Supplier C', rating: 9.1, onTime: '98%', quality: '99%', cost: '$52K' },
    { name: 'Supplier D', rating: 7.2, onTime: '85%', quality: '88%', cost: '$31K' },
    { name: 'Supplier E', rating: 8.9, onTime: '96%', quality: '95%', cost: '$48K' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-teal-700 text-white p-6 mb-6">
          <h1 className="text-2xl">Supplier Performance Analysis</h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Metrics sidebar */}
          <div className="col-span-3 space-y-4">
            <Card className="p-4">
              <div className="text-sm text-gray-600">Active Suppliers</div>
              <div className="text-2xl mt-1">24</div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-gray-600">Avg Rating</div>
              <div className="text-2xl mt-1">8.3</div>
            </Card>
            
            <Card className="p-4">
              <div className="text-sm text-gray-600">On-Time Delivery</div>
              <div className="text-2xl mt-1">92.6%</div>
            </Card>

            <Card className="p-4">
              <div className="text-sm text-gray-600">Quality Score</div>
              <div className="text-2xl mt-1">94.2%</div>
            </Card>

            <Card className="p-4 bg-teal-50">
              <div className="text-sm">Risk Assessment</div>
              <div className="text-sm mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Low:</span>
                  <span>18</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium:</span>
                  <span>5</span>
                </div>
                <div className="flex justify-between">
                  <span>High:</span>
                  <span>1</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main content */}
          <div className="col-span-9">
            <Card className="p-6">
              <h2 className="mb-4">Top Suppliers Performance</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>On-Time %</TableHead>
                    <TableHead>Quality %</TableHead>
                    <TableHead>Monthly Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier.name}>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>
                        <span className={supplier.rating >= 8.5 ? 'text-green-600' : supplier.rating >= 7.5 ? 'text-yellow-600' : 'text-red-600'}>
                          {supplier.rating}
                        </span>
                      </TableCell>
                      <TableCell>{supplier.onTime}</TableCell>
                      <TableCell>{supplier.quality}</TableCell>
                      <TableCell>{supplier.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Card className="p-4">
                <h3 className="text-sm mb-3">Delivery Performance</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Early</span>
                      <span>23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div className="bg-green-500 h-2 rounded" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>On-Time</span>
                      <span>69%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div className="bg-teal-500 h-2 rounded" style={{ width: '69%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Late</span>
                      <span>8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div className="bg-red-500 h-2 rounded" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-sm mb-3">Cost Distribution</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Materials</span>
                      <span>58%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div className="bg-teal-500 h-2 rounded" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Logistics</span>
                      <span>27%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div className="bg-purple-500 h-2 rounded" style={{ width: '27%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Other</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div className="bg-gray-500 h-2 rounded" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}