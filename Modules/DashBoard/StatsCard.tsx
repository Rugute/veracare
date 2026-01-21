import { Card } from "@/components/ui/card";
import { DataProps } from "./Data";

interface Props {
  data: DataProps;
}

const StatsCard = ({ data }: Props) => {
  return (
    <Card className="p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
      <span className="text-sm font-medium text-muted-foreground">
        {data.name}
      </span>
      <h2 className="mt-2 text-2xl font-bold">{data.value}</h2>
    </Card>
  );
};

export default StatsCard;
