import { View, Text, StyleSheet } from "react-native";
import { RoundButton } from "./RoundButton";
import { useQuestions } from "@/contexts/QuestionsProvider";
import { Colors, Sizes } from "@/constants/Theme";
import { ThemedText } from "./ThemedText";

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
      <View style={styles.textContainer}>
        <ThemedText type="defaultSemiBold">{question}</ThemedText>
      </View>
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
  textContainer: {
    borderRadius: 30,
    minHeight: 55,
    minWidth: 200,
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    padding: Sizes.Spacings.medium,
  },
});
