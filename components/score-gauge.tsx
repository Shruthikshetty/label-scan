import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { Pie, PolarChart } from "victory-native";
interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: number;
  trackColor?: string;
  progressColor?: string;
}

const ScoreGauge = ({
  score,
  maxScore = 10,
  size = 140,
  trackColor = "#F2EFEA",
  progressColor = "#DC2626",
}: ScoreGaugeProps) => {
  const progress = Math.min(Math.max(score / maxScore, 0), 1);

  // build the data
  const data = [
    { label: "score", value: progress * 100, color: progressColor },
    { label: "remainder", value: (1 - progress) * 100, color: trackColor },
  ];

  return (
    <View
      style={{
        width: size,
        height: size,
      }}
      className="relative"
    >
      <PolarChart
        data={data}
        labelKey={"label"}
        valueKey={"value"}
        colorKey={"color"}
        containerStyle={{ width: size, height: size }}
      >
        <Pie.Chart innerRadius="80%" startAngle={270} size={size} />
      </PolarChart>

      {/* Centered Score Text */}
      <View
        className="absolute inset-0 flex items-center justify-center"
        pointerEvents="none"
      >
        <Text size="3xl" bold className="color-typography-950">
          {score}
        </Text>
        <Text size="md" className="color-typography-600">
          / {maxScore}
        </Text>
      </View>
    </View>
  );
};

export default ScoreGauge;
