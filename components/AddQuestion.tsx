import { View, StyleSheet } from 'react-native';
import { InputComponent } from './InputComponent';
import { RoundButton } from './RoundButton';
import { useState } from 'react';

import { useQuestions } from '@/contexts/QuestionsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/hooks/useLanguage';
import { ModalComponent } from './Modal';

export function AddQuestion() {
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const { addQuestion } = useQuestions();
  const { content, isLoading, error } = useLanguage();
  const labels = content?.labels;

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
      setShowWarningModal(true);
    } else {
      addQuestion(newQuestion);
    }

    setNewQuestion('');
  };

  if (isLoading || error) return null;

  return (
    <View style={styled.container}>
      <InputComponent
        placeholder={labels?.question}
        onChangeText={handleNewQuestion}
        value={newQuestion}
        onSubmitEditing={addNewQuestion}
      />
      <RoundButton isAdding={true} onPress={addNewQuestion} />
      {showWarningModal && (
        <ModalComponent
          onClose={() => setShowWarningModal(false)}
          heading={labels.questionWarning.title}
          description={labels.questionWarning.description}
          oneButton={true}
        />
      )}
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
