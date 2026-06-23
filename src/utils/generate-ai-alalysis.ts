import { generateText, Output } from "ai";
import { z } from "zod";

// Map the Expo public gateway key to the variables expected by the AI SDK
if (process.env.EXPO_PUBLIC_AI_GATEWAY_API_KEY) {
  process.env.AI_GATEWAY_API_KEY = process.env.EXPO_PUBLIC_AI_GATEWAY_API_KEY;
  process.env.OPENAI_API_KEY = process.env.EXPO_PUBLIC_AI_GATEWAY_API_KEY;
}

const SYSTEM_PROMPT =
  "You are an expert nutritionist and food label analyst.\n" +
  "IMPORTANT: First, determine whether the provided image is a valid packaged food product label containing an ingredients list and/or nutrition facts table.\n" +
  "- If the image is NOT a food label (e.g., a random photo, person, landscape, meme, etc.), set 'isValidFoodLabel' to false, provide an 'invalidReason', and leave all other fields as empty defaults.\n" +
  "- If the image IS a valid food label, set 'isValidFoodLabel' to true and populate all remaining fields.\n" +
  "\n" +
  "When auditing a valid food label, follow these rules:\n" +
  "- productName: Identify the product's official or descriptive name.\n" +
  "- totalScore: Assign a health score from 0 to 10 (0 is extremely healthy/whole food, 10 is highly processed and unhealthiest).\n" +
  "- finalStatus: Assign 'Avoid' for scores 7-10, 'Caution' for scores 4-6, and 'Safe' for scores 0-3.\n" +
  "- numOfIngredientsAudited: Count of ingredients listed and audited.\n" +
  "- totalRedFlags: Count of ingredients classified with 'red flag' riskLevel.\n" +
  "- verdict: A professional, clear health verdict explanation.\n" +
  "- macros: List key evaluated macros (e.g. Sodium, Sugar, Sat fat) with status ('High', 'Medium', 'Good').\n" +
  "- hack: Give a practical food hack or tip for eating it healthily or a better alternative.\n" +
  "- ingredients: Audit each ingredient including its health impact and categorise riskLevel as 'safe', 'processed', or 'red flag'.\n" +
  "- per100g: Extract nutritional table values per 100g.";

export const ProductAnalysisSchema = z.object({
  // validation fields
  isValidFoodLabel: z
    .boolean()
    .describe(
      "True if the image is a valid packaged food label with ingredients or nutrition info. False for all other images.",
    ),
  invalidReason: z
    .string()
    .describe(
      "If isValidFoodLabel is false, explain briefly why the image was rejected (e.g. 'Not a food label', 'Image is a selfie', etc.). Else return empty string.",
    ),

  // Analysis fields
  productName: z.string().describe("The name of the food product."),
  totalScore: z
    .number()
    .min(0)
    .max(10)
    .describe("Health score out of 10 (higher is worse/unhealthier)."),
  numOfIngredientsAudited: z
    .number()
    .describe("Number of ingredients parsed and audited."),
  totalRedFlags: z
    .number()
    .describe("Total number of ingredients flagged as high risk ('red flag')."),
  finalStatus: z
    .enum(["Avoid", "Caution", "Safe"])
    .describe("Final health status decision."),
  verdict: z
    .string()
    .describe(
      "Overall expert summary verdict detailing the health impact of the ingredients.",
    ),
  macros: z
    .array(
      z.object({
        label: z
          .string()
          .describe("The macro name, e.g. Sodium, Sugar, Sat fat."),
        status: z
          .enum(["High", "Medium", "Good"])
          .describe("Macro evaluation status."),
      }),
    )
    .describe("Array of evaluated macros."),
  hack: z
    .string()
    .describe(
      "A helpful health tip or alternative usage suggestion if this product is consumed.",
    ),
  ingredients: z
    .array(
      z.object({
        name: z.string().describe("Name of the ingredient."),
        analyzed: z
          .string()
          .describe("Analysis details and health impacts of this ingredient."),
        riskLevel: z
          .enum(["safe", "processed", "red flag"])
          .describe("The risk category level."),
      }),
    )
    .describe("Full parsed and audited ingredients list."),
  per100g: z
    .array(
      z.object({
        name: z
          .string()
          .describe(
            "Nutritional metric name (e.g., Calories, Carbohydrates, Protein, Fat).",
          ),
        analyzed: z.number().describe("Evaluated quantity value per 100g."),
        unit: z.string().describe("The measurement unit, e.g. kcal, g, mg."),
      }),
    )
    .describe("Nutritional table per 100g."),
});

export type ProductAnalysisResult = z.infer<typeof ProductAnalysisSchema>;

export const AnalyzeProduct = async (imageDataUrl: string) => {
  // make ai call
  const result = await generateText({
    model: "openai/gpt-5.4-nano",
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Audit this packaged food label. Return ONLY the JSON object specified.",
          },
          { type: "image", image: imageDataUrl },
        ],
      },
    ],
    output: Output.object({
      schema: ProductAnalysisSchema,
    }),
  });

  //@TODO temp to be removed
  console.log(result.output);

  //if the AI determined the image isn't a food label, surface the reason
  if (!result.output?.isValidFoodLabel) {
    throw new Error(
      result.output?.invalidReason ??
        "Image is not a valid food product label.",
    );
  }

  return result.output;
};
