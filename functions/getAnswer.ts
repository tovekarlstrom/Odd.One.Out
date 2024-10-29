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
        console.log("Document data:", guestionAnswers);
        setAnswers(guestionAnswers);
      } else {
        console.log("No such document!");
        setAnswers([]);
      }
    });
    return unsub;
  } catch (error) {
    console.error("Error fetching answers:", error);
    return setAnswers([]);
  }
};
