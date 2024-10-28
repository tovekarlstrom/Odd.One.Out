import { useEffect, useState } from "react";
import { CardComponent } from "./CardComponent";
import { ButtonComponent } from "./ButtonComponent";
import { InputComponent } from "./InputComponent";
import { getQuestion } from "../functions/getQuestion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateIndex } from "../functions/updateIndex";
import { useRouter } from "expo-router";
import { addAnswerToQuestion } from "@/functions/addAnswers";

export function AddAnswer() {
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [questionsLength, setQuestionsLength] = useState<number>(0);

  const router = useRouter();

  const fetchQuestion = async () => {
    const gameRoom = await AsyncStorage.getItem("gameRoom");
    if (gameRoom) {
      await updateIndex(gameRoom, setIndex);
      const unsubscribe = await getQuestion(
        gameRoom,
        setQuestion,
        setQuestionsLength
      );
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const addNewAnswer = async () => {
    const gameRoom = await AsyncStorage.getItem("gameRoom");
    if (gameRoom) {
      if (newAnswer) {
        await addAnswerToQuestion(gameRoom, newAnswer);
        alert(newAnswer);
        setNewAnswer("");
      }
      if (index < questionsLength - 1) {
        await updateIndex(gameRoom, setIndex, true);
      }
    }
    if (index === questionsLength - 1) {
      router.push("/");
    }
  };

  return (
    <CardComponent heading={question} fullWidth>
      <InputComponent
        placeholder="Your answer"
        onChangeText={(text) => {
          setNewAnswer(text);
        }}
        value={newAnswer}
      />
      <ButtonComponent
        variant="primary"
        text="Send answer"
        onSubmit={() => {
          addNewAnswer();
        }}
      />
    </CardComponent>
  );
}
