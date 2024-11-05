import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addPoints = async (
  documentId: string,
  playersGetPoints: string[]
) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);
    const gameRoomDoc = await getDoc(gameRoomRef);

    if (gameRoomDoc.exists()) {
      const players = gameRoomDoc.data().players;
      const updatedPlayers = players.map((player: any) => {
        if (playersGetPoints.includes(player.playerId)) {
          return { ...player, points: [...(player.points || []), 1] };
        } else {
          return { ...player, points: [...(player.points || []), 0] };
        }
      });
      await updateDoc(gameRoomRef, {
        players: updatedPlayers,
      });
    }
  } catch (e) {
    console.error("ERROR updating player points:", e);
  }
};
