import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerIconType } from "@/app/code";

export const addPlayers = async (
  documentId: string,
  name: string,
  playerIcon: PlayerIconType
) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);

    const playerId = Math.random().toString(36).substring(4);

    const player = {
      playerId: playerId,
      playerName: name,
      points: [],
      isAdmin: false,
      playerIcon: playerIcon,
    };

    await updateDoc(gameRoomRef, {
      players: arrayUnion(player),
    });
    await AsyncStorage.setItem("playerId", playerId);
  } catch (e) {
    console.error("ERROR adding player:", e);
  }
};
