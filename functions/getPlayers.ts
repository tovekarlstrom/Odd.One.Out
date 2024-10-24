import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Player } from "@/app/code";

export const getPlayers = async (
  documentId: string,
  setPlayers: (players: Player[]) => void
) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);

    const unsub = onSnapshot(gameRoomRef, (doc) => {
      if (doc.exists()) {
        const playersList = doc.data().players || [];
        setPlayers(playersList);
      } else {
        console.log("No such document!");
        setPlayers([]);
      }
    });
    return unsub;
  } catch (error) {
    console.error("Error fetching players:", error);
    return setPlayers([]);
  }
};
