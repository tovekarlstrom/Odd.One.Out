import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import PlayerIcon from "@/components/PlayerIcon";
import { AddAnswer } from "@/components/AddAnswer";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Game() {
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const ListenAndGetStatus = async () => {
      const documentId = await AsyncStorage.getItem("gameRoom");
      if (documentId) {
        const unsubscribe = await getOrUpdateStatus({
          documentId,
          setStatus,
        });
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    };
    ListenAndGetStatus();
  }, []);

  return (
    <ParallaxScrollView>
      {status === "waiting" ? (
        <Loading />
      ) : (
        <>
          <PlayerIcon size={80} />
          <AddAnswer />
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
