import "../../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="app-tabs"
      >
        <Stack.Screen name="app-tabs" />
        <Stack.Screen name="details/[id]" />
      </Stack>
    </GluestackUIProvider>
  );
}
