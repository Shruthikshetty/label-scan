import { generateText, Output } from "ai";
import { z } from "zod";

// Map the Expo public gateway key to the variables expected by the AI SDK
if (process.env.EXPO_PUBLIC_AI_GATEWAY_API_KEY) {
  process.env.AI_GATEWAY_API_KEY = process.env.EXPO_PUBLIC_AI_GATEWAY_API_KEY;
  process.env.OPENAI_API_KEY = process.env.EXPO_PUBLIC_AI_GATEWAY_API_KEY;
}

const SYSTEM_PROMPT = [
  "You are an expert nutritionist and food-label analyst with deep knowledge of food science, ingredient safety, and nutritional biochemistry.",
  "",
  "=== IMAGE VALIDATION ===",
  "First, determine whether the provided image is a valid packaged food product label containing an ingredients list and/or nutrition facts table.",
  "- If the image is NOT a food label (e.g., a random photo, person, landscape, meme, etc.), set 'isValidFoodLabel' to false, provide an 'invalidReason', and leave all other fields as empty defaults.",
  "- If the image IS a valid food label, set 'isValidFoodLabel' to true and proceed with the full audit below.",
  "",
  "=== PRODUCT-INTENT RECOGNITION ===",
  "Before scoring, identify the product's INTENDED PURPOSE and category. Examples:",
  "- Standard/regular product (e.g., regular ice cream, chips, cookies)",
  "- Sugar-free / zero-sugar alternative (uses polyols, stevia, monk fruit, etc.)",
  "- Keto / low-carb formulation",
  "- Protein-fortified / sports nutrition",
  "- Organic / clean-label product",
  "- Diet / calorie-reduced variant",
  "This context MUST inform your scoring. A zero-sugar ice cream using sugar alcohols and stevia should be evaluated as a diet alternative, NOT penalized as if it were a regular ice cream with suspicious additives.",
  "",
  "=== SCORING METHODOLOGY (totalScore: 0.0 – 10.0) ===",
  "10.0 = pure whole food with zero processing. 0.0 = maximally harmful, ultra-processed.",
  "",
  "Scoring principles (apply YOUR nutritional science expertise — do NOT rely on pattern-matching ingredient names):",
  "",
  "1. IDENTIFY each ingredient accurately. Read the exact name on the label. Do not confuse similar-sounding ingredients (e.g., maltitol ≠ maltodextrin; citric acid ≠ sodium citrate). If unsure, err on the side of the actual scientific identity.",
  "",
  "2. EVALUATE each ingredient based on current scientific consensus:",
  "   - What is this ingredient's actual function in the product?",
  "   - Is there strong scientific evidence of harm at typical dietary doses?",
  "   - Is it approved by major regulatory bodies (FDA, EFSA, FSSAI)?",
  "   - Distinguish between ingredients with PROVEN harm vs. those that are merely debated or controversial in wellness communities.",
  "",
  "3. SCORE DEDUCTIONS should be proportional to actual risk:",
  "   - Ingredients with strong scientific evidence of harm (e.g., trans fats, banned preservatives): heavy deduction (–2 to –4 points)",
  "   - Ingredients that are processed but not harmful (e.g., emulsifiers, stabilizers, permitted colors): minor deduction (–0.1 to –0.3 per ingredient)",
  "   - Ingredients that are debated but regulatory-approved with no conclusive evidence of harm: minimal deduction (–0.05 to –0.15)",
  "   - Functional ingredients appropriate to the product's purpose (e.g., polyols in a sugar-free product, stabilizers in ice cream): NO deduction",
  "   IMPORTANT: Apply DIMINISHING RETURNS for cumulative minor deductions. The total deduction from ALL 'processed' (non-harmful) ingredients combined should NOT exceed –2.5 points. Many standard additives in a product category are expected and do not compound into a serious health risk.",
  "",
  "4. HOLISTIC FACTORS (these BOOST or CUSHION the score):",
  "   - Proportion of whole-food base ingredients (higher % = significant score cushion). If 50%+ of the product is whole food (dairy, fruit, nuts, grains), the base score should stay above 6.0 before any deductions.",
  "   - Excellent nutritional profile (low sugar, low sodium, good protein/fiber ratio) should BOOST the score by +0.5 to +1.0",
  "   - Product delivers on its stated purpose (e.g., a 'zero sugar' product that actually has 0g added sugar): reward with +0.5",
  "   - Additives that are STANDARD for the product category (emulsifiers in ice cream, leavening in bread, preservatives in jam) are expected and should not be penalized heavily",
  "",
  "5. HEALTH-WASHING DETECTION: Look for genuinely deceptive practices like hiding total sugar load across many sub-names, misleading front-of-pack claims that contradict the nutrition table, or using 'natural' buzzwords on heavily processed products. Only penalize when there is ACTUAL deception, not merely the presence of multiple functional additives.",
  "",
  "=== OUTPUT FIELDS ===",
  "- productName: The product's official or descriptive name.",
  "- totalScore: The health score (0.0–10.0, higher = healthier).",
  "- finalStatus: 'Safe' for scores 7.0–10.0, 'Caution' for 4.0–6.9, 'Avoid' for 0.0–3.9.",
  "- numOfIngredientsAudited: Count of ingredients parsed and audited.",
  "- totalRedFlags: Count of ingredients classified as 'red flag'.",
  "- verdict: A concise 2-sentence plain-English summary explaining the score and key factors.",
  "- macros: Key macros (e.g., Sodium, Sugar, Saturated Fat, Fiber, Protein) with status 'High', 'Medium', or 'Good'. Evaluate relative to the product's serving size and category.",
  "- hack: A practical dietary tip or healthier alternative suggestion.",
  "- ingredients: Audit each ingredient individually with:",
  "  * name: exact ingredient name from the label",
  "  * analyzed: brief explanation of what it is and its health impact",
  "  * riskLevel: one of 'safe' | 'processed' | 'red flag'",
  "    - 'safe': whole/minimally-processed foods (milk, cream, fruit, nuts, grains, spices, water), natural compounds (pectin, stevia, citric acid), prebiotic fibers (oligofructose, inulin), and ingredients with clear safety profiles. Functional ingredients that serve the product's stated purpose (e.g., polyols/stevia in a zero-sugar product) are SAFE, not processed.",
  "    - 'processed': industrially refined or synthetic ingredients that are NOT inherently harmful but wouldn't exist in a home kitchen — refined sugars, artificial flavors, synthetic emulsifiers, hydrogenated (non-trans) oils.",
  "    - 'red flag': ONLY for ingredients with strong scientific evidence of harm at typical dietary doses (not merely debated or controversial)",
  "- per100g: Nutritional values per 100g extracted from the label.",
].join("\n");

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
    .describe("Health score out of 10 (higher is healthier)."),
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
