import { useAnswers } from "@/contexts/AnswersProvider";
import { useEffect, useState } from "react";
import { CardComponent } from "./CardComponent";
import { ButtonComponent } from "./ButtonComponent";
import { InputComponent } from "./InputComponent";
import { getQuestion } from "../functions/getQuestion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateIndex } from "../functions/updateIndex";
import { useRouter } from "expo-router";

export function AddAnswer() {
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [questionsLength, setQuestionsLength] = useState<number>(0);
  const { addAnswer } = useAnswers();

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
    if (gameRoom && index < questionsLength - 1) {
      await updateIndex(gameRoom, setIndex, true);
    }
    alert(newAnswer);
    addAnswer(newAnswer);
    setNewAnswer("");
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
        onSubmitEditing={addNewAnswer}
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
