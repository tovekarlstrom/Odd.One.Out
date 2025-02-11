import { View, StyleSheet } from 'react-native';
import { InputComponent } from './InputComponent';
import { RoundButton } from './RoundButton';
import { useState } from 'react';

import { useQuestions } from '@/contexts/QuestionsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AddQuestion() {
  const [newQuestion, setNewQuestion] = useState<string>('');
  const { addQuestion } = useQuestions();

  const handleNewQuestion = (text: string) => {
    setNewQuestion(text);
  };
  const addNewQuestion = async () => {
    if (!newQuestion || newQuestion.length > 100) {
      alert('Question must be within 0 - 100 characters');
      return;
    }

    const questions = await AsyncStorage.getItem('questions');
    const parsedQuestions = questions ? JSON.parse(questions) : [];

    if (parsedQuestions.includes(newQuestion)) {
      return alert('This question has already been added.');
    }

    addQuestion(newQuestion);
    setNewQuestion('');
  };

  return (
    <View style={styled.container}>
      <InputComponent
        placeholder='Question'
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
});
