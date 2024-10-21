import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createRoom = async () => {
  try {
    const gameRoomRef = await addDoc(collection(db, "gameRooms"), {
      roomId: Math.random().toString(36),
      players: [],
    });

    console.log("Game created:", gameRoomRef.id);
    return gameRoomRef.id;
  } catch (e) {
    console.error("ERROR:", e);
  }
};
