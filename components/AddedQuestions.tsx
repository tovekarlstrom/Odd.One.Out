import { StyleSheet, View } from 'react-native';
import { QuestionItem } from './QuestionItem';
import { useQuestions } from '@/contexts/QuestionsProvider';
import { Sizes } from '@/constants/Theme';
import { CardComponent } from './CardComponent';

export function AddedQuestions({ heading }: { heading: string }) {
  const { questions } = useQuestions();

  return (
    <View style={styled.outerConteiner}>
      <CardComponent heading={heading} fullWidth>
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
    marginTop: 40,
    marginBottom: 80,
  },
  container: {
    flexDirection: 'column',
    gap: Sizes.Spacings.medium,
    flex: 1,
  },
});
