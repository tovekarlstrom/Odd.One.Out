import { StyleSheet, Text, View } from "react-native";
import { QuestionItem } from "./QuestionItem";
import { useQuestions } from "@/contexts/QuestionsProvider";
import { Sizes } from "@/constants/Theme";

export function AddedQuestions() {
  const { questions } = useQuestions();

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
    gap: Sizes.Spacings.medium,
  },
});
