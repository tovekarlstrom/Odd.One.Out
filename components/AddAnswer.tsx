import { useAnswers } from "@/contexts/AnswersProvider";
import { useEffect, useState } from "react";
import { CardComponent } from "./CardComponent";
import { ButtonComponent } from "./ButtonComponent";
import { InputComponent } from "./InputComponent";
import { getQuestion } from "../functions/getQuestion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateIndex } from "../functions/updateIndex";

export function AddAnswer() {
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [questionsLength, setQuestionsLength] = useState<number>(0);
  const { addAnswer } = useAnswers();

  const fetchQuestion = async () => {
    const gameRoom = await AsyncStorage.getItem("gameRoom");
    console.log(gameRoom);
    if (gameRoom) {
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

  useEffect(() => {
    console.log(questionsLength);
  });

  const addNewAnswer = async () => {
    const gameRoom = await AsyncStorage.getItem("gameRoom");
    if (gameRoom && index < questionsLength - 1) {
      await updateIndex(gameRoom);
    }
    alert(newAnswer);
    addAnswer(newAnswer);
    setNewAnswer("");
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
          setIndex(index + 1);
          addNewAnswer();
        }}
      />
    </CardComponent>
  );
}
