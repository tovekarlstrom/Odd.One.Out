import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateIndex = async (
  documentId: string,
  setIndex?: (arg0: number) => void,
  changeIndex?: boolean
) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);
    const gameRoomDoc = await getDoc(gameRoomRef);

    if (gameRoomDoc.exists()) {
      const gameRoomData = gameRoomDoc.data();
      const localIndex = gameRoomData.qIndex;
      if (changeIndex) {
        await updateDoc(gameRoomRef, {
          qIndex: localIndex + 1,
        });
        if (setIndex) {
          setIndex(localIndex + 1);
        }
      } else {
        if (setIndex) {
          setIndex(localIndex);
        }
      }
    } else {
      console.error("No game room found");
    }
  } catch (e) {
    console.error("Error updating index:", e);
  }
};
