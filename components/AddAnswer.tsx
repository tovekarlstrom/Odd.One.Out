import { useAnswers } from "@/contexts/AnswersProvider";
import { useState } from "react";
import { CardComponent } from "./CardComponent";
import { ButtonComponent } from "./ButtonComponent";
import { InputComponent } from "./InputComponent";
import { useQuestions } from "@/contexts/QuestionsProvider";

export function AddAnswer() {
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const { answers, addAnswer } = useAnswers();
  const { questions } = useQuestions();

  const handleNewAnswer = (text: string) => {
    setNewAnswer(text);
  };
  const addNewAnswer = async () => {
    alert(newAnswer);
    addAnswer(newAnswer);
    setNewAnswer("");
  };

  return (
    <CardComponent heading={questions[index]} fullWidth>
      <InputComponent
        placeholder="Your answer"
        onChangeText={handleNewAnswer}
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
