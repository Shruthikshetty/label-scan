import { Stack } from "expo-router";
import "@/global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AppTabs from "./app-tabs";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <AppTabs />
    </GluestackUIProvider>
  );
}
