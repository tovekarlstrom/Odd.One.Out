import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getQuestion = async (
  documentId: string,
  setQuestion?: (arg0: string) => void,
  setQuestionsLength?: (arg0: number) => void
) => {
  const gameRoomRef = doc(db, "gameRooms", documentId);

  const unsub = onSnapshot(gameRoomRef, (doc) => {
    if (doc.exists()) {
      const qIndex = doc.data().qIndex;
      const question = doc.data().questions[qIndex].question;
      const questionsLength = doc.data().questions.length;
      if (setQuestion) {
        setQuestion(question);
      }
      if (setQuestionsLength) {
        setQuestionsLength(questionsLength);
      }
    }
  });

  return unsub;
};
