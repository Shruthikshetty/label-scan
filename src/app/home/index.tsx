import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <Box className="text-red-300">
        <Text>Edit src/app/index.tsx to edit this screen.</Text>
      </Box>
    </SafeAreaView>
  );
}
