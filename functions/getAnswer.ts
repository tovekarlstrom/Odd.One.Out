import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { PlayerAnswer } from '@/app/answers';

export const getAnswer = async (
  documentId: string,
  setAnswers: (answers: PlayerAnswer[]) => void,
) => {
  try {
    const gameRoomRef = doc(db, 'gameRooms', documentId);

    const unsub = onSnapshot(gameRoomRef, (doc) => {
      if (doc.exists()) {
        const questions = doc.data().questions;
        const index = doc.data().qIndex;
        const questionAnswers = questions[index].answers;
        setAnswers(questionAnswers);
      } else {
        setAnswers([]);
      }
    });
    return unsub;
  } catch (error) {
    console.error('Error fetching answers:', error);
    return setAnswers([]);
  }
};
