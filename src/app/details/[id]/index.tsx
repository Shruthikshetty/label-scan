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
import IngredientsBreakdownList, {
  Ingredient,
} from "../../components/ingredients-breakdown-list";
import { ScrollView } from "react-native";
import IngredientsTable, {
  type Per100g,
} from "../../components/ingredients-table";

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

  ingredients: [
    {
      name: "Tomato Puree (Tomato Paste, Water)",
      analyzed:
        "Tomato puree is a minimally processed blend of cooked and strained tomatoes with water. It is a natural source of lycopene, vitamins C and K, and potassium. It carries no significant health risks and is widely considered a healthy base ingredient in sauces and condiments.",
      riskLevel: "safe",
    },
    {
      name: "High Fructose Corn Syrup",
      analyzed:
        "High Fructose Corn Syrup (HFCS) is a sweetener derived from corn starch where glucose is partially converted to fructose. Excessive consumption is linked to weight gain, insulin resistance, type 2 diabetes, and cardiovascular disease. Most health organizations recommend limiting added sugars including HFCS.",
      riskLevel: "red flag",
    },
    {
      name: "Malt Vinegar",
      analyzed:
        "Malt vinegar is produced by fermenting malted barley and is commonly used as a condiment or preservative. It contains acetic acid, which has antimicrobial properties and may support digestion. It is generally safe for most people, though those with gluten sensitivities should note it is derived from barley.",
      riskLevel: "safe",
    },
    {
      name: "Distilled White Vinegar",
      analyzed:
        "Distilled white vinegar is a diluted acetic acid solution used for flavor and preservation. It is gluten-free, low calorie, and generally well tolerated. It may aid blood sugar regulation and digestion in small amounts, with no significant health risks at typical dietary levels.",
      riskLevel: "safe",
    },
    {
      name: "Salt",
      analyzed:
        "Salt (sodium chloride) is essential for nerve signaling, fluid balance, and muscle function. However, excess dietary sodium is one of the leading contributors to hypertension, heart disease, and stroke. Processed and packaged foods often contain hidden salt far exceeding daily recommended limits of 2,000 mg.",
      riskLevel: "processed",
    },
    {
      name: "Raisin Concentrate",
      analyzed:
        "Raisin concentrate is a natural sweetener derived from dried grapes. It provides natural sugars, fiber, iron, and antioxidants. While healthier than refined sweeteners, it is still a concentrated sugar source and can contribute to elevated blood sugar when consumed in excess.",
      riskLevel: "processed",
    },
    {
      name: "Mustard Flour",
      analyzed:
        "Mustard flour is finely ground mustard seeds and is used for flavor and mild preservation. It is a common allergen and can trigger reactions in sensitive individuals. For non-allergic individuals, it is generally safe and provides trace minerals and glucosinolates with potential anti-inflammatory properties.",
      riskLevel: "safe",
    },
    {
      name: "Soybean Oil",
      analyzed:
        "Soybean oil is a refined vegetable oil widely used in processed foods. It is high in omega-6 polyunsaturated fatty acids, and when consumed in excess — as is common in Western diets — it may contribute to chronic inflammation. Its high linoleic acid content has raised concerns in recent nutritional research.",
      riskLevel: "processed",
    },
    {
      name: "Turmeric",
      analyzed:
        "Turmeric is a natural spice derived from the Curcuma longa plant and is commonly used for color and flavor. Its active compound, curcumin, has well-documented anti-inflammatory and antioxidant properties. It is widely regarded as a beneficial ingredient with no known adverse effects at culinary doses.",
      riskLevel: "safe",
    },
    {
      name: "Spices",
      analyzed:
        "Generic 'spices' on a label refers to a blend of natural aromatic plant-based seasonings. Without specific disclosure, it is difficult to evaluate individual components, though most culinary spices are safe and beneficial. Some individuals may experience sensitivity or allergic reactions to undisclosed spice blends.",
      riskLevel: "safe",
    },
    {
      name: "Guar Gum",
      analyzed:
        "Guar gum is a natural polysaccharide derived from guar beans, used as a thickener and stabilizer. It is high in soluble fiber and may support digestive health and cholesterol reduction. Excessive consumption can cause bloating or gastrointestinal discomfort, but amounts used in food products are generally well within safe limits.",
      riskLevel: "safe",
    },
    {
      name: "Apple Paste",
      analyzed:
        "Apple paste is a concentrated form of cooked apples used as a natural sweetener, thickener, and flavor enhancer. It contains natural sugars, pectin, and trace vitamins. It is a whole-food-derived ingredient with no significant health concerns at typical usage levels.",
      riskLevel: "safe",
    },
    {
      name: "Potassium Sorbate",
      analyzed:
        "Potassium sorbate is a synthetic preservative widely used to inhibit mold and yeast growth in food products. While approved by regulatory bodies like the FDA and EFSA, studies suggest it may cause skin irritation and potential genotoxic effects at higher concentrations. Considered safe at low doses but worth monitoring in frequently consumed products.",
      riskLevel: "red flag",
    },
    {
      name: "Sodium Benzoate",
      analyzed:
        "Sodium benzoate is a chemical preservative that inhibits microbial growth in acidic foods. When combined with ascorbic acid (vitamin C), it can form benzene, a known carcinogen. It has also been associated with hyperactivity in children and allergic reactions. Health experts recommend minimizing exposure, especially for children.",
      riskLevel: "red flag",
    },
    {
      name: "Caramel Color",
      analyzed:
        "Caramel color is a food coloring made by heating sugar compounds. Class III and IV caramel colors (used in many beverages and sauces) involve ammonia in production and contain 4-MEI, a compound classified as a possible carcinogen by the IARC. Regular consumption from multiple processed food sources may be a concern.",
      riskLevel: "processed",
    },
    {
      name: "Garlic Powder",
      analyzed:
        "Garlic powder is dehydrated ground garlic and retains many of the beneficial compounds found in fresh garlic, including allicin precursors. It has antimicrobial, anti-inflammatory, and cardiovascular-supportive properties. It is considered a health-positive ingredient with no known risks at culinary doses.",
      riskLevel: "safe",
    },
    {
      name: "Onion Powder",
      analyzed:
        "Onion powder is dehydrated ground onion used for seasoning. It contains quercetin and other antioxidants with anti-inflammatory benefits. It is safe for most people, though individuals on blood-thinning medications should note that onion compounds can mildly affect platelet aggregation.",
      riskLevel: "safe",
    },
    {
      name: "Natural Flavors",
      analyzed:
        "Natural flavors is a broad FDA-defined category covering flavoring substances derived from plant or animal sources. The vague labeling makes it difficult to assess allergens or additives within the blend. While generally recognized as safe, consumers with dietary restrictions or allergies may find the lack of transparency concerning.",
      riskLevel: "processed",
    },
  ],

  per100g: [
    {
      name: "Calories",
      analyzed: 350,
      unit: "kcal",
    },
    {
      name: "Carbohydrates",
      analyzed: 40,
      unit: "g",
    },
    {
      name: "Sugars",
      analyzed: 10,
      unit: "g",
    },
    {
      name: "Protein",
      analyzed: 5,
      unit: "g",
    },
    {
      name: "Fat",
      analyzed: 15,
      unit: "g",
    },
    {
      name: "Saturated Fat",
      analyzed: 5,
      unit: "g",
    },
    {
      name: "Salt",
      analyzed: 1,
      unit: "g",
    },
    {
      name: "Fiber",
      analyzed: 5,
      unit: "g",
    },
  ],
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
