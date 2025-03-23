
import React from "react";
import { 
  BarChart as RechartsComponent, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

interface BarChartData {
  name: string;
  [key: string]: number | string;
}

interface BarChartProps {
  data: BarChartData[];
  bars: Array<{ dataKey: string; color: string; name?: string }>;
  title?: string;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  bars, 
  title,
  className = ""
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-2 rounded-md text-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${index}`} className="text-xs">
              <span 
                className="inline-block w-2 h-2 rounded-full mr-1" 
                style={{ backgroundColor: entry.color }}
              />
              {entry.name || entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`glass-card rounded-xl p-6 h-full ${className}`}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsComponent
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              formatter={(value) => <span className="text-xs">{value}</span>}
            />
            {bars.map((bar, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey={bar.dataKey}
                fill={bar.color}
                name={bar.name || bar.dataKey}
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={index * 100}
              />
            ))}
          </RechartsComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
