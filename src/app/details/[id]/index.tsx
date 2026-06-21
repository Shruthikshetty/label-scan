import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import VerdictCard from "../../components/verdict-card";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "@/components/ui/heading";
import { MACRO_COLOR_MAPPING } from "../../constants/screen.constants";
import { Button, ButtonText } from "@/components/ui/button";
import Ionicons from "@react-native-vector-icons/ionicons";
import HackCard from "../../components/hack-card";

//mock data
const aiResult = {
  verdict:
    "This product contains a high amount of added sugar, primarily from High Fructose Corn Syrup, and includes artificial preservatives. The sodium content is also quite high for a small serving size, placing it on the lower end of the health spectrum.",

  macros: [
    {
      label: "Sodium",
      status: "High",
    },
    {
      label: "Sugar",
      status: "High",
    },
    {
      label: "Sat fat",
      status: "Good",
    },
  ],

  hack: "If this sauce is the only available option, use it very sparingly to minimize intake of high fructose corn syrup and preservatives, and try to balance with unsalted, whole foods.",
};

/**
 * this screen shows the details of the scan result
 * @param {string} id
 * @returns
 */
const ScanDetails = () => {
  // initialize router
  const router = useRouter();
  // get the id from route
  // const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 p-5 flex gap-5">
      {/* back button */}
      <Box className="flex flex-row ">
        <Button
          action="primary"
          variant="outline"
          className="rounded-full border-0 active:opacity-50"
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <ButtonText>Go back </ButtonText>
        </Button>
      </Box>

      {/* chart card */}

      {/* verdict card */}
      <VerdictCard verdict={aiResult.verdict} />

      {/* marco list */}
      <Box>
        <Heading className="text-xl text-typography-950" bold>
          Macro check
        </Heading>
        {/* macro card */}
        <Box className="flex flex-row flex-wrap gap-2 w-full mt-2 justify-between">
          {aiResult.macros.map((macro) => (
            <Box
              key={macro.label}
              className="w-[31%] flex flex-col gap-1 p-3 bg-white border border-gray-400 rounded-2xl"
            >
              <Text className="color-typography-600" size="lg">
                {macro.label?.toUpperCase()}
              </Text>
              <Text
                className={`${MACRO_COLOR_MAPPING?.[macro?.status?.toLowerCase()] ?? "color-typography-950"}`}
                bold
                size="xl"
              >
                {macro.status}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      {/* list of ingredients */}

      {/* ingredients table */}

      {/* hack card */}
      <HackCard description={aiResult.hack} />
    </SafeAreaView>
  );
};

export default ScanDetails;
