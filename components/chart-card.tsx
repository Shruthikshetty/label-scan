import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  getBadgeColorPerScore,
  getHexColorPerScore,
} from "@/src/utils/color-utils";
import Ionicons from "@react-native-vector-icons/ionicons";
import ScoreGauge from "./score-gauge";
import { Box } from "./ui/box";
import { Text } from "./ui/text";

/**
 * shows a pie chart with score
 * + additional details of the product
 */
const ChartCard = ({
  productName,
  totalScore,
  finalStatus,
  numOfIngredientsAudited = 0,
  totalRedFlags = 0,
}: {
  productName: string;
  totalScore: number;
  finalStatus: string;
  numOfIngredientsAudited?: number;
  totalRedFlags?: number;
}) => {
  // Determine badge background color based on status
  let badgeBg = `bg-${getBadgeColorPerScore(totalScore)}`;
  const textColor = `text-${getBadgeColorPerScore(totalScore)}`;
  const scoreColor = getHexColorPerScore(totalScore);

  return (
    <Card className="p-5 rounded-2xl bg-white border border-gray-400 flex flex-row items-center gap-6 justify-between w-full">
      {/* Left side: Graph and Status Badge */}
      <Box className="items-center gap-3">
        <ScoreGauge score={totalScore} size={135} progressColor={scoreColor} />

        {/* Status Pill Badge */}
        <Badge
          className={`${badgeBg} px-5 py-1.5 rounded-full min-w-[80px] justify-center`}
        >
          <BadgeText className="text-white text-xs font-bold tracking-wider text-center uppercase">
            {finalStatus}
          </BadgeText>
        </Badge>
      </Box>

      {/* Right side: Product Details */}
      <Box className="flex-1 gap-2">
        <Text
          className="leading-tight flex-wrap color-typography-950"
          bold
          size="2xl"
        >
          {productName}
        </Text>

        <Text className="color-typography-600" size="sm">
          {numOfIngredientsAudited} ingredients audited
        </Text>

        {/* Red flags indicator */}
        <Badge
          className={`flex flex-row items-center ${badgeBg}/20 px-3.5 py-1.5 rounded-full self-start gap-1.5 mt-1`}
        >
          <Ionicons name="alert-circle" size={15} color={scoreColor} />
          <BadgeText className={`${textColor} text-xs font-bold`}>
            {totalRedFlags} red flags
          </BadgeText>
        </Badge>
      </Box>
    </Card>
  );
};

export default ChartCard;
