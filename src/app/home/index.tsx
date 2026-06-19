import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 p-5 flex gap-5">
      {/* header */}
      <Box className="flex flex-row gap-5 p-4 items-center">
        {/* icon */}
        <Box className="p-2 rounded-full bg-green-800">
          <Ionicons name={"scan"} size={25} color={"white"} />
        </Box>
        {/* heading , sub title  */}
        <Box>
          <Text size="2xl" className="color-typography-950" bold>
            LabelScan
          </Text>
          <Text size="md" className="color-typography-600">
            AI-first deep label audit
          </Text>
        </Box>
      </Box>
      {/* body title */}
      <Box className="flex gap-5">
        <Box>
          <Text className="text-center color-typography-950" size="4xl" bold>
            What's actually inside
          </Text>
          <Text className="text-center text-green-700" size="4xl" bold>
            that packet?
          </Text>
        </Box>
        <Text className="text-center color-typography-600">
          Snap the label. Our AI nutritionist audits every single ingredient,
          flags red ones, and scores it out of 10.
        </Text>
      </Box>

      {/* scan component goes here  */}
    </SafeAreaView>
  );
}
