import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createGameRoom = async (playerName) => {
  const roomId = Math.random().toString(36).substring(4);
  try {
    const gameRoomRef = await addDoc(collection(db, "gameRooms"), {
      roomId: roomId,
      players: [
        {
          playerId: Math.random().toString(36).substring(4),
          playerName: playerName,
          points: 0,
          isAdmin: true,
        },
      ],
    });

    await AsyncStorage.setItem("roomId", roomId);

    return gameRoomRef.id;
  } catch (e) {
    console.error("ERROR:", e);
  }
};
