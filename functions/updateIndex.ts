import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateIndex = async (documentId: string) => {
  console.log(documentId);
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);
    const gameRoomDoc = await getDoc(gameRoomRef);

    if (gameRoomDoc.exists()) {
      const gameRoomData = gameRoomDoc.data();
      const localIndex = gameRoomData.qIndex;
      console.log(localIndex);
      await updateDoc(gameRoomRef, {
        qIndex: localIndex + 1,
      });
    } else {
      console.error("No game room found");
    }
  } catch (e) {
    console.error("Error updating index:", e);
  }
};
