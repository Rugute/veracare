import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { lmsStats } from "./Data";
import StatsCard from "./StatsCard";

const Stats = () => {
  return (
    <div className="p-6">
      <Card className="min-h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Dashboard Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lmsStats.map((stat, idx) => (
            <StatsCard key={idx} data={stat} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
