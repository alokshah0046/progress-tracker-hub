
import React from "react";
import { 
  LineChart as RechartsComponent, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

interface LineChartData {
  name: string;
  [key: string]: number | string;
}

interface LineChartProps {
  data: LineChartData[];
  lines: Array<{ dataKey: string; color: string; name?: string }>;
  title?: string;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  lines, 
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
            {lines.map((line, index) => (
              <Line
                key={`line-${index}`}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                name={line.name || line.dataKey}
                strokeWidth={2}
                dot={{ r: 4, fill: line.color }}
                activeDot={{ r:
                  6 }}
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

export default LineChart;
