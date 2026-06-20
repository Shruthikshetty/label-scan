import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Ionicons from "@react-native-vector-icons/ionicons";

/** this will be shown in case there is no history of scans  */
const NoHistoryCard = () => {
  return (
    <Box className="flex flex-col p-4 items-center border-2 border-dashed border-gray-400 rounded-2xl py-5 px-10 gap-3">
      {/* icon */}
      <Ionicons name={"scan-outline"} size={35} color={"black"} />
      <Text size="lg" className="color-typography-950" bold>
        No scans yet
      </Text>
      <Text className="text-center color-typography-600">
        Your audited labels will show up here.
      </Text>
      {/*  button  */}
      <Button
        action="primary"
        variant="solid"
        className=" rounded-full bg-green-900 active:opacity-75 data-[active=true]:bg-green-900"
      >
        <ButtonText>Scan a label</ButtonText>
      </Button>
    </Box>
  );
};

export default NoHistoryCard;
