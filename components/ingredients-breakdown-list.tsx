import { BadgeText, Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { RISK_COLOR_MAPPING } from "@/constants/screen.constants";
import { useState, Fragment } from "react";
import { Pressable } from "react-native";

export type Ingredient = {
  name: string;
  riskLevel: "safe" | "processed" | "red flag";
  analyzed: string;
};

const IngredientsBreakdownList = ({
  ingredients = [],
}: {
  ingredients: Ingredient[];
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <Box className="gap-3">
      {/*  heading */}
      <Box>
        <Heading size="lg" className="color-typography-950" bold>
          INGREDIENTS BREAKDOWN
        </Heading>
        <Text size="md" className="color-typography-600">
          Your scanned labels saved on device
        </Text>
      </Box>
      {/* list of ingredients */}
      <Box className="flex flex-wrap gap-2 flex-row">
        {ingredients.map((item, index) => (
          <Fragment key={item.name + index}>
            <Pressable
              className="active:opacity-65"
              onPress={() => {
                setSelectedIndex(selectedIndex === index ? null : index);
              }}
            >
              <Badge
                className={`border gap-2 rounded-full bg-${RISK_COLOR_MAPPING[item?.riskLevel]}/20 border-${RISK_COLOR_MAPPING[item?.riskLevel]}/40`}
              >
                <Box
                  className={`p-2 rounded-full bg-${RISK_COLOR_MAPPING[item?.riskLevel]}`}
                />
                <BadgeText size="lg" className="p-1">
                  {item.name}
                </BadgeText>
              </Badge>
            </Pressable>
            {selectedIndex === index && (
              <Box
                className={`w-[100%] p-2 border rounded-xl border-${RISK_COLOR_MAPPING[item?.riskLevel]}`}
              >
                <Heading
                  size="md"
                  className={`text-${RISK_COLOR_MAPPING[item?.riskLevel]}`}
                >
                  {item?.riskLevel?.toUpperCase()}
                </Heading>
                <Text size="md" className="color-typography-600">
                  {item.analyzed}
                </Text>
              </Box>
            )}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default IngredientsBreakdownList;
