import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import Ionicons from "@react-native-vector-icons/ionicons";

const HackCard = ({ description }: { description: string }) => {
  return (
    <Card className="gap-2 rounded-2xl bg-success-300/30 border border-success-600">
      <Box className="flex flex-row items-center gap-2">
        <Ionicons name="bulb-outline" size={20} color={"green"} />
        <Heading className="text-xl text-typography-950" bold>
          Dietary hack
        </Heading>
      </Box>
      <Text className="color-typography-800">{description}</Text>
    </Card>
  );
};

export default HackCard;
