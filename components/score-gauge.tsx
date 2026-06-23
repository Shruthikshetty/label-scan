import { View, Text } from "react-native";
import { PolarChart, Pie } from "victory-native";

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: number;
  trackColor?: string;
  progressColor?: string;
}

/**
 * Circular donut gauge built with victory-native (Skia-backed).
 * Renders two pie slices: filled progress + gray remainder.
 */
const ScoreGauge = ({
  score,
  maxScore = 10,
  size = 140,
  trackColor = "#E8E8E8",
  progressColor = "#DC2626",
}: ScoreGaugeProps) => {
  const progress = Math.min(Math.max(score / maxScore, 0), 1);

  const data = [
    { label: "score", value: progress * 100, color: progressColor },
    { label: "remainder", value: (1 - progress) * 100, color: trackColor },
  ];

  const innerRadius = size * 0.3;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PolarChart
        data={data}
        labelKey="label"
        valueKey="value"
        colorKey="color"
        width={size}
        height={size}
      >
        <Pie.Chart innerRadius={innerRadius} />
      </PolarChart>

      {/* Score text centered over the donut */}
      <View
        style={{ position: "absolute", alignItems: "center" }}
        pointerEvents="none"
      >
        <Text className="text-5xl font-bold text-typography-900">{score}</Text>
        <Text className="text-xs text-typography-400">/ {maxScore}</Text>
      </View>
    </View>
  );
};

export default ScoreGauge;
