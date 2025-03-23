
import React, { useRef, useEffect } from "react";
import { PieChart as RechartsComponent, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      // Force recharts to redraw on resize
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-2 rounded-md text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-xs">{`Count: ${payload[0].value}`}</p>
          <p className="text-xs">{`Percentage: ${((payload[0].value / total) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="glass-card rounded-xl p-6 h-full" ref={chartRef}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsComponent>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              animationDuration={800}
              animationBegin={100}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </RechartsComponent>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-2">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
