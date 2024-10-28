import { arrayUnion, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addPoints = async (documentId: string, playerId: string) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);
    const gameRoomDoc = await getDoc(gameRoomRef);

    if (gameRoomDoc.exists()) {
      const players = gameRoomDoc.data().player || [];
      const updatedPlayers = players.map((player: any) => {
        if (player.playerId === playerId) {
          return { ...player, points: player.points + 1 };
        }
        return player;
      });
      await updateDoc(gameRoomRef, {
        players: updatedPlayers,
      });
      console.log("Player points updated sucressfully");
    }
    console.log("No such document!");
  } catch (e) {
    console.error("ERROR updating player points:", e);
  }
};
