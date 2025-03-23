
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface CategoryData {
  category: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  platforms: string[];
}

interface CategoryTableProps {
  data: CategoryData[];
  className?: string;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ data, className = "" }) => {
  return (
    <div className={`glass-card rounded-xl p-4 overflow-hidden ${className}`}>
      <h3 className="text-lg font-medium mb-4 px-2">Question Categories</h3>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Category</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Easy</TableHead>
              <TableHead className="text-center">Medium</TableHead>
              <TableHead className="text-center">Hard</TableHead>
              <TableHead className="text-right">Platforms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-foreground/5">
                <TableCell className="font-medium">{row.category}</TableCell>
                <TableCell className="text-center">{row.total}</TableCell>
                <TableCell className="text-center">
                  <span className="text-green-500">{row.easy}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-yellow-500">{row.medium}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-red-500">{row.hard}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {row.platforms.map((platform, i) => (
                      <div 
                        key={i} 
                        className="px-2 py-1 text-xs bg-foreground/10 rounded-full"
                        title={platform}
                      >
                        {platform.substring(0, 2)}
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryTable;
