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
  const [gameRoom, setGameRoom] = useState<string>("");

  const getGameRoom = async () => {
    const documentId = await AsyncStorage.getItem("gameRoom");
    if (documentId) {
      setGameRoom(documentId);
    }
  };

  useEffect(() => {
    getGameRoom();
  }, []);

  useEffect(() => {
    const ListenAndGetStatus = async () => {
      const unsubscribe = await getOrUpdateStatus(gameRoom, false, setStatus);
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    };
    ListenAndGetStatus();
  }, [gameRoom]);

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
