import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createGameRoom = async () => {
  const roomId = Math.random().toString(36).substring(4);
  try {
    const gameRoomRef = await addDoc(collection(db, "gameRooms"), {
      roomId: roomId,
      players: [
        {
          playerId: Math.random().toString(36).substring(4),
          playerName: "Admin",
          points: null,
          isAdmin: true,
        },
      ],
    });

    await AsyncStorage.setItem("roomId", roomId);

    console.log("Game created:", gameRoomRef.id);
    return gameRoomRef.id;
  } catch (e) {
    console.error("ERROR:", e);
  }
};
