import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addPlayers = async (documentId, name) => {
  console.log("documentID: ", documentId);
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

    console.log("Player added:", player);
  } catch (e) {
    console.error("ERROR adding player:", e);
  }
};
