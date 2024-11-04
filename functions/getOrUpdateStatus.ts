import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getOrUpdateStatus = async (
  documentId: string,
  changeStatus: boolean,
  setStatus?: (arg0: string) => void
) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);

    const unsubscribe = onSnapshot(gameRoomRef, async (snapshot) => {
      if (snapshot.exists()) {
        const gameRoomData = snapshot.data();
        const localStatus = gameRoomData.status;

        if (setStatus) {
          setStatus(localStatus);
        }

        if (changeStatus && localStatus !== "active") {
          await updateDoc(gameRoomRef, { status: "active" });
        }
      } else {
        console.error("No game room found!");
      }
    });

    return unsubscribe;
  } catch (e) {
    console.error("Error updating index:", e);
  }
};
