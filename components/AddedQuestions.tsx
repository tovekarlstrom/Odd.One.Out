import { StyleSheet, Text, View } from "react-native";
import { QuestionItem } from "./QuestionItem";
import { useQuestions } from "@/contexts/QuestionsProvider";
import { Sizes } from "@/constants/Theme";
import { CardComponent } from "./CardComponent";

export function AddedQuestions() {
  const { questions } = useQuestions();

  return (
    <View style={styled.outerConteiner}>
      <CardComponent heading="Added Questions" fullWidth>
        <View style={styled.container}>
          {questions
            .slice()
            .reverse()
            .map((question: string, index: number) => (
              <QuestionItem key={index} question={question} />
            ))}
        </View>
      </CardComponent>
    </View>
  );
}

const styled = StyleSheet.create({
  outerConteiner: {
    marginTop: 45,
    marginBottom: 80,
  },
  container: {
    flexDirection: "column",
    gap: Sizes.Spacings.medium,
    flex: 1,
  },
});
