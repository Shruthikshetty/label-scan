import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import NoHistoryCard from "../components/no-history-card";
import { Box } from "@/components/ui/box";

const History = () => {
  return (
    <SafeAreaView className="flex-1 flex-col gap-5 p-4">
      {/*  title subtitle  */}
      <Box>
        <Text size="2xl" className="color-typography-950" bold>
          History
        </Text>
        <Text size="md" className="color-typography-600">
          Your scanned labels saved on device
        </Text>
      </Box>
      {/* temp no logic added */}
      <NoHistoryCard />
    </SafeAreaView>
  );
};

export default History;
