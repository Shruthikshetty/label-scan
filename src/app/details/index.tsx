import ChartCard from "@/components/chart-card";
import HackCard from "@/components/hack-card";
import IngredientsBreakdownList, {
  Ingredient,
} from "@/components/ingredients-breakdown-list";
import IngredientsTable, { type Per100g } from "@/components/ingredients-table";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import VerdictCard from "@/components/verdict-card";
import { MACRO_COLOR_MAPPING } from "@/src/constants/screen.constants";
import { type ProductAnalysisResult } from "@/src/utils/generate-ai-alalysis";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * this screen shows the details of the scan result
 * @param {string} id
 * @returns
 */
const ScanDetails = () => {
  // initialize router
  const router = useRouter();
  // get ai results from params
  const { result } = useLocalSearchParams<{ result: string }>();

  // Parse result if it exists
  const aiResult = result
    ? (JSON.parse(result) as ProductAnalysisResult)
    : null;

  // guard against missing or invalid result
  if (!aiResult || !aiResult.productName) {
    return (
      <SafeAreaView>
        <Box className="flex-1 flex-col items-center justify-center">
          <Text size="xl">No result found</Text>
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
      </SafeAreaView>
    );
  }

  // render the ai result
  return (
    <SafeAreaView>
      <ScrollView>
        <Box className="px-5 pb-5 pt-1 flex gap-5">
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
          <ChartCard
            finalStatus={aiResult.finalStatus}
            productName={aiResult.productName}
            totalScore={aiResult.totalScore}
            numOfIngredientsAudited={aiResult.numOfIngredientsAudited}
            totalRedFlags={aiResult.totalRedFlags}
          />

          {/* verdict card */}
          <VerdictCard verdict={aiResult.verdict} />

          {/* marco list */}
          <Box>
            <Heading size="lg" className="text-typography-950" bold>
              MACRO CHECK
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
          <IngredientsBreakdownList
            ingredients={aiResult?.ingredients as Ingredient[]}
          />

          {/* ingredients table */}
          <IngredientsTable
            title="Per 100g"
            data={aiResult?.per100g as Per100g[]}
          />

          {/* hack card */}
          <HackCard description={aiResult.hack} />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScanDetails;
