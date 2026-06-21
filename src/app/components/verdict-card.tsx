import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import Ionicons from "@react-native-vector-icons/ionicons";

const VerdictCard = ({ verdict }: { verdict: string }) => {
  return (
    <Card className="gap-2 rounded-2xl bg-white border border-gray-400">
      <Box className="flex flex-row items-center gap-2">
        <Ionicons name="sparkles-outline" size={20} color={"green"} />
        <Heading className="text-xl text-typography-950" bold>
          AI VERDICT
        </Heading>
      </Box>
      <Text className="color-typography-800">{verdict}</Text>
    </Card>
  );
};

export default VerdictCard;
