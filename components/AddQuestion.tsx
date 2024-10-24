import { View, StyleSheet } from "react-native";
import { InputComponent } from "./InputComponent";
import { RoundButton } from "./RoundButton";
import { useState } from "react";

import { useQuestions } from "@/contexts/QuestionsProvider";

export function AddQuestion() {
  const [newQuestion, setNewQuestion] = useState<string>("");
  const { addQuestion } = useQuestions();

  const handleNewQuestion = (text: string) => {
    setNewQuestion(text);
  };
  const addNewQuestion = async () => {
    addQuestion(newQuestion);
    setNewQuestion("");
  };

  return (
    <View style={styled.container}>
      <InputComponent
        placeholder="Question"
        onChangeText={handleNewQuestion}
        value={newQuestion}
        onSubmitEditing={addNewQuestion}
      />
      <RoundButton isAdding={true} onPress={addNewQuestion} />
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
