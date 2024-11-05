import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getAnswer = async (documentId: string, setAnswers: any) => {
  try {
    const gameRoomRef = doc(db, "gameRooms", documentId);

    const unsub = onSnapshot(gameRoomRef, (doc) => {
      if (doc.exists()) {
        const questions = doc.data().questions;
        const index = doc.data().qIndex;
        const guestionAnswers = questions[index].answers;
        setAnswers(guestionAnswers);
      } else {
        setAnswers([]);
      }
    });
    return unsub;
  } catch (error) {
    console.error("Error fetching answers:", error);
    return setAnswers([]);
  }
};
