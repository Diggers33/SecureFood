import { Card } from './ui/card';

export default function Screen16() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-teal-700 text-white p-6 mb-6">
          <h1 className="text-2xl">Case study 1: Coca 2-tiered problem - Definition of the tiers of the Supply Chain under Study</h1>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-4">
            Here where the following supply chain diagram is irrelevant for the case we are interested in, 
            but you can understand the platform to work as if it is relevant. The only reason for presenting 
            it this way is that there is data to populate the model used in the app, and this way we can make 
            it more clear and simple to the user looking at different use cases.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="mb-4">Multi-Tier Intervention Analysis</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm mb-3">Primary Target</h3>
              <div className="bg-red-50 p-3 rounded">
                <div className="text-sm">Local Collector</div>
                <div className="text-xs text-gray-600 mt-1">Tier 2 node</div>
                <div className="text-xs text-red-600 mt-1">Impact: 45%</div>
              </div>
            </div>
            <div>
              <h3 className="text-sm mb-3">Secondary Target</h3>
              <div className="bg-red-50 p-3 rounded">
                <div className="text-sm">Base Producer</div>
                <div className="text-xs text-gray-600 mt-1">Tier 4 node</div>
                <div className="text-xs text-red-600 mt-1">Impact: 52%</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm mb-3">Combined Impact Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-600">Total Supply Disruption</div>
                <div className="text-xl text-red-600">-89%</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Synergy Effect</div>
                <div className="text-xl text-orange-600">+34%</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Recovery Time</div>
                <div className="text-xl">9-12 months</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="text-teal-800">Analysis:</span> Using a multi-tiered intervention approach yields 
            a synergistic effect of 34% beyond the sum of individual impacts. This demonstrates the strategic 
            value of coordinated interventions across multiple supply chain nodes.
          </p>
        </div>
      </div>
    </div>
  );
}