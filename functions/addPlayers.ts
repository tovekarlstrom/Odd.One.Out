import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addPlayers = async (documentId: string, name: string) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);

    const player = {
      playerId: Math.random().toString(36).substring(4),
      playerName: name,
      points: 0,
      isAdmin: false,
    };

    await updateDoc(gameRoomRef, {
      players: arrayUnion(player),
    });
  } catch (e) {
    console.error("ERROR adding player:", e);
  }
};
