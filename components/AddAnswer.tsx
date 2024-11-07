import { useEffect, useState } from "react";
import { CardComponent } from "./CardComponent";
import { ButtonComponent } from "./ButtonComponent";
import { InputComponent } from "./InputComponent";
import { getQuestion } from "../functions/getQuestion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { addAnswerToQuestion } from "@/functions/addAnswers";

export function AddAnswer({ question }: { question: string }) {
  const [newAnswer, setNewAnswer] = useState<string>("");

  const router = useRouter();

  const addNewAnswer = async () => {
    const gameRoom = await AsyncStorage.getItem("gameRoom");
    if (gameRoom) {
      if (newAnswer) {
        await addAnswerToQuestion(gameRoom, newAnswer);
        setNewAnswer("");
      }
      router.push("/answers");
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
