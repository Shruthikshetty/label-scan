import { NativeTabs } from "expo-router/unstable-native-tabs";

// main tabs for the app
const AppTabs = () => {
  return (
    <NativeTabs
      iconColor={{
        default: "#6b7280", // Gray-500
        selected: "#15803d", // Green-700
      }}
      labelStyle={{
        default: { color: "#6b7280" },
        selected: { color: "#15803d", fontWeight: "bold" },
      }}
      backgroundColor="#ffffff"
      disableIndicator={true}
      shadowColor="#000000"
      rippleColor={"gray"}
    >
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>Scan</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="camera.viewfinder" md="photo_camera" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>History</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="clock.fill" md="history" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default AppTabs;
