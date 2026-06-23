import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { getHexColorPerScore, getScoreTier } from "@/src/utils/color-utils";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useMemo } from "react";
import { Pressable } from "react-native";
import { ScanRecord } from "../src/db/schema";
import { Badge, BadgeText } from "./ui/badge";

export const HistoryItemCard = ({
  handleItemPress,
  handleDelete,
  item,
}: {
  handleItemPress: (item: ScanRecord) => void;
  handleDelete: (id: number) => void;
  item: ScanRecord;
}) => {
  const scoreColor = useMemo(
    () => getHexColorPerScore(item.totalScore),
    [item.totalScore],
  );
  const dateStr = useMemo(
    () =>
      new Date(item.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [item.createdAt],
  );

  return (
    <Box className="bg-white border border-gray-300 rounded-2xl p-4 flex flex-row items-center justify-between shadow-sm">
      <Pressable
        className="flex-1 flex flex-row items-center gap-3 active:opacity-60"
        onPress={() => handleItemPress(item)}
      >
        {/* Score Badge Indicator */}
        <Box
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{ backgroundColor: `${scoreColor}15` }}
        >
          <Text size="lg" bold style={{ color: scoreColor }}>
            {Math.round(item.totalScore)}
          </Text>
        </Box>

        {/* Details */}
        <Box className="flex-1">
          <Text
            className="color-typography-950 font-bold"
            size="md"
            numberOfLines={1}
          >
            {item.productName || "Unnamed Product"}
          </Text>
          <Box className="flex flex-row items-center gap-2 mt-1">
            <Text className="color-typography-500" size="xs">
              {dateStr}
            </Text>
            <Box className="w-1 h-1 rounded-full bg-gray-300" />
            <Badge
              size="sm"
              action={getScoreTier(item.totalScore)}
              variant="solid"
              className="rounded-full"
            >
              <BadgeText className="text-[10px] font-bold px-1.5 uppercase">
                {item.finalStatus}
              </BadgeText>
            </Badge>
          </Box>
        </Box>
      </Pressable>

      {/* Delete Action */}
      <Pressable
        className="p-2 ml-2 active:opacity-60"
        onPress={() => handleDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#dc2626" />
      </Pressable>
    </Box>
  );
};
