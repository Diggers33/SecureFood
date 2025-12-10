import { motion } from 'motion/react';
import { Target } from 'lucide-react';

interface ConfusionMatrixData {
  x: string;
  y: string;
  value: number;
  label: string;
}

interface ConfusionMatrixWidgetProps {
  data: ConfusionMatrixData[];
}

export function ConfusionMatrixWidget({ data }: ConfusionMatrixWidgetProps) {
  return (
    <div className="p-4 rounded-xl" style={{ backgroundColor: '#f0f9f9' }}>
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-orange-600" />
        <h4 className="text-xs text-orange-900">Confusion Matrix: Disruption Classifier</h4>
      </div>
      <div className="flex items-center justify-center" style={{ height: 200 }}>
        {/* Actual label (vertical) */}
        <div className="mr-2 flex items-center" style={{ height: '100%' }}>
          <div className="text-[10px] text-gray-600 transform -rotate-90 whitespace-nowrap">
            Actual label
          </div>
        </div>
        
        {/* Matrix container */}
        <div className="flex flex-col items-center justify-center">
          {/* Matrix grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {data.map((cell, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 flex items-center justify-center rounded-xl shadow-sm transition-all hover:shadow-md"
                style={{
                  border: '2px solid #2d6b6a',
                  background: 'linear-gradient(135deg, rgba(45, 107, 106, 0.15) 0%, rgba(240, 249, 249, 0.9) 100%)'
                }}
              >
                <span className="text-2xl text-gray-800">{cell.label}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Predicted label (horizontal) */}
          <div className="text-center">
            <div className="flex justify-between text-[10px] text-gray-600 mb-1" style={{ width: '176px' }}>
              <span>No Disruption</span>
              <span>Disruption</span>
            </div>
            <div className="text-[10px] text-gray-600">Predicted label</div>
          </div>
        </div>
      </div>
    </div>
  );
}