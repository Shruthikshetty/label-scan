import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR_INDICATORS } from "@/src/constants/screen.constants";
import ImageUpload from "@/components/image-upload";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  // @TODO temp navigate to details
  const handleUpload = () => {
    router.push("/details/1");
  };

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
            What&apos;s actually inside
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
      <ImageUpload handleUpload={handleUpload} />

      {/* color indicators  */}
      <Box className="flex w-full flex-row gap-3 p-3 items-center">
        {COLOR_INDICATORS.map((item, index) => (
          <Box
            className="flex flex-1 flex-col gap-1 p-4 items-center border border-gray-300 rounded-3xl h-full"
            key={index}
          >
            <Box className={`p-2 rounded-full ${item.color}`} />
            {/*  text */}
            <Text
              size="sm"
              className="color-typography-950 text-center w-full"
              bold
            >
              {item.label}
            </Text>
            {/*  color dot */}
          </Box>
        ))}
      </Box>
    </SafeAreaView>
  );
}
