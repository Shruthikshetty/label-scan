import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* header */}
      <Box className="flex-1 p-4">
        {/* icon */}
        <Ionicons name={"scan"} className="w-10 h-10" />
        {/* heading , sub title  */}
        <Box>
          <Text size="xl" className="color-warning-300">
            LabelScout
          </Text>
          <Text size="md">AI-first deep label audit</Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
