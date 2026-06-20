import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Ionicons from "@react-native-vector-icons/ionicons";

/**
 * component renders a image upload or open camera option
 * @ todo in progress
 */
const ImageUpload = () => {
  return (
    <Box className="w-full items-center flex-col justify-center border-2 border-dashed border-gray-400 rounded-2xl py-5 px-10 gap-3">
      {/*  icon */}
      <Box className="rounded-xl bg-cream p-3">
        <Ionicons name={"camera-outline"} size={35} color={"#15803d"} />
      </Box>
      <Text size="md" className="color-typography-600 text-center px-10">
        Point your camera at the ingredients list (front of pack works too)
      </Text>
      {/*  button  to open camera */}
      <Button
        action="primary"
        variant="solid"
        className="w-full rounded-full bg-green-900 active:opacity-75 data-[active=true]:bg-green-900"
      >
        <ButtonText>Open camera</ButtonText>
      </Button>
      {/*  open gallery */}
      <Button
        action="primary"
        variant="outline"
        className="w-full rounded-full border-0 active:opacity-50"
      >
        <Ionicons name="image" size={24} color="black" />
        <ButtonText>or upload from gallery</ButtonText>
      </Button>
    </Box>
  );
};

export default ImageUpload;
