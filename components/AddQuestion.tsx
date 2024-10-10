import { View, StyleSheet } from "react-native";
import { InputComponent } from "./InputComponent";
import { RoundButton } from "./RoundButton";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function AddQuestion() {
  const [newQuestion, setNewQuestion] = useState<string>("");
  const handleNewQuestion = (text: string) => {
    setNewQuestion(text);
    console.log(text);
  };
  const addNewQuestion = async () => {
    const existingQuestions = JSON.parse(
      (await AsyncStorage.getItem("questions")) || "[]"
    );
    const updatedQuestions = [...existingQuestions, newQuestion];
    await AsyncStorage.setItem("questions", JSON.stringify(updatedQuestions));
    console.log("question added", newQuestion);
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
