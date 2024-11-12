import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { PlayerIconType } from "@/app/code";

interface QuestionsObject {
  question: string;
  answers: any[];
}

export const createGameRoom = async (
  playerName: string,
  questions: string[],
  playerIcon: PlayerIconType
) => {
  const roomId = Math.random().toString(36).substring(4);
  const questionArray: QuestionsObject[] = [];

  questions.map((question) => {
    questionArray.push({ question: question, answers: [] });
  });

  try {
    const playerId = Math.random().toString(36).substring(4);
    const gameRoomRef = await addDoc(collection(db, "gameRooms"), {
      roomId: roomId,
      players: [
        {
          playerId: playerId,
          playerName: playerName,
          points: [],
          isAdmin: true,
          playerIcon: playerIcon,
        },
      ],
      questions: questionArray,
      qIndex: 0,
      status: "waiting",
    });
    await AsyncStorage.setItem("playerId", playerId);
    await AsyncStorage.setItem("roomId", roomId);
    await AsyncStorage.setItem("gameRoom", gameRoomRef.id);

    return gameRoomRef.id;
  } catch (e) {
    console.error("ERROR:", e);
  }
};
