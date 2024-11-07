import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export function useGameRoom() {
  const [documentId, setDocumentId] = useState<string | null>(null);

  const getGameRoom = useCallback(async () => {
    const gameRoom = await AsyncStorage.getItem("gameRoom");
    if (gameRoom) {
      setDocumentId(gameRoom);
    }
  }, []);

  useEffect(() => {
    getGameRoom();
  }, []);

  return documentId;
}
