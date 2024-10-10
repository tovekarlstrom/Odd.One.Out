import { View, Text, StyleSheet } from "react-native";
import { RoundButton } from "./RoundButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuestions } from "@/contexts/QuestionsProvider";

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
        <Text style={styles.text}>{question}</Text>
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
  },
  textContainer: {
    borderRadius: 30,
    minHeight: 55,
    minWidth: 261,
    height: "100%",
    backgroundColor: "#EBDED6",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    color: "#231F20",
    fontWeight: "bold",
  },
});
