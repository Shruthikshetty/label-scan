import "../../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <StatusBar barStyle="dark-content" />
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
