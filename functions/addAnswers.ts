import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addAnswerToQuestion = async (
  documentId: string,
  input: string
) => {
  const playerId = await AsyncStorage.getItem("playerId");
  const gameRoomRef = doc(db, "gameRooms", documentId);

  const newAnswer = {
    playerId: playerId,
    playerAnswer: input,
  };
  try {
    await runTransaction(db, async (transaction) => {
      const gameRoomSnapshot = await transaction.get(gameRoomRef);
      if (!gameRoomSnapshot.exists()) {
        throw new Error("Game room does not exist!");
      }
      const questions = gameRoomSnapshot.data().questions;
      const index = gameRoomSnapshot.data().qIndex;

      const updatedAnswers = [...questions[index].answers, newAnswer];
      questions[index] = { ...questions[index], answers: updatedAnswers };

      transaction.update(gameRoomRef, { questions });
    });
  } catch (e) {
    console.error("Error updating index:", e);
  }
};
