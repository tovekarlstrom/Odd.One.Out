import { useEffect, useState } from "react";
import { CardComponent } from "./CardComponent";
import { ButtonComponent } from "./ButtonComponent";
import { InputComponent } from "./InputComponent";
import { getQuestion } from "../functions/getQuestion";
import { useRouter } from "expo-router";
import { addAnswerToQuestion } from "@/functions/addAnswers";
import { useGameRoom } from "@/hooks/useGameRoom";

export function AddAnswer() {
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const { data: documentId } = useGameRoom();

  const router = useRouter();

  const fetchQuestion = async () => {
    if (documentId) {
      const unsubscribe = await getQuestion(documentId, setQuestion, undefined);

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
    if (documentId) {
      if (newAnswer) {
        await addAnswerToQuestion(documentId, newAnswer);
        alert(newAnswer);
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
