import { View, StyleSheet } from "react-native";
import { RoundButton } from "./RoundButton";
import { useQuestions } from "@/contexts/QuestionsProvider";
import { TextField } from "./TextField";

interface QuestionTemProps {
  question: string;
}

export function QuestionItem({ question }: QuestionTemProps) {
  const { removeQuestion } = useQuestions();

  const handleRemoveQuestion = async () => {
    removeQuestion(question);
  };
  return (
    <View style={styles.container}>
      <TextField value={question} />
      <RoundButton isAdding={false} onPress={handleRemoveQuestion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flex: 1,
  },
});
