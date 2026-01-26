"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EntriesPerPageProps {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
  label?: string;
}

export const EntriesPerPage = ({
  value,
  onChange,
  options = [10, 25, 50, 100],
  label = "Entries per page",
}: EntriesPerPageProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{label}</span>

      <Select
        value={String(value)}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger className="h-8 w-22.5">
          <SelectValue />
        </SelectTrigger>

        <SelectContent align="end">
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
