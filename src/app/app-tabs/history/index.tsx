import { HistoryItemCard } from "@/components/history-item-card";
import NoHistoryCard from "@/components/no-history-card";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { type ScanRecord } from "@/src/db/schema";
import { deleteScan, getScanHistory } from "@/src/utils/scans-db.utils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * This is the main history page
 */
const History = () => {
  const router = useRouter();
  const [historyList, setHistoryList] = useState<ScanRecord[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const list = await getScanHistory();
        setHistoryList(list);
      } catch (error) {
        console.error("Failed to load scan history:", error);
      }
    };
    // load the history of items
    loadHistory();
  });

  // handle delete
  const handleDelete = async (id: number) => {
    Alert.alert(
      "Delete Scan",
      "Are you sure you want to delete this scan from your history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteScan(id);
              // delete and set the new list
              const list = await getScanHistory();
              setHistoryList(list);
            } catch (error) {
              console.error("Failed to delete scan:", error);
            }
          },
        },
      ],
    );
  };

  // navigate to details screen
  const handleItemPress = (item: ScanRecord) => {
    // for the proper object to send in route
    const resultObject = {
      productName: item.productName,
      totalScore: item.totalScore,
      finalStatus: item.finalStatus,
      verdict: item.verdict,
      numOfIngredientsAudited: item.numOfIngredientsAudited,
      totalRedFlags: item.totalRedFlags,
      hack: item.hack,
      ingredients: item.ingredients,
      macros: item.macros,
      per100g: item.per100g,
    };

    // navigate
    router.push({
      pathname: "/details",
      params: {
        result: JSON.stringify(resultObject),
      },
    });
  };

  // each flat list item
  const renderItem = ({ item }: { item: ScanRecord }) => (
    <HistoryItemCard
      handleItemPress={handleItemPress}
      handleDelete={handleDelete}
      item={item}
    />
  );

  return (
    <SafeAreaView>
      <ScrollView className="p-4">
        {/* Title */}
        <Box className="mb-5">
          <Text size="3xl" className="color-typography-950" bold>
            History
          </Text>
          <Text size="md" className="color-typography-600">
            Your scanned labels saved locally on this device
          </Text>
        </Box>

        {/* History List */}
        {historyList.length === 0 ? (
          <NoHistoryCard />
        ) : (
          <FlatList
            data={historyList}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerClassName="gap-3"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
