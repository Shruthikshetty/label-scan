import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Ionicons from "@react-native-vector-icons/ionicons";
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator, Alert } from "react-native";

/**
 * component renders a image upload or open camera option
 * @ todo in progress
 */
const ImageUpload = ({
  handleUpload,
  loading = false,
}: {
  handleUpload: (dataUrl: string) => void;
  loading: boolean;
}) => {
  // Handle Camera Launch
  const openCamera = async () => {
    try {
      // Ask for permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Camera access is needed to scan labels.",
        );
        return;
      }
      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: true,
        allowsMultipleSelection: false,
        quality: 0.8, // compress images
        base64: true, // MUST be true to get base64 string
      });
      //@TODO restrict too high quality image  and add compression in that case
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const mimeType = asset.mimeType || "image/jpeg";
        // Convert to data URL format
        const dataUrl = `data:${mimeType};base64,${asset.base64}`;
        handleUpload(dataUrl);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Error", "Could not open camera.");
    }
  };

  // Handle Gallery Launch
  const openGallery = async () => {
    try {
      // Ask for permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Gallery access is needed to select labels.",
        );
        return;
      }
      // Launch library picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        allowsMultipleSelection: false,
        quality: 0.8, // compress images
        base64: true, // MUST be true to get base64 string
      });
      //@TODO restrict too high quality image  and add compression in that case
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const mimeType = asset.mimeType || "image/jpeg";
        // Convert to data URL format
        const dataUrl = `data:${mimeType};base64,${asset.base64}`;
        handleUpload(dataUrl);
      }
    } catch (error) {
      console.error("Gallery error:", error);
      Alert.alert("Error", "Could not open gallery.");
    }
  };

  return (
    <Box className="w-full items-center flex-col justify-center border-2 border-dashed border-gray-400 rounded-2xl py-5 px-10 gap-3">
      {/*  icon */}
      <Box className="rounded-xl bg-cream p-3">
        <Ionicons name={"camera-outline"} size={35} color={"#15803d"} />
      </Box>
      <Text size="md" className="color-typography-600 text-center px-10">
        Point your camera at the ingredients list (front of pack works too)
      </Text>

      {/* loading indicator  @TODO fix design*/}
      {loading && <ActivityIndicator size="large" color={"#15803d"} />}

      {/*  button  to open camera */}
      <Button
        action="primary"
        variant="solid"
        className="w-full rounded-full bg-green-900 active:opacity-75 data-[active=true]:bg-green-900"
        onPress={openCamera}
        disabled={loading}
      >
        <ButtonText>Open camera</ButtonText>
      </Button>
      {/*  open gallery */}
      <Button
        action="primary"
        variant="outline"
        className="w-full rounded-full border-0 active:opacity-50"
        onPress={openGallery}
        disabled={loading}
      >
        <Ionicons name="image" size={24} color="black" />
        <ButtonText>or upload from gallery</ButtonText>
      </Button>
    </Box>
  );
};

export default ImageUpload;
