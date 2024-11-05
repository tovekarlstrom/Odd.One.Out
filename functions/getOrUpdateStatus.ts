import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

type Status = "waiting" | "active" | "idle";

interface getOrUpdateStatusProps {
  documentId: string;
  changeStatus?: Status;
  setStatus?: (status: Status) => void;
}

export const getOrUpdateStatus = async ({
  documentId,
  changeStatus,
  setStatus,
}: getOrUpdateStatusProps) => {
  try {
    if (!documentId || typeof documentId !== "string") {
      console.error("Invalid documentId provided:", documentId);
      return;
    }

    const gameRoomRef = doc(db, "gameRooms", documentId);

    // Check if the document exists
    const gameRoomDoc = await getDoc(gameRoomRef);
    if (!gameRoomDoc.exists()) {
      console.error("No game room found!");
      return;
    }

    if (setStatus) {
      const unsubscribe = onSnapshot(gameRoomRef, (snapshot) => {
        if (snapshot.exists()) {
          const gameRoomData = snapshot.data();
          const localStatus = gameRoomData.status;
          setStatus(localStatus);
        } else {
          console.error("No game room found!");
        }
      });
      return unsubscribe;
    }

    if (changeStatus) {
      await updateDoc(gameRoomRef, { status: changeStatus });
    }
  } catch (e) {
    console.error("Error updating or getting status:", e);
  }
};
