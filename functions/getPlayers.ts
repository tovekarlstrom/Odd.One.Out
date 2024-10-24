import { getDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getPlayers = async (documentId: string) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);

    const gameRoomDoc = await getDoc(gameRoomRef);
    // Set up listener for real-time updates
    const unsub = onSnapshot(gameRoomRef, (doc) => {
      if (doc.exists()) {
        const playersList = doc.data().players || [];
        console.log("Updated Player List:", playersList);
      } else {
        console.log("No such document!");
      }
    });

    console.log("Unsub:", unsub);
    if (gameRoomDoc.exists()) {
      const playersList = gameRoomDoc.data().players || [];
      console.log("Player List:", playersList);
      return playersList;
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};
