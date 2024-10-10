import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { QuestionItem } from "./QuestionItem";

export function AddedQuestions() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const questionss = await AsyncStorage.getItem("questions");
      const questions = await JSON.parse(questionss || "[]");
      console.log(questions);
      setQuestions(questions);
    };
    getQuestions();
  }, []);
  return (
    <View style={styled.container}>
      {questions.map((question: string, index: number) => (
        <QuestionItem key={index} question={question} />
      ))}
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
  },
});
