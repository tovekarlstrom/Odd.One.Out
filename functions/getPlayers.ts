import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getPlayers = async (documentId: string) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);

    const gameRoomDoc = await getDoc(gameRoomRef);

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
