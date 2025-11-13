import { Card } from './ui/card';

export default function Screen15() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-teal-700 text-white p-6 mb-6">
          <h1 className="text-2xl">Case study 1: Coca a very targeted problem - Definition of the tiers of the Supply Chain under Study</h1>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-4">
            Here where the following supply chain diagram is relevant for the case we are interested in, 
            but you can understand the platform to work as if it is relevant. The only reason for presenting it this way 
            is that there is data to populate the model used in the app (under use case 1), and this way we can make it 
            more clear and simple to the user looking at different use cases.
          </p>
        </div>

        <div className="mb-6">
          <Card className="p-6">
            <h2 className="mb-4">Intervention Analysis</h2>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 p-3 rounded">
                <div className="text-sm">Target Node</div>
                <div className="text-lg">Paste Producer</div>
                <div className="text-xs text-red-600 mt-1">High disruption potential</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm">Expected Impact</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Upstream effect:</span>
                    <span className="text-orange-600">Moderate</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Downstream effect:</span>
                    <span className="text-red-600">High</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Overall disruption:</span>
                    <span className="text-red-600">85%</span>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 p-3 rounded text-xs">
                Targeting this node is projected to reduce supply chain efficiency by 85% 
                and cause significant disruptions to downstream activities.
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">
            <span className="text-yellow-800">Note:</span> You can look for a very targeted intervention that results 
            in a reduced supply, or you can play with more targeted interventions at 1-2 levels max if you are interested 
            in a bigger impact on supply.
          </p>
        </div>

        <Card className="p-6">
          <h2 className="mb-4">Scenario Outcomes</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-600">Supply Reduction</div>
              <div className="text-xl text-red-600">-73%</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Price Impact</div>
              <div className="text-xl text-orange-600">+142%</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Time to Recovery</div>
              <div className="text-xl">6-8 months</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}