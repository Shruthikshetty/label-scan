import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import ScoreGauge from "./score-gauge";
import { Badge, BadgeText } from "@/components/ui/badge";

const ChartCard = ({
  status,
  productName,
  totalScore,
  finalStatus,
}: {
  status: string;
  productName: string;
  totalScore: number;
  finalStatus: string;
}) => {
  return (
    <Card className="gap-2 rounded-2xl bg-white border border-gray-400 flex flex-row justify-between ">
      {/* graph */}
      <Box>
        <ScoreGauge score={7} />
        {/*  verdict text */}
        <Badge>
          <BadgeText>{finalStatus}</BadgeText>
        </Badge>
      </Box>

      {/* other details  */}
    </Card>
  );
};

export default ChartCard;
